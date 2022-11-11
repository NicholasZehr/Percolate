import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses, toggleLoading} from "../../redux/businessSlice";

const AllBusinesses = () => {
  const {businessList} = useSelector((state) => {
    return state.business;
  });

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchBusinesses())
  }, []);
  return (
    <>
      {businessList.length ? (
        <div>
          {businessList.map((business, idx) => {
           return( <div key={`business-${idx}`}>
              {business.name} {business.id}
            </div>)
})}
        </div>
      ) : (
        <div>Loading your businesses...</div>
      )}
    </>
  );
};

export default AllBusinesses
