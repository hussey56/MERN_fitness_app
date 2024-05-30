import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setDiet } from "../../../../Store/DietSlice";
import { searchdiet } from "../../../../Api/internal";

const DSearch = () => {
  const diets = useSelector((state) => state.diet.diets);
  const userId = useSelector((state)=>state.user._id);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [sorts, setSort] = useState("");
  const handleSort = async (e) => {
    e.preventDefault();
    setSort(e.target.value);
    const data = {
      searchString: search,
      sortValue: e.target.value,
      userId
    };
    const response = await searchdiet(data);
    if (response.status === 200) {
      dispatch(setDiet(response.data.results));
    } else {
      alert("error");
    }
    
  };
  const handleSearch = async () => {
    const data = {
      searchString: search,
      sortValue: sorts,
      userId
    };
    const response = await searchdiet(data);
    if (response.status === 200) {
      dispatch(setDiet(response.data.results));
    } else {
      alert("error");
    }
  };

  return (
    <div className="container">
      <div className="w-search-box m-auto my-4">
        <input
          type="text"
          placeholder="e.g: Pre Workout meal "
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <BiSearch className="search-icon text-primary" onClick={handleSearch} />
      </div>
      <div className="sort-by mb-3">
        <h2>Sort by : </h2>
        <select name="sort" value={sorts} onChange={handleSort}>
          <option value="totalCalories">Calories</option>
          <option value="protein">Protein</option>
          <option value="foodItem">Nutrition Item</option>
        </select>
      </div>
    </div>
  );
};

export default DSearch;
