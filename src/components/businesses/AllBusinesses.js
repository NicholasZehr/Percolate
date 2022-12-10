import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllBusinessList, removeBusinessAsync} from "../../redux/businessSlice";

const AllBusinesses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {businessList} = useSelector((state) => {
    return state.business;
  });
  const {loading: authLoading} = useSelector((state)=>{return state.auth})
  useEffect(() => {
  !authLoading &&  dispatch(fetchAllBusinessList())
  }, [authLoading]);
  return (
    <>
      {businessList.length ? (
        <div>
          {businessList.map((business, idx) => {
           return( <div key={`business-${idx}`}>
             {business.name} {business.id}
             <button onClick={() => { dispatch(removeBusinessAsync(business.id)) }}>Delete Business</button>
             <button onClick={()=> {navigate(`${business.id}`)}}> View Shop </button>
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
