import './App.css';
import Header from './components/Header';
import { Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Uploadproduct from './components/adminpannel/Uploadproduct';
import Men from './components/Men';
import Women from './components/Women';
import Kid from './components/Kid';

function App() {
  return (
    <>
      <Header />

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>


      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/men" component={Men} />
        <Route exact path="/women" component={Women} />
        <Route exact path="/kid" component={Kid} />



      </Switch>
    </>
  );
}

export default App;
