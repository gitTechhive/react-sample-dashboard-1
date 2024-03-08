import React from "react";
import "./Loader.scss";

function Loader({ loading }: any) {
  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}

export default Loader;

Loader.defaultProps = {
  loading: false,
};
