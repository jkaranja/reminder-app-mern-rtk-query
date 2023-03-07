import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";

const SS2Pagination = ({ pages, setCurrentPage, currentPage }) => {
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(8); //initial max 8 pages then ellipsis//next
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0); //initial must be zero//add start  ellipsis after 8 //prev
  const [pageNumberLimit] = useState(8); //static page limit/both min & max setter

  //get page/number clicked
  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  pages = [...Array(pages)].map((page, i) => {
    return i + 1;
  });

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  //display pages/numbers within min -> max pages count set
  const renderPageNumbers = pages?.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <Button
          key={number}
          id={number}
          onClick={handlePageClick}
          variant={currentPage === number ? 'contained' : "outlined"}
          disableElevation          
          // active={currentPage === number ? true : false}
        >
          {number}
        </Button>
      );
    } else {
      return null;
    }
  });

  //determine when to display ellipsis for max page count
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <Button onClick={handleNextBtn}> ...</Button>;
  }
  //determine when to display ellipsis for min/left page count
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <Button onClick={handlePrevBtn}>...</Button>;
  }

  return (
    <ButtonGroup size="small" color="secondary">
      {pages.length ? (
        <Button
          onClick={handlePrevBtn}
          disabled={currentPage === pages[0] ? true : false}
        >
          {" "}
          prev
        </Button>
      ) : null}
      {pageDecrementBtn}
      {renderPageNumbers}
      {pageIncrementBtn}
      {pages.length ? (
        <Button
          onClick={handleNextBtn}
          disabled={currentPage === pages[pages.length - 1] ? true : false}
        >
          next{" "}
        </Button>
      ) : null}
    </ButtonGroup>
  );
};

export default SS2Pagination;
