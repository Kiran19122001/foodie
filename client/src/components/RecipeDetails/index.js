import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Favourites from "./../Favourites/index";
import { useDispatch } from "react-redux";
import { add } from "../../store/cartSlice";
import "./index.css";

const RecipeDetails = () => {
  // using the  useLocation hook for getting the state data thats been sent from the useNavigate hook
  const location = useLocation();
  // sending the recipe if user adds the recipe as favorite .we send that recipe details to the redux sore
  const dispatch = useDispatch();

  const recipe = location.state.data;
  console.log(recipe);
  // handling the onClick of recipe adding
  const addToCart = (recipe) => {
    dispatch(add(recipe));
  };
  return (
    <div className="recipe-d-main-cont">
      <h1>RecipeDetails</h1>
      <div className="mobile-s-rd">
        <div>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="recipe-d-image"
          />
        </div>
        <div>
          <h1 className="fontSty-rec">{recipe.title}</h1>
          <button
            type="button"
            className="btn btn-success message-add"
            onClick={() => addToCart(recipe)}
          >
            Add to Favourites
          </button>

          <h2 className="fontSty-rec">Description</h2>
          <p className="text-dark fs-2.5 font-weight-bold">
            {recipe.summary.replace(/(<([^>]+)>)/gi, "")}
          </p>
          <h4 className="fontSty-rec">Ingredients</h4>
          <ol>
            {recipe.extendedIngredients.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
