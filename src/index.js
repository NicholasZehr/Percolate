import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import store from "./redux";
import { AllBusinesses, SingleBusiness } from "./components/businesses";
import { About, LoginPage, Home, Signup, Header, BusinessLayout,UserLayout, ReviewLayout, ReviewPane, SingleReview, ViewProfile, UserProfile, SingleCoffee } from "./components";
const container = document.getElementById("root");
const root = createRoot(container);
const AllRoutes = (
  <Route path="/" element={<Header />}>
    <Route path="about" element={<About />} />
    <Route path="business" element={<BusinessLayout/>}>
      <Route index element={<AllBusinesses />} />
      <Route path=":id" element={<SingleBusiness/>} />
    </Route>
    <Route path="reviews" element={<ReviewLayout/>}>
      <Route index element={<ReviewPane/>}/>
      <Route path=":id" element={<SingleReview/>} />
    </Route>
    <Route path="user" element={<UserLayout/>} > å
      <Route path="login" element={<LoginPage/>} />
      <Route path="signup" element={<Signup/>} />
      <Route path=":id" element={<ViewProfile />} />
      <Route path="me" element={<UserProfile />} />
    </Route>
    <Route path="coffee" element={<SingleCoffee />} />
    <Route index element ={<Home/>}/>
  </Route>
);
const router = createBrowserRouter(createRoutesFromElements(AllRoutes));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
