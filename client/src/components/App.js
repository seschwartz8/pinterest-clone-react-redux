import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import '../css/App.css';
import PhotoList from './photos/PhotoList';
import PhotoCreate from './photos/PhotoCreate';
import PhotoDetails from './photos/PhotoDetails';
import PhotoDelete from './photos/PhotoDelete';
import PhotoEdit from './photos/PhotoEdit';
import Header from './Header';
import Footer from './Footer';
import history from '../history';

const App = () => {
  // Header/footer components are nested in router to allow use of links, but do not have a route asigned so they're always visible
  return (
    <div className='app'>
      <Router history={history}>
        <Header />
        <Switch>
          {/*Switch shows only the first route that matches*/}
          <Route path='/' exact component={PhotoList} />
          <Route path='/photos/new' exact component={PhotoCreate} />
          <Route path='/photos/:id' exact component={PhotoDetails} />
          <Route path='/photos/edit/:id' exact component={PhotoEdit} />
          <Route path='/photos/delete/:id' exact component={PhotoDelete} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
