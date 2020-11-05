import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Search from "./components/Search"
import Saved from "./components/Saved"

export const RouteStrings = {
  search: "/",
  saved: "/saved"
}



export default class App extends Component {
  render() {
    return (
      <div className="main">
        <Router
        >
          <Route
            path={RouteStrings.search}
            exact
            render={props => <Search />}

          />
          <Route
            path={RouteStrings.saved}
            render={props => <Saved />}
          />
        </Router>
      </div>
    );
  }
}

