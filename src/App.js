import './App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Product from './pages/ProductDetail';
import Cart from './pages/Cart';
import { useState, useEffect } from 'react'
import Bill from './pages/Bill';
import Login from './pages/Login';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import Register from './pages/Register';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const loginStatus = localStorage.getItem('token') ? true : false
    setIsLogin(loginStatus);
    if (isLogin) {
      axios.get('http://127.0.0.1:8000/user', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      }).then((res) => {
        setUserInfo(res.data);
      })
    }
  }, [isLogin])

  // Handle search item
  const handleSearchValue = (value) => {
    setSearchValue(value);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
  }

  return (
    <SnackbarProvider>
      <div className="App">
        <Router>
          <NavBar userName={userInfo.HoTenKH} handleLogout={handleLogout} isLogin={isLogin} handleSearchValue={handleSearchValue} value={searchValue} />
          <Switch>
            <Route exact path='/' >
              <Home />
            </Route>
            <Route path='/product/:productID'>
              <Product />
            </Route>
            <Route path='/cart'>
              <Cart />
            </Route>
            <Route path='/bill' render={() => {
              return localStorage.getItem('token') ? <Bill /> : <Redirect to='/login' />
            }}>
            </Route>
            <Route path='/login'  >
              <Login />
            </Route>
            <Route path='/register' component={Register} />

          </Switch>
        </Router>
      </div>
    </SnackbarProvider>
  );
}

export default App;
