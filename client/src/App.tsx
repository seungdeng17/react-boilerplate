import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Temp} />
    </Switch>
  );
}

function Temp() {
  return <div>hello world</div>;
}
