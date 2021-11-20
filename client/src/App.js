import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/homepage/homepage.component';
import GoogleMapPage from './pages/googlemap/googlemap.component';
import AboutPage from './pages/about/about.component';
import NewsPage from './pages/news/news.component';

import './App.scss';


const App = () => {
  return(
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/googlemappage' component={GoogleMapPage} />
        <Route exact path='/about' component={AboutPage} />
        <Route exact path='/news' component={NewsPage} />
      </Switch>
      <Footer />
    </div>
  )
}


export default App;
