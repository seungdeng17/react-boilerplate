import { put, delay, fork, cancel, select, call } from 'redux-saga/effects';
import * as lruCache from 'lru-cache';
import { FetchStatus, FETCH_PAGE, FETCH_KEY } from '@constant/common';
import { request } from '@util/api';
import { actions } from '@store/common';

function makeCheckSlowSaga(actionType: any, fetchKey: any) {
  return function* () {
    yield delay(500);
    yield put(
      actions.setIsSlow({
        actionType,
        fetchKey,
        isSlow: true,
      })
    );
  };
}

const apiCache = new lruCache({
  max: 500,
  maxAge: 1000 * 60 * 2,
});

const SAGA_CALL_TYPE = call(() => {}).type;
function getIsCallEffect(value: any) {
  return value && value.type === SAGA_CALL_TYPE;
}
export function makeFetchSaga({
  fetchSaga,
  canCache = false,
  getTotalCount = (res: any) => res?.totalCount,
}: {
  [key: string]: any;
}) {
  return function* (action: any): Generator<any> {
    const { type: actionType } = action;
    const fetchPage = action[FETCH_PAGE];
    const fetchKey = getFetchKey(action);
    const nextPage = yield select((state) => state.common.fetchInfo.nextPageMap[actionType]?.[fetchKey] || 0);
    const page = fetchPage !== undefined ? fetchPage : nextPage;
    const iterStack = [];
    let iter: any = fetchSaga(action, page);
    let res;
    let checkSlowTask: any;
    let params;
    while (true) {
      const { value, done }: any = iter.next(res);
      if (getIsCallEffect(value) && getIsGeneratorFunction(value.payload.fn)) {
        iterStack.push(iter);
        iter = value.payload.fn(...value.payload.args);
        continue;
      }
      if (getIsCallEffect(value) && value.payload.fn === request) {
        yield put(
          actions.setFetchStatus({
            actionType,
            fetchKey,
            status: FetchStatus.Request,
          })
        );
        const apiParam = value.payload.args[0];
        const cacheKey = getApiCacheKey(actionType, apiParam);
        let apiResult: any = canCache && apiCache.has(cacheKey) ? apiCache.get(cacheKey) : undefined;
        const isFromCache = !!apiResult;
        if (!isFromCache) {
          if (!apiResult) {
            checkSlowTask = yield fork(makeCheckSlowSaga(actionType, fetchKey));
            apiResult = yield value;
            if (checkSlowTask) {
              yield cancel(checkSlowTask);
            }
          }
        }
        res = apiResult;
        if (apiResult) {
          const isSuccess = apiResult.isSuccess;
          if (isSuccess && canCache && !isFromCache) {
            apiCache.set(cacheKey, apiResult);
          }
          const totalCount = getTotalCount(apiResult);
          params = {
            actionType,
            fetchKey,
            status: isSuccess ? FetchStatus.Success : FetchStatus.Fail,
            totalCount,
            nextPage: isSuccess ? page + 1 : page,
            errorMessage: isSuccess ? '' : apiResult.resultMessage,
          };
        }
      } else if (value !== undefined) {
        res = yield value;
      }
      if (done) {
        const nextIter = iterStack.pop();
        if (nextIter) {
          iter = nextIter;
          continue;
        }

        if (params) {
          yield put(actions.setFetchStatus(params));
        }
        break;
      }
    }
  };
}

export function getApiCacheKey(actionType: any, { apiHost, url, params }: { [key: string]: any }) {
  const prefix = `${actionType}_${apiHost ? apiHost + url : url}`;
  const keys = params ? Object.keys(params) : [];
  if (keys.length) {
    return prefix + keys.sort().reduce((acc, key) => `${acc}&${key}=${params[key]}`, '');
  } else {
    return prefix;
  }
}

export function getFetchKey(action: any) {
  const fetchKey = action[FETCH_KEY];
  return fetchKey === undefined ? action.type : String(fetchKey);
}

function getIsGeneratorFunction(obj: any) {
  const constructor = obj.constructor;
  if (!constructor) {
    return false;
  }
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) {
    return true;
  }
  const proto = constructor.prototype;
  return 'function' === typeof proto.next && 'function' === typeof proto.throw;
}

export function deleteApiCache(actionType?: any) {
  let keys = apiCache.keys();
  if (actionType) {
    keys = keys.filter((key: any) => key.includes(actionType));
  }
  for (const key of keys) {
    apiCache.del(key);
  }
}
