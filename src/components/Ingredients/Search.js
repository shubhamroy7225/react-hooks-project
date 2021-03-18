import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const {searchIngredientData} = props
  const [searchData,setSearchData]=useState('')
  useEffect(() => {
    let query = searchData.length === 0 ? '':`?orderBy="title"&equalTo="${searchData}"`
    fetch(
      "https://react-hooks-update-6a9e1-default-rtdb.firebaseio.com/ingredients.json" + query
    )
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        let newArray = [];
        for (let key in resData) {
          newArray.push({
            id: resData.name,
            title: resData[key].title,
            amount: resData[key].amount,
          });
        }
         searchIngredientData(newArray)
      });
  }, [searchData,searchIngredientData]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={searchData} onChange={(event)=>setSearchData(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
