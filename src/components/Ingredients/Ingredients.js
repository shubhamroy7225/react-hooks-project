import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients(props) {
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = (ing) => {
    fetch('https://react-hooks-update-6a9e1-default-rtdb.firebaseio.com/ingredients.json',{
      method:'POST',
      body:JSON.stringify(ing),
      headers:{'Content-Type':'application/json'}
    }).then(response=>{
      return response.json()
    }).then(resData=>{
      setIngredients(prevState=>[...prevState,{
        id:resData.name,...ing
      }]);
    })
  };
  const removeItem = (id) => {
    let newArr = [...ingredients];
    const index = newArr.findIndex((item) => item.id === id);
    newArr.splice(index, 1);
    setIngredients(newArr);
  };
  return (
    <div className="App">
      <IngredientForm addIngredients={addIngredient} />
      <section>
        <Search />
        <IngredientList
          ingredients={ingredients}
          removeIngredient={removeItem}
        />
      </section>
    </div>
  );
}

export default Ingredients;
