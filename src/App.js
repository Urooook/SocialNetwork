
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/NavBar/NavBar';

//import DialogsContainer from './components/Dialogs/DialogsContainer';
//import News from './components/News/News';
//import Music from './components/Music/Music';

import Settings from './components/Settings/Settings';

import {BrowserRouter,Route, withRouter} from "react-router-dom";


// import UsersContainer from './components/Users/UsersConatainer';
import ProfileContainer from './components/Profile/ProfileContainer';
//import Login from './components/Login/Login';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {InitializeSuccess} from './redux/app-reducer';
import  Preloader  from './components/common/Preloader/Preloader';
import Weather from './components/Weather/Weather';
//import WeatherContainer from './components/Weather/WeatherContainer';

const UsersContainer = React.lazy(() => import('./components/Users/UsersConatainer'));
const Login = React.lazy(() => import('./components/Login/Login'));
const WeatherContainer = React.lazy(() => import('./components/Weather/WeatherContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {

  componentDidMount(){
    this.props.InitializeSuccess();
}


   render(){
    // debugger
      if(!this.props.initialize){
        return <Preloader />
      }
  
  return (
    <BrowserRouter>
    <div className="grid">
      <HeaderContainer />
      <NavBar />
      <div className="grid-content">

        <Route path='/dialogs' render={ ()=>
          <React.Suspense fallback={<Preloader />}>
          <DialogsContainer />
          </React.Suspense>
          } />
        <Route path='/profile/:userId?' render={ () =>
            <React.Suspense fallback={<Preloader />}>
          <ProfileContainer  />
          </React.Suspense>
          } />
        <Route path='/news' render={ () => 
          <React.Suspense fallback={<Preloader />}>
        <News />
        </React.Suspense>
        } />
        <Route path='/login' render={ () =>
          <React.Suspense fallback={<Preloader />}>
            <Login />
            </React.Suspense>
            } />
        <Route path='/music' render={ () =>
            <React.Suspense fallback={<Preloader />}>
          <Music />
          </React.Suspense>
          } />
        <Route path='/settings' render={ () =>
          <React.Suspense fallback={<Preloader />}>
          <Settings />
          </React.Suspense>
          } />
        <Route path='/users' render={ () =>
            <React.Suspense fallback={<Preloader />}>
              <UsersContainer />
            </React.Suspense>
          } />
        <Route path='/weather' render={ () =>
            <React.Suspense fallback={<Preloader />}>
          <WeatherContainer />
          </React.Suspense>
          } />

      
        
      </div>
    </div>
    </BrowserRouter>
  );
   }
}

const mapStateToProps = (state) =>{
  // debugger
  return{
    initialize: state.app.initialized
  }
}

export default compose(
  //withRouter,
  connect(mapStateToProps,{InitializeSuccess})
)(App);
