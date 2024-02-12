import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarSection from "./components/NavbarSection";
import Home from "./components/Home";
import Favourites from "./components/Favourites";
import Register from "./components/Register";
import Login from "./components/Login";
import RecipeDetails from "./components/RecipeDetails";
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";

/* In this App.js file we did the routing for different components and also provide the redux for
    the state management */

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <NavbarSection />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favourites />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recipeId/:id" element={<RecipeDetails />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
