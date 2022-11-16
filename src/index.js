import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import store from "./redux";
import { AllBusinesses } from "./components/businesses";
import { About, LoginPage, Home, Signup, Header } from "./components";
const container = document.getElementById("root");
const root = createRoot(container);
const AllRoutes = (
  <Route path="/" element={<Header />}>
    <Route path="businesses" element={AllBusinesses}>
      <Route path=":id" element={Business} />
    </Route>
    <Route path="reviews" element={ReviewPane}>
      <Route path="/:id" element={SingleReview} />
    </Route>
    <Route path="/about" element={About} />
    <Route path="user" element={UserPane} > 
      <Route path="/login" element={LoginPage} />
    <Route path="/signup" element={Signup} />
    </Route>
    <Route path="/users/:id" element={SingleUserPage} />
    <Route path="/coffees/:id" element={SingleCoffee} />
    <Route path="/home" element={Home} />
    <Route path="/" element={Home} />

    <Route path="about" element={<About />} />
  </Route>
);
const router = createBrowserRouter(createRoutesFromElements(AllRoutes));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
