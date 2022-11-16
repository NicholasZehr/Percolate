import React from "react";
import { Outlet } from "react-router-dom";
const BusinessLayout = (props) => {
    return(
    <>
       <h5>UserLayout</h5> 
        <Outlet />
        </>
    )
};

export default BusinessLayout;
