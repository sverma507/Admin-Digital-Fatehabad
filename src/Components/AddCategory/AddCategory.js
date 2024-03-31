import React, { useState, useEffect } from "react";
import "./AddCategory.css";
import { getFirestore, addDoc, updateDoc } from "firebase/firestore";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { app } from "../../Firebase";
import { useNavigate } from "react-router-dom";
function AddCategory(props) {
  const navigate=useNavigate();
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
    const db=getFirestore(app);
    const docref=collection(db,'categories');
    const snapshot= await getDocs(docref);
    // console.log("snapshot=>",snapshot);
    const data=snapshot.docs.map((item)=>{
      return(
        {
          id:item.id,
          ...item.data(),
        }
      )
    })
    setList(data);
  };

  const go_addcategory = () => {
    setPopup(true);
    setPopup_text('ADD CATEGORY');
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

  const go_submit = () => {
    // console.log(input);    
    const db=getFirestore(app);
    addDoc(collection(db,'categories'),{category:input})
    setPopup(false);
    setInput("");
    setPopup_text("");
  };

  const go_delete=async (id)=>{
    const db=getFirestore(app);
    const docref=doc(db,'categories',id)
    try{
          await deleteDoc(docref);
          get();
    }
    catch(err)
    {
      console.log(err);
    }
    
  }

  const go_update=async(id,idx)=>{
    setPopup(true);
    setPopup_text("UPDATE CATEGORY")
    setInput(list[idx].category);
    setUpdateid(id);
    setCallupdate(true);
  }

  const update_cate=async()=>{
    const db=getFirestore(app);
    const docref=doc(db,'categories',updateid)
    if(input!=='')
    {
        setPopup(false);
        try{
               await updateDoc(docref,{category:input})
               get();
        }
        catch(err)
        {
          console.log(err);
        }
        setInput("");
        setUpdateid('');
    }
    else
    {
        window.alert("Category can't be empty!!!");
    }
  
    
  }

  const go_addsubcategory=(id,cate)=>{
    props.data_from_parent(id,cate);
    navigate('/Addsubcategory')
  }
  return (
    <div className="addmenu-outer">
      <div className="category-heading">Category</div>
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
            placeholder="Add Category"
            value={input}
            onChange={go_input}
            className="popup-2-input"
            required
          />
        </div>
        <div className="popup-3">
          <div className="submit-btn" onClick={callupdate?update_cate :valid}>
            Submit
          </div>
          <div className="cancel-btn" onClick={go_cancel}>
            
            Cancel
          </div>
        </div>
      </div>
      <div className="cate-btn-outer">
        <div className="btn" onClick={go_addcategory}>
          ADD CATEGORY
        </div>
      </div>
      <div className="category-list-outer">
        <div className="category-list-heading category-heading">
          ALL CATEGORIES
        </div>
        <div className="category-list">
        <table className="table">
            <tr>
                <th>Sr. No.</th>
                <th>Category</th>
                <th>Actions</th>
            </tr>
            {
                list&&list.map((item,index)=>{
                  // console.log("list=>",list);
                    return(
                           <tr className="table-row">
                            <td className="table-col col-1">{index+1}</td>
                            <td className="table-col col-2">{item.category}</td>
                            <td className="table-col col-3">
                                <div className="action-icons" onClick={()=>{go_delete(item.id)}}><i class="fa-solid fa-trash"></i></div>
                                <div className="action-icons" onClick={()=>{go_update(item.id,index)}}><i class="fa-regular fa-pen-to-square"></i></div>
                                <div>
                                    <button className="subcategory-btn" onClick={()=>{go_addsubcategory(item.id,item.category)}}>Add Sub Category</button>
                                </div>
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

export default AddCategory;
