import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Login from "./components/authComponents/Login";
import Register from "./components/authComponents/Register";
import Home from "./components/userComponents/Home";
import Setup from "./components/userComponents/Setup";
import Profile from "./components/userComponents/Profile";
import Reel from "./components/userComponents/Reel";
function App() {
  return (
    <>
      <Router>
          <Switch>
             <Route path="/register">
            <Register/>
          </Route>
           <Route path="/login">
            <Login/>
          </Route>
          <Route path="/setup">
            <Setup/>
          </Route>
           <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/reel">
            <Reel/>
          </Route>
           <Route path="/">
            <Home/>
          </Route>
        </Switch>
    </Router>
    </>
  );
}
export default App;
