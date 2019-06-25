import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/Signup" component={Signup} />
            <Route path="/Login" component={Login} />
            <Route path="/Home" component={Home} />
            <Redirect from="/" exact to="/Login" />
          </Switch>   
        </Layout>
      </div>
      </BrowserRouter>
    );
  }
}
export default App;
