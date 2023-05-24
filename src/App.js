import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/User/Login";
import AllPost from "./Components/User/AllPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/User/Dashboard";
import Register from "./Components/User/Register";
import { useState } from "react";
import Logout from "./Components/User/Logout";
import ViewPost from "./Components/Post/ViewPost";
import ShowCategoryDetails from "./Components/Category/ShowCategoryDetails";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  const [userState, setUserState] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("CurrentUser")
  );

  const [category, setCategory] = useState(localStorage.getItem("AllCategory"));
  
  return (
    <>
      <Router>
        <Navbar userState={userState} setUserState={setUserState} currentUser={currentUser}/>
        <Routes>
          <Route
            exact
            path="/"
            element={<AllPost currentUser={currentUser} />}
          />
          <Route element={<ProtectedRoute userState={userState} />}>
            <Route
              exact
              path={"/dashboard/"+currentUser.id}
              element={
                <Dashboard currentUser={currentUser} category={category} />
              }
            />
            <Route
              exact
              path="/post/:id"
              element={
                <ViewPost
                  userState={userState}
                  setUserState={setUserState}
                  currentUser={currentUser}
                />
              }
            />
          </Route>

          <Route
            exact
            path="/dashboard"
            element={
              <Dashboard currentUser={currentUser} category={category} />
            }
          />

          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/login"
            element={<Login setUserState={setUserState} />}
          />
          <Route
            exact
            path="/logout"
            element={
              <Logout userState={userState} setUserState={setUserState} />
            }
          />

          <Route exact path="/category/:id" element={<ShowCategoryDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
