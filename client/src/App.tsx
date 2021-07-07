import { Route, Switch } from 'react-router-dom';
import GlobalStyles from '@style/GlobalStyles';
import Sample from '@/Sample';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={Sample} />
      </Switch>
    </>
  );
}
