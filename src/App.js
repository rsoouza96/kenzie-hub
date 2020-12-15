import "antd/dist/antd.css";
import GlobalStyle from "./styles/global";
import { Switch, Route } from "react-router-dom";
<<<<<<< HEAD
=======
import { useDispatch } from "react-redux";
import { addUserToken } from './store/modules/current-user/action'
>>>>>>> f67ac704ba1e6708d6a0756725fcb47344b02ad5

import RegisterPage from "./pages/register-page";
import Home from "./pages/home";
import Login from "./pages/login-page";
import Header from "./components/header";
import UserPage from "./pages/user-page";
import Feed from "./pages/feed-page";
import PageNotFound from "./pages/page-not-found";

function App() {
  const dispatch = useDispatch()
  localStorage.hasOwnProperty("authToken") ? (dispatch(addUserToken(localStorage.getItem('authToken')))) : (dispatch(addUserToken('')))
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <div id="main-container">
        <Header />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route path="/feed">
            <Feed />
          </Route>
          <Route exact path="/myprofile">
            <UserPage /> {/*MyProfile*/}
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
<<<<<<< HEAD
          <Route path="/user/:id">
            <Header />
            <UserPage />
          </Route>
          <Route path="*">
            <Header />
=======
          <Route path='/user/:id'>
            <UserPage />
          </Route>
          <Route path='*'>
>>>>>>> f67ac704ba1e6708d6a0756725fcb47344b02ad5
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
