import React from "react";
import { Outlet } from "react-router-dom";
const BusinessLayout = (props) => {
    return(
    <>
       <h5>BusinessLayout</h5> 
        <Outlet />
        </>
    )
};

export default BusinessLayout;
