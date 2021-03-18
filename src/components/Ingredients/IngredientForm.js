import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [ingredient,setIngredient]=useState({
    title:'',
    amount:''
  })
  const inputHandled = (event)=>{
    setIngredient({
     ...ingredient,[event.target.name]:event.target.value
    })
  }
  
  const submitHandler = event => {
    event.preventDefault();
    props.addIngredients({...ingredient})
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input name='title' type="text" id="title" value={ingredient.title} onChange={inputHandled}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input name='amount' type="number" id="amount" value={ingredient.amount} onChange={inputHandled}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
