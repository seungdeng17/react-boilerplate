import { Route, Switch } from 'react-router-dom';
import GlobalStyles from '@style/GlobalStyles';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={Temp} />
      </Switch>
    </>
  );
}

function Temp() {
  return <div>hello world</div>;
}
