import React from 'react'
import { useState } from 'react'
import { Navbar, Container, Nav, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { apiCall } from '../Api';
import "../assests/Header.css"
import Uploadproduct from './adminpannel/Uploadproduct';


const Header = () => {
  const [cartitem, setcartitem] = useState([])
  const [log, setLog] = useState(false);
  const [admlog, setadmlog] = useState(false);

  const [val, setVal] = useState({
    type: 'user',
    email: '',
    password: ''
  });
  const [valReg, setValreg] = useState({
    type: 'user',
    email: '',
    password: ''
  });
  const [smShow, setSmShow] = useState(false);
  const [smSho, setSmSho] = useState(false);
  const [mdshow, setmdShow] = useState(false);

  const cartView = async () => {
    setmdShow(true)


    var tok = await localStorage.getItem("jwt")
    const res = await fetch('https://axact-backend.herokuapp.com/admin/itemofcart',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: tok
        })

      })
    const data = await res.json();
    if (res.status === 401 || !data) {
      alert("kindly login first")
      // setSmSho(false);

    }
    else {
      console.log(data, "sdjkdsfksljksdlfjsd")
      setcartitem(data.cart_item);
    }


  }

  const toggleModal = () => {
    setSmSho(true);
    setSmShow(false);
  }

  const formdatahandle = (e) => {
    setVal({
      ...val,
      [e.target.name]: e.target.value
    })
  }

  const formdatahandle2 = (e) => {
    setValreg({
      ...valReg,
      [e.target.name]: e.target.value
    })
  }

  const submitone = async (e) => {
    e.preventDefault();
    console.log(val, "arya mahadev");
    //  const res = apiCall('POST',"https://axact-backend.herokuapp.com/admin/login",val);
    const res = await fetch('https://axact-backend.herokuapp.com/admin/login',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(val)

      })
    const data = await res.json();
    if (res.status === 400 || !data.message) {
      alert("Invalid Credentials")
      setSmShow(false);
      setVal({});

    }

    if (data.message) {
      setSmShow(false)
      localStorage.setItem("jwt", data.message)
      console.log(localStorage.getItem("jwt"))
      if (data.type === "user")
        setLog(true);
      else if (data.type === "admin")
        setadmlog(true);
      console.log(data, "got this")

    }
    setVal({})

  }
  const submitwo = (e) => {
    e.preventDefault();
    console.log(valReg, "arya2 mahadev");
    const res = apiCall('POST', "https://axact-backend.herokuapp.com/admin/registration", valReg);

    setValreg({})
    console.log(res)

  }



  const logmeout = (e) => {
    if (admlog === true)
      setadmlog(false);
    else
      setLog(false);
    localStorage.setItem("jwt", "");
    setValreg({})
    setVal({})
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
            Signing Up
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="post" className="signup_form" onSubmit={submitwo}>

            <label>
              Name:
              <input type="text" value={valReg.name} onChange={formdatahandle2} name="name" required />
            </label>
            <label>
              Email:
              <input type="email" value={valReg.email} onChange={formdatahandle2} name="email" required />
            </label>
            <label>
              Password:
              <input type="password" value={valReg.password} onChange={formdatahandle2} name="password" required />
            </label>
            <br />
            <center> <button type="submit" >Sign up</button></center>

          </form>
          {/* <span style={{cursor:'pointer'}} onClick={toggleModal}><u>Don't have an account? Sign up</u></span> */}

        </Modal.Body>
      </Modal>





      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Log in
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="post" onSubmit={submitone}>
            <label>
              Type:
              <input type="radio" value="admin" name="type" onChange={formdatahandle} required /> Admin
              <input type="radio" value="user" name="type" onChange={formdatahandle} required /> User

              </label>
            <br />
            <label>
              Email:
              <input type="email" value={val.email} name="email" onChange={formdatahandle} required />
            </label>
            <label>
              Password:
              <input type="password" value={val.password} name="password" onChange={formdatahandle} required />
            </label>
            <br />
            <center> <button style={{ borderRadius: '14px', margin: '2%' }} type="submit" >Login</button>
            </center>
          </form>
          <span style={{ cursor: 'pointer' }} onClick={toggleModal}><u>Don't have an account? Sign up</u></span>

        </Modal.Body>
      </Modal>



      <Modal
        size="sm"
        show={mdshow}
        onHide={() => setmdShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Items Added to Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            cartitem.map((ele, index) => {
              return (
                <div className="cart_grid_container" key={index}>
                  <div>
                    <img className="cart_img_added" alt="sry" src={ele.p_img} />
                  </div>
                  <div className="cart_details">
                    <h3>{ele.p_name}</h3>
                    {ele.p_sale === "yes" ? <h5><span style={{ textDecoration: 'line-through' }}>${ele.p_price}</span> <span style={{ color: 'red' }}>${ele.p_disc}</span></h5> : <h5> <span>$</span> {ele.p_price}</h5>}

                  </div>
                </div>
              )
            })
          }
        </Modal.Body>
      </Modal>








      <Navbar bg="light" expand="lg">
        <Container>
          <span ClassName="brand_head"><Link to="/" >Shopping Cart</Link></span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/">Home</Link>

              <Link to="/men">Men</Link>

              <Link to="/women">Women</Link>

              <Link to="/kid">Kids</Link>

              {(log === false && admlog === false) ? <span style={{ color: 'red', fontWeight: '700', cursor: 'pointer' }} onClick={() => setSmShow(true)}>Login</span> : <span onClick={logmeout} style={{ color: 'red', fontWeight: '700', cursor: 'pointer' }} >Logout</span>
              }

              {log === true && admlog === false ? <span onClick={cartView} style={{ color: 'red', fontWeight: '700', cursor: 'pointer' }}>ViewCart</span> : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {admlog === true ? <center><h1>Welcom Admin </h1> </center> : null}
        {log === true ? <center><h1>Welcom User</h1> </center> : null}

        {
          admlog === true ?
            <center><Uploadproduct /> </center> : null}
      </div>

    </>
  )
}

export default Header
