// Styles ----------------------------------
import "components/UI/ErrorComponent/ErrorComponent.scss";

// Components ----------------------------------
import React from "react";

// Images ----------------------------------
import x from "assets/images/times-solid.svg";

const ErrorComponent = (props) => {
  return (
    <React.Fragment>
      <div className="errorContainer">
        <img className="closeImg" src={x} alt="x" />
        <h3 className="errorHeader">Oops There seems to be a problem!</h3>
        <p>
          <strong>Error Message: </strong>
          <span>{props.message}</span>
        </p>
      </div>
      <div className="errorModal" onClick={props.clicked}></div>
    </React.Fragment>
  );
};

export default ErrorComponent;
