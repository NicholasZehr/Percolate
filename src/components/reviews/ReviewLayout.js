import React from "react";
import { Outlet } from "react-router";

const ReviewLayout = (props) => {
  return (
    <>
      <div className="box">{`This is your ReviewLayout Component`} </div>
      <Outlet />
    </>
  );
};

export default ReviewLayout;
