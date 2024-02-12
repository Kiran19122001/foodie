import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Pagenation from "./pagenation.js";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";

const Home = () => {
  const [data, setData] = useState([]); //state to store the data from the api
  const [searchInput, setSearchInput] = useState(""); //for handling the search input
  const [currentPage, setCurrentPage] = useState(1); //pagenation setting initial page number as 1 then updating
  const [postsPerPage, setPostsPerPage] = useState(8); //state for posts per page
  const [filter, setFilter] = useState(""); // State to store the current filter
  const [activeFilter, setActiveFilter] = useState(""); //state for active filter
  const [loading, setLoading] = useState(true); //state for loading when the api is getting valled
  const [error, setError] = useState(null); //for api erro handling
  const [showModal, setShowModal] = useState(false); //popup to instruct the user to login or rigister
  const navigate = useNavigate();
  //api is getting called in the useEffect
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // getting random 40 recipe items from the api
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=fbfd1c40a64a45eb974d9ff59a0f5413&number=40`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      setData(responseData);
      // console.log(responseData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); // Reset currentPage when the search input changes
  };
  // fiters handling based on user action
  const handleFilterClick = (filterValue) => {
    if (activeFilter === filterValue) {
      setActiveFilter(""); // Deactivate the filter if it's already active
      setFilter("");
    } else {
      setFilter(filterValue);
      setActiveFilter(filterValue); // Activate the filter
    }
    setCurrentPage(1); // Reset currentPage when a filter is applied
  };
  // hadling the user filters and search reasults
  const filteredRecipes = data.recipes
    ? data.recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchInput.toLowerCase()) &&
          (filter === "" || recipe[filter])
      )
    : [];
  // pagenation initializing the posts per page
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = filteredRecipes.slice(firstPostIndex, lastPostIndex);
  // renders loading text while api calli is being called
  if (loading) {
    return <div className="unexpeted-results">Loading...</div>;
  }
  // renders the failure view if the api call is failed
  if (error) {
    return (
      <div className="unexpeted-results">
        Failed to fetch data. Please try again later.
      </div>
    );
  }
  // for the user authentication whether he is loged or not if he is loged in then he can view the recie details and add them as favorite
  const handleViewDetails = (recipe) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/recipeId/${recipe.id}`, {
        state: { data: recipe },
      });
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="heading-recipe">
        <div className="d-flex justify-content-between mobile-view-head-cont">
          <h1>Food Recipes</h1>
          <input
            type="search"
            placeholder="Search..."
            className="searchInput"
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="filters-line">
          <h3>Get Recipes by filters </h3>
          <button
            type="button"
            className={`buttons-filters ${
              activeFilter === "vegetarian" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("vegetarian")}
          >
            Vegetarian
          </button>
          <button
            type="button"
            className={`buttons-filters ${
              activeFilter === "veryHealthy" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("veryHealthy")}
          >
            Very Healthy
          </button>
          <button
            type="button"
            className={`buttons-filters ${
              activeFilter === "veryPopular" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("veryPopular")}
          >
            Very Popular
          </button>
          <button
            type="button"
            className={`buttons-filters ${
              activeFilter === "dairyFree" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("dairyFree")}
          >
            Dairy Free
          </button>
        </div>
      </div>

      {filteredRecipes.length === 0 && (
        <div className="unexpeted-results">
          No recipes found matching your criteria.
        </div>
      )}

      <ul className="recipe-container">
        {currentPost.map((recipe) => (
          <li key={recipe.id} className="list-item-container">
            <Card className="card-container">
              <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
              <Card.Body>
                <Card.Title>
                  {recipe.title.length > 25
                    ? recipe.title.substring(0, 20) + "..."
                    : recipe.title}
                </Card.Title>
                <Button
                  onClick={() => handleViewDetails(recipe)}
                  variant="primary"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
      {/*for pagenation we send data to the pagenation component */}
      <Pagenation
        totalPosts={filteredRecipes.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      {/* for pop up we use react model */}
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Attention</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please log in to view recipe details.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
