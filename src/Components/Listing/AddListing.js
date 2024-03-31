import React, { useState, useEffect } from "react";
import { addDoc, updateDoc } from "firebase/firestore";
import { collection, deleteDoc, getDocs,doc } from "firebase/firestore";
import './AddListing.css'
function AddListing(props) {
    const [input,setInput]=useState('')
    let obj= {
        name:"",
        bname:"",
        bcategory:"",
        bowner:"",
        baddress:"",
        bm_number:"",
        balternate_m_number:"",
    }
    let [info,setInfo]=useState(
        {
            name:"",
            bname:"",
            bcategory:"",
            bowner:"",
            baddress:"",
            bm_number:"",
            balternate_m_number:"",
        })
    const [list, setList] = useState(null);
    const [popup, setPopup] = useState(false);
    const [popup_text, setPopup_text] = useState('');
    const [callupdate, setCallupdate] = useState(false);
    const [updateid, setUpdateid] = useState('');
    useEffect(() => {
        get();
    }, [info]);

    const get = async () => {
        console.log("called");
        const subcateref = collection(props.send_ref, props.cate);
        const snapshot = await getDocs(subcateref);
        console.log("snapshot=>",snapshot);
        const data = snapshot.docs.map((item) => {
            return (
                {
                    id: item.id,
                    ...item.data(),
                }
            )
        })
        setList(data);
        console.log("data=>",data);
        // console.log("link=>", props.send_ref)
    };

    const go_addcategory = () => {
        setPopup(true);
        setPopup_text('ADD LIST');
    };

    const go_input = (e) => {
        const {name,value}=e.target;
        setInfo(prevState=>({
            ...prevState,
            [name]:value
        }))
    };

    const go_cancel = () => {
        setPopup(false);
    };

    const valid = () => {
        if (info.name !== "") {
            go_submit();
        } else {
            window.alert("Category cant't be empty!!!");
        }
    };

    const go_submit = async () => {
        const subcateref = collection(props.send_ref, props.cate);
        await addDoc(subcateref, {info});
        setPopup(false);
        setInfo(obj);
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
        setInfo(list[idx].info);
        setUpdateid(id);
        setCallupdate(true);
    }

    const update_cate = async () => {
        const subcateref = collection(props.send_ref, props.cate);
        const updt_ref = doc(subcateref, `${updateid}`);
        if ((info.name !== '')&&(info.bname !== '')&&(info.bcategory !== '')&&(info.bowner !== '')&&(info.baddress !== '')&&(info.bm_number !== '')&&(info.balternate_m_number !== '')) {
            setPopup(false);
            try {
                await updateDoc(updt_ref, { info: info })
                get();
            }
            catch (err) {
                console.log(err);
            }
            setInfo(obj);
            setUpdateid('');
        }
        else {
            window.alert("Must Fill All The Fields");
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
                    <div>
                        <div><label className="form-label">Your Name *</label></div>
                        <input
                            type="text"
                            placeholder="Name..."
                            value={info.name}
                            onChange={go_input}
                            className="popup-2-input"
                            name="name"
                            required
                        />
                    </div>
                    <div>
                        <div><label className="form-label">Bussiness Name *</label></div>
                        <input
                            type="text"
                            placeholder="Bussiness Name..."
                            value={info.bname}
                            onChange={go_input}
                            className="popup-2-input"
                            name="bname"
                            required
                        />
                    </div>
                    <div>
                        <div><label className="form-label">Bussiness Category *</label></div>
                        <input
                            type="text"
                            placeholder="Bussiness Category..."
                            value={info.bcategory}
                            onChange={go_input}
                            className="popup-2-input"
                            name="bcategory"
                            required
                        />
                    </div>
                    <div>
                        <div><label className="form-label">Bussiness Owner Name *</label></div>
                        <input
                            type="text"
                            placeholder="Bussiness Owner Name..."
                            value={info.bowner}
                            onChange={go_input}
                            className="popup-2-input"
                            name="bowner"
                            required
                        />
                    </div>
                    <div>
                        <div><label className="form-label">Bussiness Address *</label></div>
                        <textarea

                            type="text"
                            placeholder="Bussiness Address..."
                            value={info.baddress}
                            onChange={go_input}
                            className="popup-2-input"
                            name="baddress"
                        />
                    </div>
                    <div>
                        <div><label className="form-label">Mobile Number *</label></div>
                        <input

                            type="number"
                            placeholder="Mobile Number.."
                            value={info.bm_number}
                            onChange={go_input}
                            className="popup-2-input"
                            name="bm_number"
                        />
                    </div>
                    <div>
                        <div><label className="form-label">Alternate Mobile Number *</label></div>
                        <input

                            type="number"
                            placeholder="Alternate Mobile Number.."
                            value={info.balternate_m_number}
                            onChange={go_input}
                            className="popup-2-input"
                            name="balternate_m_number"
                        />
                    </div>
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
                                console.log("list=>", list);
                                return (
                                    <tr className="table-row">
                                        <td className="table-col col-1">{index + 1}</td>
                                        <td className="table-col col-2">{item.info.name}</td>
                                        <td className="table-col col-3">
                                            <div className="action-icons" onClick={() => { go_delete(item.id) }}><i class="fa-solid fa-trash"></i></div>
                                            <div className="action-icons" onClick={() => { go_update(item.id, index) }}><i class="fa-regular fa-pen-to-square"></i></div>
                                            <div>
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

export default AddListing;
