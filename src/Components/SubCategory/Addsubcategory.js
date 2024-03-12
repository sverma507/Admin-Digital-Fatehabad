import './Addsubcategory.css'
import React, { useState, useEffect } from "react";
import { getFirestore, updateDoc } from "firebase/firestore";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { app } from "../../Firebase";
// import { initializeApp } from 'firebase/app';
// import firebase from 'firebase/app';
// import firebase from 'firebase/app';
// import 'firebase/firestore';


function Addsubcategory(props) {
  const [list,setList]=useState(null);
  const [popup, setPopup] = useState(false);
  const [popup_text,setPopup_text]=useState('');
  const [callupdate,setCallupdate]=useState(false);
  const [updateid,setUpdateid]=useState('');
  const [input, setInput] = useState('');
  useEffect(() => {
    get();
  }, [input]);

 const get = async () => {
    const db = getFirestore(app);
    const docref = collection(db,`${props.id.subcategory}`);
    const snapshot = await getDocs(docref);
    const data = snapshot.docs.map((item) => {
    return (
        {
            id: item.id,
            ...item.data(),
        }
    )
    });
    // console.log(data);
    setList(data);
  };

  const go_addcategory = () => {
    setPopup(true);
    setPopup_text('ADD SUB CATEGORY');
  };

  const go_input = (e) => {
    setInput(e.target.value);
  };

  const go_cancel = () => {
    setPopup(false);
  };

  const valid = () => {
    if (input !== "") {
      go_submit();
    } else {
      window.alert("Category cant't be empty!!!");
    }
  };

  const go_submit = async () => {
    console.log("id=>",props.id);
    const db = getFirestore(app);
    const myref=doc(db,'categories',props.id);
    const docref=doc(collection(db,`${props.id}`))
    const data=getDocs(docref)
    const shot=data.docs.map((item)=>{
      return(
        {
          ...item.data()
        }
      )
    })
    console.log("shot=>",shot);
    try{
         await updateDoc(myref, { subcategory: [input] })
         console.log("sub added");
    }
    catch(err)
    {
        console.log(err);
    }
    console.log("updated successfully");
    setPopup(false);
    setInput("");
    setPopup_text("");
  };

  const go_delete=async (id)=>{
        const db=getFirestore(app);
        const myref= doc(db,'categories',id);
        try{
                await deleteDoc(myref);
                get();
        }
        catch(err)
        {
            console.log(err);
        }
  }

  const go_update=async(index,id)=>{
    setPopup(true);
    setPopup_text("UPDATE CATEGORY")
    setInput(list[index].category);
    setUpdateid(id);
    setCallupdate(true);
  }

  const update=async()=>{
    const db=getFirestore(app);
    const myref=doc(db,'categories',updateid);
   
    
    if(input!=='')
    {
        setPopup(false);
        try{
            await updateDoc(myref,{category:`${input}`})
        }
        catch(err)
        {
            console.log(err);
        }
        setInput("");
        setUpdateid(null);
    }
    else
    {
        window.alert("Category can't be empty!!!");
    }
  
    
  }
  return (
    <div className="addmenu-outer">
      <div className="category-heading">Sub Categories</div>
      <div className={popup ? "popup-form-show" : "popup-form-hidden"}>
        <div className="popup-1">
          <div className=" addcte-heading">{popup_text}</div>
          <div className="cross-btn" onClick={go_cancel}>
            <i class="fa-solid fa-x"></i>
          </div>
        </div>
        <div className="popup-2">
          <input
            type="text"
            placeholder="Add Sub-Category"
            value={input}
            onChange={go_input}
            className="popup-2-input"
            required
          />
        </div>
        <div className="popup-3">
          <div className="submit-btn" onClick={callupdate?update :valid}>
            Submit
          </div>
          <div className="cancel-btn" onClick={go_cancel}>
            
            Cancel
          </div>
        </div>
      </div>
      <div className="cate-btn-outer">
        <div className="btn" onClick={go_addcategory}>
          ADD SUB-CATEGORY
        </div>
      </div>
      <div className="category-list-outer">
        <div className="category-list-heading category-heading">
          ALL SUB-CATEGORIES
        </div>
        <div className="category-list">
        <table className="table">
            <tr>
                <th>Sr. No.</th>
                <th>Sub-Categories</th>
                <th>Actions</th>
            </tr>
            {
                list &&list.map((item,index)=>{
                    return(
                           <tr className="table-row">
                            <td className="table-col col-1">{index+1}</td>
                            <td className="table-col col-2">{item.category}</td>
                            <td className="table-col col-3">
                                <div className="action-icons" onClick={()=>{go_delete(item.id)}}><i class="fa-solid fa-trash"></i></div>
                                <div className="action-icons" onClick={()=>{go_update(index,item.id)}}><i class="fa-regular fa-pen-to-square"></i></div>
                            </td>
                        </tr>
                    )
                })
            }
        </table>
        </div>
      </div>
    </div>
  );
}

export default Addsubcategory;
