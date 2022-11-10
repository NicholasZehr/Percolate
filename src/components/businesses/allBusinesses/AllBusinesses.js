import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "../../../redux/businessSlice";
import React from "react";

const AllBusinesses = (props) => {
  const { businessList } = useSelector((state) => {
    state.business;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBusiness = async () => {
      const returnedBusinessList = await fetch();
      dispatch(updateList(returnedBusinesList))
    };
    fetchBusiness();
  }, []);
  return (
    <>
      {businessList.length ? (
        <div>
          {this.props.businesses.businesses.map((business) => (
            <div>
              {business.data().name} {business.id}
            </div>
          ))}
        </div>
      ) : (
        <div>Loading your businesses...</div>
      )}
    </>
  );
};

export default AllBusinesses
