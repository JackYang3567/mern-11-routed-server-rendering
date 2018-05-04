import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'


import {About  } from './components/about/About.jsx';
import {Home} from './components/home/Home.jsx';
import {Events} from './components/events/Events.jsx';
import {Products} from './components/products/Products.jsx';
import {Contact} from './components/contact/Contact.jsx';
import {Whoops404} from './components/whoops404/Whoops404.jsx';
import IssueList from './components/issue/IssueList.jsx';
import IssueShow from './components/issue/IssueShow.jsx';
import IssueEdit from './components/issue/IssueEdit.jsx';



window.React = React

export const RoutedApp = () => (
    <BrowserRouter>
        
        
        <Switch>
            
            <Route exact path="/" component={Home} />
            
            <Route  path="/issues" component={IssueList} />
            <Route path="/issue-edit/:id" component={IssueEdit} />
            <Route path="/issue-show/:id" component={IssueShow} />
                        
            <Route  path="/about" component={About} />
            <Redirect from="/history" to="/about/history" />
            <Redirect from="/services" to="/about/services" />
            <Redirect from="/location" to="/about/location" />
            <Route path="/events" component={Events} />
            <Route path="/products" component={Products} />
            <Route path="/contact" component={Contact} />
            <Route component={Whoops404} />
        </Switch>
        
      
    </BrowserRouter>
);
