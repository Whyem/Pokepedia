// Styles ----------------------------------
import "components/UI/Paginator/Paginator.scss";

// Components ----------------------------------
import React, { useState, useEffect } from "react";

// Images ----------------------------------
import next from "assets/images/next.svg";
import prev from "assets/images/previous.svg";

// Utils ----------------------------------
import shortid from "shortid";

const Paginator = (props) => {
  const [paginator, setPaginator] = useState({
    currentPage: 1,
    pages: 0,
  });

  const [linksComp, setLinksComp] = useState();

  useEffect(() => {
    setPaginator({
      ...paginator,
      pages: props.pages,
    });
  }, [props.pages]);

  useEffect(() => {
    var lc = [];
    if (paginator.pages < 5) {
      const arr = Array.from({ length: paginator.pages }, (v, k) => k + 1);

      lc = arr.map((el) => {
        if (el == paginator.currentPage) {
          return (
            <a
              className="activePage"
              key={shortid.generate()}
              onClick={clickHandler}
            >
              {el}
            </a>
          );
        }
        return (
          <a onClick={() => clickHandler(el)} key={shortid.generate()}>
            {el}
          </a>
        );
      });
    } else if (
      paginator.currentPage >= 5 &&
      paginator.pages - paginator.currentPage >= 5
    ) {
      lc = [
        <a key={shortid.generate()} onClick={() => clickHandler(1)}>
          1
        </a>,
        <a key={shortid.generate()}>. . .</a>,
        <a
          key={shortid.generate()}
          onClick={() => clickHandler(paginator.currentPage - 1)}
        >
          {paginator.currentPage - 1}
        </a>,
        <a
          key={shortid.generate()}
          className="activePage"
          onClick={clickHandler}
        >
          {paginator.currentPage}
        </a>,
        <a
          key={shortid.generate()}
          onClick={() => clickHandler(paginator.currentPage + 1)}
        >
          {paginator.currentPage + 1}
        </a>,
        <a key={shortid.generate()}>. . .</a>,
        <a
          onClick={() => clickHandler(paginator.pages)}
          key={shortid.generate()}
        >
          {paginator.pages}
        </a>,
      ];
    } else if (paginator.currentPage < 5) {
      const arr = Array.from({ length: 5 }, (v, k) => k + 1);

      const beforeLinks = arr.map((el) => {
        if (el == paginator.currentPage) {
          return (
            <a
              className="activePage"
              key={shortid.generate()}
              onClick={clickHandler}
            >
              {el}
            </a>
          );
        }
        return (
          <a onClick={() => clickHandler(el)} key={shortid.generate()}>
            {el}
          </a>
        );
      });

      lc = [
        ...beforeLinks,
        <a key={shortid.generate()}>. . .</a>,
        <a
          onClick={() => clickHandler(paginator.pages)}
          key={shortid.generate()}
        >
          {paginator.pages}
        </a>,
      ];
    } else {
      const arr = Array.from({ length: 5 }, (v, k) => k + 1);

      const afterLinks = arr.map((el) => {
        if (paginator.pages - 5 + el == paginator.currentPage) {
          return (
            <a
              className="activePage"
              key={shortid.generate()}
              onClick={clickHandler}
            >
              {paginator.pages - 5 + el}
            </a>
          );
        }
        return (
          <a
            onClick={() => clickHandler(paginator.pages - 5 + el)}
            key={shortid.generate()}
          >
            {paginator.pages - 5 + el}
          </a>
        );
      });

      lc = [
        <a onClick={() => clickHandler(1)} key={shortid.generate()}>
          1
        </a>,
        <a key={shortid.generate()}>. . .</a>,
        ...afterLinks,
      ];
    }

    setLinksComp([...lc]);
  }, [paginator]);

  const clickHandler = (page) => {
    setPaginator({
      ...paginator,
      currentPage: page,
    });
    props.clicked(page);
    window.scrollTo(0, 0);
  };

  const changeCurrentPageHandler = (x) => {
    const p = paginator.currentPage + x;

    if (p >= 1 && p <= paginator.pages) {
      setPaginator({
        ...paginator,
        currentPage: p,
      });
      props.clicked(p);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="paginatorLinks">
      <img
        className="prev"
        src={prev}
        alt="prev"
        onClick={() => changeCurrentPageHandler(-1)}
      />
      {linksComp}
      <img
        className="next"
        src={next}
        alt="next"
        onClick={() => changeCurrentPageHandler(1)}
      />
    </div>
  );
};

export default Paginator;
