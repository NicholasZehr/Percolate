import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <div className="box">{`This is your UserLayout Component`} </div>
       <Outlet/>
    </>
  );
};

export default UserLayout;
