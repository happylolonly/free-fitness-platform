
 import React, { Component } from 'react';


import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

import RepostsPage from './pages/Reposts/RepostsContainer';
import FAQPage from './pages/FAQ/FAQ';

import App from './App';



export default (
    <Router>
        <App>

            <Switch>
  <Route exact path='/' component={RepostsPage}/>
  <Route path='/faq' component={FAQPage}/>
</Switch>


        </App>

    </Router>
)
