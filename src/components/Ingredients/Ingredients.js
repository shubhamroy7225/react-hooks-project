import React, { useCallback, useEffect, useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients(props) {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    fetch(
      "https://react-hooks-update-6a9e1-default-rtdb.firebaseio.com/ingredients.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        let newArray = [];
        for (let key in resData) {
          newArray.push({
            id: key,
            title: resData[key].title,
            amount: resData[key].amount,
          });
        }
        setIngredients(newArray);
      });
  }, []);
  const addIngredient = (ing) => {
    fetch(
      "https://react-hooks-update-6a9e1-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ing),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setIngredients((prevState) => [
          ...prevState,
          {
            id: resData.name,
            ...ing,
          },
        ]);
      });
  };
  const searchData = useCallback((data) => {
    setIngredients(data);
  }, []);

  const removeItem = (id) => {
    fetch(
      `https://react-hooks-update-6a9e1-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      setIngredients((prevState) =>
        prevState.filter((ingredients) => ingredients.id !== id)
      );
    });
  };
  return (
    <div className="App">
      <IngredientForm addIngredients={addIngredient} />
      <section>
        <Search searchIngredientData={searchData} />
        <IngredientList
          ingredients={ingredients}
          removeIngredient={removeItem}
        />
      </section>
    </div>
  );
}

export default Ingredients;
