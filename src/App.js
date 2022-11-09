import React from "react";
// import AllBusinesses from "./components/businesses/allBusinesses/AllBusinesses";
// import LoginPage from "./components/Login";
import AllRoutes from "./components/Routes/Routes";
import Header from "./components/homepage/Header";

function App() {
  return (
    <div className='singlepage'>
      <Header />
      <div id='singlepage'>
        <AllRoutes />
      </div>
    </div>
  );
}

export default App;
