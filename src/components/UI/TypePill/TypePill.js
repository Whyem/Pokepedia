// Styles ----------------------------------
import "components/UI/TypePill/TypePill.scss";

// Components ----------------------------------
import React from "react";
import { Link } from "react-router-dom";

const TypePill = (props) => {
  return (
    <Link
      className="pill__link"
      to={"/types/" + props.type}
      style={{ background: props.color }}
    >
      {props.type}
    </Link>
  );
};

export default TypePill;
