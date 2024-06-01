import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getworkouts } from "../../Api/internal";
import WSearch from "./Component/WSearch";
import { setWorkout, switchAlert } from "../../Store/WorkoutSlice";
import WCard from "./Component/WCard";
import { MyAlert } from "../../Hooks/useAlert";
import Loader from "../../Components/Loader/Loader";
import Notifier from "../../Components/Navbar/Notifier";
const Workout = () => {
  const [loading, setLoading] = useState(false);
  const header = useNavigate();
  const userId = useSelector((state) => state.user._id);
  const workouts = useSelector((state) => state.workout.workouts);
  const dispatch = useDispatch();
  const fetchWorkouts = async () => {
    setLoading(true);
    const response = await getworkouts(userId);
    if (response.status === 200) {
      dispatch(setWorkout(response.data.workouts));
    } else {
      // dispatch(switchAlert(true));
      // const message = {
      //   title: "Server Error",
      //   message: "facing error while fetching workouts",
      // };
      // MyAlert({ type: "error", message });
      console.error("Internal Server Error: Workout")
    }
    setLoading(false);
  };
  const gotoaddworkout = () => {
    header("/addworkout");
  };
  useEffect(() => {
    fetchWorkouts();
  }, []);
  return (
    <div className="workout-container">
      <Notifier/>
      <div className="container">
        {loading === true ? <Loader text="Loading workouts..."/>:
        <>
          <WSearch />
          <div className="row mt-3">
            {workouts.length == 0 && (
              <h2 className="text-center">No Workout Found.</h2>
            )}
            <div className="col-md-4">
              <div className="addcard" onClick={gotoaddworkout}>
                <i class="text-primary fa-solid fa-circle-plus"></i>

                <p className="text-center">Add Workout</p>
              </div>
            </div>

            {workouts.length >= 1 &&
              workouts.map((workout) => {
                return <WCard key={workout._id} workout={workout} />;
              })}
          </div>
        </>}
      </div>
    </div>
  );
};

export default Workout;
