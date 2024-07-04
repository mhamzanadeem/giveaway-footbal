import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Page1} />
        <Route path="/Page2" component={Page2} />
      </Switch>
    </Router>
  );
};

export default App;
