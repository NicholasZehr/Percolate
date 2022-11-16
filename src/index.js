import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import store from "./redux";
import { AllBusinesses, SingleBusiness } from "./components/businesses";
import { About, LoginPage, Home, Signup, HeaderLayout, BusinessLayout,UserLayout, ReviewLayout, ReviewPane, SingleReview } from "./components";
const container = document.getElementById("root");
const root = createRoot(container);
const AllRoutes = (
  <Route path="/" element={<HeaderLayout />}>
    <Route path="businesses" element={<BusinessLayout/>}>
      <Route default element={<AllBusinesses />} />
      <Route path=":id" element={<SingleBusiness/>} />
    </Route>
    <Route path="reviews" element={<ReviewLayout/>}>
      <Route default element={<ReviewPane/>}/>
      <Route path="/:id" element={<SingleReview/>} />
    </Route>
    <Route path="about" element={<About />} />
    <Route path="user" element={<UserLayout/>} > 
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path=":id/me" element={<SingleUserPage />} />
    </Route>
    <Route path="/coffees/:id" element={SingleCoffee} />
    <Route path="/home" element={Home} />
  </Route>
);
const router = createBrowserRouter(createRoutesFromElements(AllRoutes));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
