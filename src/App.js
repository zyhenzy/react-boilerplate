import React, { Component } from "react";
import Movies from "./components/movies";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar/navbar";

class App extends Component {
  render() {
    return (
        <div>
          <NavBar/>
          <main className="container">
              <Switch >
                  <Route path="/movies" component={Movies} />
              </Switch>
          </main>
        </div>
    );
  }
}

export default App;
