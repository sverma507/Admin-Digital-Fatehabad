import Navbar from "./Components/Navbar/Navbar";
import React, { useState } from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Menu from "./Components/Menu/Menu";
import AddCategory from "./Components/AddCategory/AddCategory"
import Addsubcategory from './Components/SubCategory/Addsubcategory'
function App() {
  const [id,setId]=useState(null);
  const data_from_child=(id)=>{
    setId(id);
  }
  return (
    <Router>
       <Navbar/>
      {/* <Home/> */}
      <Routes>
        <Route
          exact
          path="/"
          element={<Home/>}
        ></Route>
        <Route
          exact
          path="/Menu"
          element={<Menu/>}
        ></Route>
        <Route
          exact
          path="/AddCategory"
          element={<AddCategory data_from_parent={data_from_child}/>}
        ></Route>
        <Route
          exact
          path="/Addsubcategory"
          element={id&&<Addsubcategory id={id}/>}
        ></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
