import { Route, Switch } from 'react-router-dom';
import GlobalStyles from '@styles/GlobalStyles';
import Sample from '@components/Sample';

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
