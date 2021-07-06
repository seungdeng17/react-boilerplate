import { getFetchKey } from '@util/fetch';
import { useSelector, shallowEqual } from 'react-redux';
import { FetchStatus, FETCH_KEY } from '@constant/fetch';

export default function useFetchInfo(actionType: string, fetchKey?: string) {
  const _fetchKey = getFetchKey({
    type: actionType,
    [FETCH_KEY]: fetchKey,
  });

  return useSelector(
    (state: any) => ({
      fetchStatus: state.fetch.fetchInfo.fetchStatusMap[actionType]?.[_fetchKey],
      isFetching: state.fetch.fetchInfo.fetchStatusMap[actionType]?.[_fetchKey] === FetchStatus.Request,
      isFetched:
        state.fetch.fetchInfo.fetchStatusMap[actionType]?.[_fetchKey] === FetchStatus.Success ||
        state.fetch.fetchInfo.fetchStatusMap[actionType]?.[_fetchKey] === FetchStatus.Fail,
      isSlow: !!state.fetch.fetchInfo.isSlowMap[actionType]?.[_fetchKey],
      nextPage: state.fetch.fetchInfo.nextPageMap[actionType]?.[_fetchKey] || 0,
      totalCount: state.fetch.fetchInfo.totalCountMap[actionType]?.[_fetchKey] || 0,
      errorMessage: state.fetch.fetchInfo.errorMessageMap[actionType]?.[_fetchKey],
    }),
    shallowEqual
  );
}
