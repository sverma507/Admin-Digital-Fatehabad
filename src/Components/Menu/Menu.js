import React, { useState, useEffect } from "react";
import { addDoc, updateDoc } from "firebase/firestore";
import { collection, deleteDoc, getDocs,doc } from "firebase/firestore";
// import { app } from "../../Firebase";
// import './AddListing.css'
function Menu(props) {
    const [list, setList] = useState(null);
    const [popup, setPopup] = useState(false);
    const [popup_text, setPopup_text] = useState('');
    const [callupdate, setCallupdate] = useState(false);
    const [updateid, setUpdateid] = useState('');
    const [input, setInput] = useState('');
    useEffect(() => {
        get();
    }, [input]);

    const get = async () => {

        const subcateref = collection(props.send_ref, props.cate);
        const snapshot = await getDocs(subcateref);
        const data = snapshot.docs.map((item) => {
            return (
                {
                    id: item.id,
                    ...item.data(),
                }
            )
        })
        setList(data);
        console.log("link=>", props.send_ref)
    };

    const go_addcategory = () => {
        setPopup(true);
        setPopup_text('ADD LIST');
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
        const subcateref = collection(props.send_ref, props.cate);
        await addDoc(subcateref, { list: input });
        setPopup(false);
        setInput("");
        setPopup_text("");
    };

    const go_delete = async (id) => {

        const subcateref = collection(props.send_ref, props.cate);
        const dlt_ref = doc(subcateref, `${id}`);
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
        setPopup_text("UPDATE LIST")
        setInput(list[idx].list);
        setUpdateid(id);
        setCallupdate(true);
    }

    const update_cate = async () => {
        const subcateref = collection(props.send_ref, props.cate);
        const updt_ref = doc(subcateref, `${updateid}`);
        if (input !== '') {
            setPopup(false);
            try {
                await updateDoc(updt_ref, { list: input })
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
    return (

        <div className="addmenu-outer">
            <div className="category-heading">Listing</div>
            <div className={popup ? "popup-f-show" : "popup-f-hidden"}>
                <div className="p-1">
                    <div className=" addcate-heading">{popup_text}</div>
                    <div className="cross-btn" onClick={go_cancel}>
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
                <div className="p-2">
                    <input
                        type="text"
                        placeholder="Add List"
                        value={input}
                        onChange={go_input}
                        className="popup-2-input"
                        required
                    />
                </div>
                <div className="p-3">
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
                    ADD Listing
                </div>
            </div>
            <div className="category-list-outer">
                <div className="category-list-heading category-heading">
                    ALL Listings
                </div>
                <div className="category-list">
                    <table className="table">
                        <tr>
                            <th>Sr. No.</th>
                            <th>Listings</th>
                            <th>Actions</th>
                        </tr>
                        {
                            list && list.map((item, index) => {
                                // console.log("list=>", list);
                                return (
                                    <tr className="table-row">
                                        <td className="table-col col-1">{index + 1}</td>
                                        <td className="table-col col-2">{item.list}</td>
                                        <td className="table-col col-3">
                                            <div className="action-icons" onClick={() => { go_delete(item.id) }}><i class="fa-solid fa-trash"></i></div>
                                            <div className="action-icons" onClick={() => { go_update(item.id, index) }}><i class="fa-regular fa-pen-to-square"></i></div>
                                            <div>
                                                {/* <button className="subcategory-btn" onClick={() => { go_addlisting(item.id,item.subcategory) }}>Add Listing</button>               */}
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

export default Menu;
