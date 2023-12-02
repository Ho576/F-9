// import React from 'react'
// import {RouterProvider } from 'react-router-dom'
// import {router} from './layouts/routes'


// export default function App() {
//   return (
//    <RouterProvider router={router}/>
//   )
// }



import { RouterProvider} from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Register from "./componants/web/register/Register.jsx";
import Login from "./componants/web/login/Login.jsx";
import Home from "./componants/web/home/Home.jsx";
import Categories from "./componants/web/catigoris/Catigoris.jsx";
import DashboardLayout from "./layouts/DashbordLayout.jsx";
import HomeDashboard from './componants/dashbord/home/Home.jsx';
import CategoriesDashboard from './componants/dashbord/catigoris/Catigoris.jsx'
import { createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import CategorisDetails from "./componants/web/catigoris/CategorisDetails.jsx";
import Product from "./componants/web/products/Product.jsx"


export default function App() {

  const [user,setUser]=useState(null);

  const saveCurrentUser = ()=>{
    const token = localStorage.getItem("userToken");
    const decode=jwtDecode(token);
    setUser(decode)
    console.log(decode);

  }
  useEffect (()=>{
    if(localStorage.getItem("userToken")){
      saveCurrentUser();
    }
  },[])
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout user={user} setUser={setUser} />,
      children:[
          {
            path:'register',
            element:<Register />
          },
          {
            path:'login',
            element:<Login saveCurrentUser={saveCurrentUser} />
          },
          {
            //path:'',
            index:true,
            element:<Home />
          },
          {
            path:'/products/category/:categoryId',
            element:<CategorisDetails />
          },
          {
            path:'/products/:productId',
            element:<Product/>

          },
          {
            path:'categories',
            element:<Categories />
          },
          {
            path:'*',
            element:<h2>page not found --- web</h2>
          }
      ]
    },
    {
        path:'/dashboard',
        element:<DashboardLayout />,
        children:[{
        path:'home',
        element:<HomeDashboard />
      }
      ,{
        path:'categories',
        element:<CategoriesDashboard />
      },
      {
        path:'*',
        element:<h2>page not found --- dashboard</h2>
      }
    ]
  
  
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}
