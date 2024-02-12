import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../../store/cartSlice";
import "./index.css";

const Favourites = () => {
  // sending the data to the redux state by using the useDispatch hook
  const dispatch = useDispatch();
  // getting the data from the redux state by using the useSelector hook
  const productItem = useSelector((state) => state.cart);
  // console.log(productItem);
  // for removing the recipe from the favurite list
  const removeRecipe = (id) => {
    dispatch(remove(id));
  };
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h1>Favourites</h1>

      {productItem.length === 0 ? (
        <div className="mt-5 unexpeted-results">
          <h1>No Recipes added as Favourites</h1>
        </div>
      ) : (
        <ul>
          {productItem.map((recipe) => (
            <li key={recipe.id} className="fav-recipe-list-cont">
              <h3>{recipe.title}</h3>
              <div>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="fav-recipe-image"
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeRecipe(recipe.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
