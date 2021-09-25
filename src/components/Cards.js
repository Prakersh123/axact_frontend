import React from 'react'
import "../assests/cards.css"
import { Modal } from "react-bootstrap"
import { useState } from 'react'




const Cards = ({ val }) => {
    console.log(val, "prakersh");
    const [smSho, setSmSho] = useState(false);
    const call_add_to_cart = async () => {
        var tok = await localStorage.getItem("jwt")
        const res = await fetch('https://axact-backend.herokuapp.com/admin/addtocart',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: val._id,
                    token: tok
                })

            })
        if (res.status === 401) {
            alert("kindly login first")
            setSmSho(false);
        }
        console.log(res.json(), "arya12");
    }

    return (
        <>

            <Modal
                size="md"
                show={smSho}
                onHide={() => setSmSho(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        {val.p_name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr' }}>
                        <img alt="can't load" style={{ maxWidth: '100%', margin: 'auto' }} src={val.p_img} />

                        <div style={{ textAlign: 'center' }}>
                            <h5>{val.p_category}</h5>

                            <h3>{val.p_name}</h3>
                            <p>{val.p_dis}</p>
                        </div>
                    </div>
                    <button onClick={call_add_to_cart}>Add to Cart</button>

                </Modal.Body>
            </Modal>



            <div className="card_container">
                <img alt="can't load" onClick={() => setSmSho(true)} src={val.p_img} />

                <div style={{ textAlign: 'center' }}>
                    <h5>{val.p_category}</h5>

                    <h3>{val.p_name}</h3>
                    {/* <h5>${val.p_price}{val.p_sale==="yes"?} </h5> */}
                    {val.p_sale === "yes" ? <h5><span style={{ textDecoration: 'line-through' }}>${val.p_price}</span> <span style={{ color: 'red' }}>${val.p_disc}</span></h5> : <h5>{val.p_price}</h5>}
                </div>
            </div>
        </>
    )
}

export default Cards
