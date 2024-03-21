import React, { useState, useEffect } from "react";
// import "./AddCategory.css";
import { getFirestore, addDoc, updateDoc, setDoc } from "firebase/firestore";
import { collection, deleteDoc, getDocs, getDoc, doc } from "firebase/firestore";
// import {getDatabase,ref,onValue,set, remove,update} from 'firebase/database'
import { app } from "../../Firebase";
import { useNavigate } from "react-router-dom";
// import {nanoid} from 'nanoid'
function AddsubCategory(props) {
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [popup, setPopup] = useState(false);
  const [popup_text, setPopup_text] = useState('');
  const [callupdate, setCallupdate] = useState(false);
  const [updateid, setUpdateid] = useState('');
  const [input, setInput] = useState('');
  const [array, setArray] = useState(["try"]);
  useEffect(() => {
    get();
  }, [input]);
  const get = async () => {
    // console.log("get called");
    const db = getFirestore(app);
    const cateref = collection(db, 'categories');
    const docRef = doc(cateref, props.id);
    const subcateref = collection(docRef,props.cate);
    // const subcateref = collection(cateref, `${props.id}`, `${props.cate}`);
    // console.log("cateref=>",cateref.doc(props.id));
    // const subcateref = collection(cateref.doc(props.id).collection(props.cate));
    const snapshot = await getDocs(subcateref);
    // console.log("snapshot=>", snapshot);
    const data = snapshot.docs.map((item) => {
      // console.log("item=>", item);
      return (
        {    
              id:item.id,
          ...item.data(),
        }
      )
    })
    setList(data);
    // console.log("l=>", list);
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

  const go_submit = async () => {
    const db = getFirestore(app);
    const cateref = collection(db, 'categories');
    const docRef = doc(cateref, props.id);
    const subcateref = collection(docRef, props.cate);
    addDoc(subcateref, { subcategory: input });
    // const subcateref=collection(cateref,`${props.id}`,`${props.cate}`);
    try {
      // addDoc(collection(subcateref,`${input}`,`${input}`),{subcategory:input});
    }
    catch (err) {
      console.log("err->", err);
    }
    setPopup(false);
    setInput("");
    setPopup_text("");
  };

  const go_delete = async (id) => {
    const db = getFirestore(app);
    const cateref = collection(db, 'categories');
    const docRef = doc(cateref, props.id);
    const subcateref = collection(docRef,props.cate);
    const dlt_ref=doc(subcateref,`${id}`);
    try {
      await deleteDoc(dlt_ref); 
      get();
    }
    catch (err) {

      console.log(err);
    }

  }

  const go_update = async (id, idx) => {
    setPopup(true);
    setPopup_text("UPDATE CATEGORY")
    setInput(list[idx].subcategory);
    setUpdateid(id);
    setCallupdate(true);
  }

  const update_cate = async () => {
    const db = getFirestore(app);
    const cateref = collection(db, 'categories');
    const docRef = doc(cateref, props.id);
    const subcateref = collection(docRef,props.cate);
    const updt_ref=doc(subcateref,`${updateid}`);
    if (input !== '') {
      setPopup(false);
      try {
        await updateDoc(updt_ref, { subcategory: input })
        get();
      }
      catch (err) {
        console.log(err);
      }
      setInput("");
      setUpdateid('');
    }
    else {
      window.alert("Category can't be empty!!!");
    }
  }

  const go_addlisting=(id,cate)=>{
    const db = getFirestore(app);
    const cateref = collection(db, 'categories');
    const docRef = doc(cateref, props.id);
    const subcateref = collection(docRef,props.cate);
    const send_ref=doc(subcateref,`${id}`);
    props.data_from_parent1(id,cate,send_ref);
    navigate('/AddListing')
  }
  return (
    <div className="addmenu-outer">
      <div className="category-heading">Sub-Categories</div>
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
          <div className="submit-btn" onClick={callupdate ? update_cate : () => { valid(props.id) }}>
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
              list && list.map((item, index) => {
                // console.log("list=>", list);
                return (
                  <tr className="table-row">
                    <td className="table-col col-1">{index + 1}</td>
                    <td className="table-col col-2">{item.subcategory}</td>
                    <td className="table-col col-3">
                      <div className="action-icons" onClick={() => { go_delete(item.id) }}><i class="fa-solid fa-trash"></i></div>
                      <div className="action-icons" onClick={() => { go_update(item.id, index) }}><i class="fa-regular fa-pen-to-square"></i></div>
                      <div>
                        <button className="subcategory-btn" onClick={() => { go_addlisting(item.id,item.subcategory) }}>Add Listing</button>                                 </div>
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

export default AddsubCategory;
