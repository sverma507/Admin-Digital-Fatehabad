import Navbar from "./Components/Navbar/Navbar";
import React, { useState } from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Menu from "./Components/Menu/Menu";
import AddCategory from "./Components/AddCategory/AddCategory"
import Addsubcategory from './Components/SubCategory/Addsubcategory'
import AddListing from "./Components/Listing/AddListing";
function App() {
  const [id,setId]=useState(null);
  const [cate,setCate]=useState(null);
  const [lid,setLId]=useState(null);
  const [lcate,setLcate]=useState(null);
  const [send_ref,setSend_ref]=useState(null);
  const data_from_child=(id,category)=>{
    setId(id);
    setCate(category);
  }
  // const [cate,setCate]=useState(null)
  const data_from_child1=(id,category,ref)=>{
    setLId(id);
    setLcate(category);
    setSend_ref(ref);

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
          element={id&&<Addsubcategory data_from_parent1={data_from_child1} id={id} cate={cate}/>}
        ></Route>
        <Route
          exact
          path="/AddListing"
          element={send_ref&&<AddListing id={lid} cate={lcate} send_ref={send_ref}/>}
        ></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
