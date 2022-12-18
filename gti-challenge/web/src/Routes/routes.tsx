import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from "../pages/Landing";

import CreateProducts from "../pages/Product/Create";
import EditProducts from "../pages/Product/Edit";
import ListProducts from "../pages/Product/List";

import CreateCategories from "../pages/Categories/Create";
import ListCategories from "../pages/Categories/List";
import EditCategories from "../pages/Categories/Edit";

function Routes(){
  return(

    <BrowserRouter>
      {/* Root Route */}
      <Route path="/" exact component={Landing}/>

      {/* Products Routes */}
      <Route path="/product" exact component={ListProducts}/>
      <Route path="/product/create" exact component={CreateProducts}/>
      <Route path="/product/edit/:id" exact component={EditProducts}/>
      
      {/* Categories Routes */}
      <Route path="/category" exact component={ListCategories}/>
      <Route path="/category/create" exact   component={CreateCategories}/>
      <Route path="/category/edit/:id" exact component={EditCategories}/>

    </BrowserRouter>
  );
}

export default Routes;