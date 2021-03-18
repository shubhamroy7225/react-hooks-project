import React from 'react';

import './IngredientList.css';

const IngredientList = props => {
  console.log(props)
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map((ig,index)=> (
          <li key={index} onClick={props.removeIngredient}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
