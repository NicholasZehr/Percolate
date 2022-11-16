import React from "react";
import { Outlet } from "react-router";

const ReviewLayout = (props) => {
  return (
    <>
      <Outlet />
      <div className="box">{`This is your ReviewLayout Component`} </div>
    </>
  );
};

export default ReviewLayout;
