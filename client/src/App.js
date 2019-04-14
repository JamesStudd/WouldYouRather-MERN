import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Title from "./components/Title";
import Question from "./components/Question";
import Admin from "./components/Admin";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Title />
          <Route path="/" component={Question} exact />
          <Route path="/admin" component={Admin} />
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
