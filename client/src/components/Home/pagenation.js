import React from "react";
import "./pagenation.css";
// handling the user action on which page is being clicked and sending back to the home component about the clicked page
const pagenation = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      {pages.map((page, index) => (
        <button
          type="button"
          className={currentPage === page ? "active" : ""}
          key={index}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default pagenation;
