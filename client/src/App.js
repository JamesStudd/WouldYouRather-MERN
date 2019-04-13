import React, { Component } from "react";
import "./App.css";
import Question from "./components/Question";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <h1>Hello World</h1>
          <Question />
        </div>
      </Provider>
    );
  }
}

export default App;
