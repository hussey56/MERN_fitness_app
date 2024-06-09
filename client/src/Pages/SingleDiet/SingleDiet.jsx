import React, { useEffect, useRef, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { useDispatch } from "react-redux";
import { MyAlert } from "../../Hooks/useAlert";
import { switchAlert } from "../../Store/WorkoutSlice";
import { deletediet, singleDiet } from "../../Api/internal";
import RoutineButton from "./Component/RoutineButton";
import Notifier from "../../Components/Navbar/Notifier";
const SingleDiet = () => {
  const [data,setData] = useState(null)
  const Ref = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [lText,setLtext] = useState("Fetching Diet ...");
const header = useNavigate();
let { id } = useParams();
const fetchDetaisl =async()=>{
  setLoading(true);
  setLtext("Fetching Diet ...")
  const reponse = await singleDiet(id);
  if(reponse.status == 200){
    setData(reponse.data.data);
  }else{
    header("/mydiet");
  }
  setLoading(false);
}

  const handleDelete = async (e) => {
    e.preventDefault();
    setLtext("Deleting workout ...")
    const cdata = {
      userId: data.userId,
      deleteId: data._id,
    };
    const response = await deletediet(cdata);
    if (response.status == 200) {
      // MyAlert({
      //   type: "success",
      //   message: { title: "Congrats", text: "Diet deleted successfully!" },
      // });
      // dispatch(switchAlert(true));
      alert("Congrats! Diet deleted successfully!")

      Ref.current.click();

      header("/mydiet");
    } else {
      // MyAlert({
      //   type: "error",
      //   message: {
      //     title: "Snaps!",
      //     text: "Error Occured in the diet deletion.",
      //   },
      // });
      // dispatch(switchAlert(true));
      console.log("something went wrong diet deleted ")


    }
  };
  useEffect(()=>{
    fetchDetaisl();
  },[id])
  if (!data) {
    return <></>;
  }
  if (loading) {
    return <Loader text={lText} />;
  }

  return (
     <>
      <div className="container">
      <Notifier/>
      <div className="singleworkout">
        <span style={{ textTransform: "uppercase", fontWeight: 500 }}>
          <i className="text-warning fa-solid fa-utensils mx-1"></i> {data.mealType}{" "}
        </span>
      </div>

      <div className="swcontainer mt-2 mb-1">
        <h3>
          <span className="text-dark">Name: </span>
          {data.name} ({" "}
          <i className="text-danger fa-solid fa-fire-flame-curved"></i>{" "}
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
                  <i className="text-danger fa-solid fa-fire-flame-curved mx-2"></i>{" "}
                  <strong>Calories : </strong> {fd.calories}
                </p>
                <p>
                  <i className="text-dark mx-2 fa-solid fa-hashtag"></i>{" "}
                  <strong>Quantity : </strong> {fd.quantity}
                </p>
                <p>
                  <i className="fa-solid fa-egg text-warning mx-2"></i>{" "}
                  <strong>Proteins : </strong> {fd.macros.protein}
                </p>
                <p>
                  <i className="fa-solid fa-wheat-awn text-warning mx-2"></i>{" "}
                  <strong>Carbs : </strong> {fd.macros.carbs}
                </p>
                <p>
                  <i className="fa-solid fa-bowl-food text-warning mx-2"></i>{" "}
                  <strong>Fats : </strong> {fd.macros.fat}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="modal fade"
        id="deleteDietModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Are you really want to delete the diet?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={Ref}

              ></button>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </div></>
    
  );
};

export default SingleDiet;
