import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import { useEffect } from 'react';

function App() {
  

  return (
    <div className="App">
      
      <Header>
        
      </Header>
      <Routes >

        <Route exact path='/sign-up' element = {<Register />} />
        <Route exact path='/sign-in' element = {<Login />} />
        <Route exact path='/profile' element = {<Profile />} />
        <Route exact path='/movies' element = {<Movies />} />

        <Route exact path='/404' element = {<NotFound />} />
        <Route exact path='/' element = {
          <Main />
        
        }/>
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
