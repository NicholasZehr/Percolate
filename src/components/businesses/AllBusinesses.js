import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses, toggleLoading} from "../../redux/businessSlice";

const AllBusinesses = () => {
  const { businessList } = useSelector((state) => {
    state.business;
  });
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchBusinesses())
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
