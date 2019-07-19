import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Recipe from "./Recipe";

const App = () => (
  <Router>
    <Header />
    <main>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/recipes/:slug" component={Recipe} />
    </main>
  </Router>
);

export default App;
