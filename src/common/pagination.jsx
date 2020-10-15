import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { totalItems, itemsPerPage, currentPage, handlePageClick } = props;
  let totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages === 1) return null;
  const pageNumbers = _.range(1, totalPages + 1);

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageNumbers.map((page) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={page}
            >
              <Link
                to="#"
                className="page-link"
                onClick={() => handlePageClick(page)}
              >
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func,
};

export default Pagination;
