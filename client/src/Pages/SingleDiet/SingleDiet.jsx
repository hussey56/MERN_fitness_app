import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { useDispatch } from "react-redux";
import { MyAlert } from "../../Hooks/useAlert";
import { switchAlert } from "../../Store/WorkoutSlice";
import { deletediet } from "../../Api/internal";
import RoutineButton from "./Component/RoutineButton";
import Notifier from "../../Components/Navbar/Notifier";
const SingleDiet = () => {
  const location = useLocation();
  const data = location.state?.singlediet;
  const ModelRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
const header = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    const cdata = {
      userId: data.userId,
      deleteId: data._id,
    };
    const response = await deletediet(cdata);
    if (response.status == 200) {
      ModelRef.current.click();
      dispatch(switchAlert(true));
      MyAlert({
        type: "success",
        message: { title: "Congrats", text: "Diet deleted successfully!" },
      });
      header("/mydiet");
    } else {
      dispatch(switchAlert(true));
      MyAlert({
        type: "error",
        message: {
          title: "Snaps!",
          text: "Error Occured in the diet deletion.",
        },
      });
    }
    setLoading(false);
  };
  if (!data) {
    return <h2>No data found.</h2>;
  }
  if (loading) {
    return <Loader text="Deleting the Workout ..." />;
  }
  return (
    <div className="container">
      <Notifier/>
      <div className="singleworkout">
        <span style={{ textTransform: "uppercase", fontWeight: 500 }}>
          <i class="text-warning fa-solid fa-utensils mx-1"></i> {data.mealType}{" "}
        </span>
      </div>

      <div className="swcontainer mt-2 mb-1">
        <h3>
          <span className="text-dark">Name: </span>
          {data.name} ({" "}
          <i class="text-danger fa-solid fa-fire-flame-curved"></i>{" "}
          {data.totalCalories} <span className="text-danger">calories</span>)
        </h3>
        <div>
          <RoutineButton data={data}/>
          <button
            className="btn btn-danger mx-1 my-1 btn-lg"
            data-bs-toggle="modal"
            data-bs-target="#deleteDietModal"
          >
            Delete Diet
          </button>
        </div>
      </div>
      <div className="row mt-1 mb-2">
        {data.foodItems.map((fd) => (
          <div className="col-md-4">
            <div className="swcard border-light">
              <div className="dwtitle">{fd.name}</div>
              <div className="dwcard-body ">
                <p>
                  <i class="text-danger fa-solid fa-fire-flame-curved mx-2"></i>{" "}
                  <strong>Calories : </strong> {fd.calories}
                </p>
                <p>
                  <i class="text-dark mx-2 fa-solid fa-hashtag"></i>{" "}
                  <strong>Quantity : </strong> {fd.quantity}
                </p>
                <p>
                  <i class="fa-solid fa-egg text-warning mx-2"></i>{" "}
                  <strong>Proteins : </strong> {fd.macros.protein}
                </p>
                <p>
                  <i class="fa-solid fa-wheat-awn text-warning mx-2"></i>{" "}
                  <strong>Carbs : </strong> {fd.macros.carbs}
                </p>
                <p>
                  <i class="fa-solid fa-bowl-food text-warning mx-2"></i>{" "}
                  <strong>Fats : </strong> {fd.macros.fat}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        class="modal fade"
        id="deleteDietModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Are you really want to delete the diet?
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                ref={ModelRef}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default SingleDiet;
