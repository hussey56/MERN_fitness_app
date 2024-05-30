import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";
import { useSelector } from "react-redux";
import useAutoLogin from "./Hooks/useAutoLogin";
import Loader from "./Components/Loader/Loader";
import Layout from "./Components/Layout/Layout";
import Workout from "./Pages/Workout/Workout";
import MyDiet from "./Pages/MyDiet/MyDiet";
import "./App.css";
import AddWorkout from "./Pages/Workout/AddWorkout/AddWorkout";
import { NotificationContainer } from "react-notifications";
import AddDiet from "./Pages/MyDiet/AddDiet/AddDiet";
import SingleWorkout from "./Pages/SingleWorkout/SingleWorkout";
import SingleDiet from "./Pages/SingleDiet/SingleDiet";
function App() {
  const showNotification = useSelector((state) => state.workout.showalert);

  const isAuth = useSelector((state) => state.user.auth);
  const loading = useAutoLogin();

  return loading ? (
    <Loader text={"Loading ..."} />
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Layout isAuth={isAuth}>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/workouts"
            exact
            element={
              <Layout isAuth={isAuth}>
                <Workout />
              </Layout>
            }
          />
          <Route
            path="/mydiet"
            exact
            element={
              <Layout isAuth={isAuth}>
                <MyDiet />
              </Layout>
            }
          />
          <Route
            path="/addworkout"
            exact
            element={
              <Layout isAuth={isAuth}>
                <AddWorkout />
              </Layout>
            }
          />
          <Route
            path="/adddiet"
            exact
            element={
              <Layout isAuth={isAuth}>
                <AddDiet />
              </Layout>
            }
          />
            <Route
            path="/singleworkout"
            exact
            element={
              <Layout isAuth={isAuth}>
                <SingleWorkout/>
              </Layout>
            }
          />
            <Route
            path="/singlediet"
            exact
            element={
              <Layout isAuth={isAuth}>
                <SingleDiet/>
              </Layout>
            }
          />
          <Route path={"/login"} exact element={<Login isAuth={isAuth} />} />
          <Route path={"/signup"} exact element={<Signup isAuth={isAuth} />} />
          <Route path={"*"} exact element={<h2>404 Not Found</h2>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
