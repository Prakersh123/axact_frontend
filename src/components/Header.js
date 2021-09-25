import React from 'react'
import { useState } from 'react'
import { Navbar, Container, Nav, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { apiCall } from '../Api';
import "../assests/Header.css"


const Header = () => {
  const [cartitem, setcartitem] = useState([])
  const [log, setLog] = useState(false);
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
      setLog(true);
      console.log(data, "got this")

    }


  }
  const submitwo = (e) => {
    e.preventDefault();
    console.log(valReg, "arya2 mahadev");
    const res = apiCall('POST', "https://axact-backend.herokuapp.com/admin/registration", valReg);

    console.log(res)

  }



  const logmeout = (e) => {
    setLog(false);
    localStorage.setItem("jwt", "");
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
        size="md"
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
            <button type="submit" >Login</button>

          </form>
          <span style={{ cursor: 'pointer' }} onClick={toggleModal}><u>Don't have an account? Sign up</u></span>

        </Modal.Body>
      </Modal>



      <Modal
        size="md"
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
                <div key={index}>
                  <img alt="sry" src={ele.p_img} />
                </div>
              )
            })
          }
        </Modal.Body>
      </Modal>








      <Navbar bg="light" expand="lg">
        <Container>
          {/* <Navbar.Brand to="/">Shopping Cart</Navbar.Brand> */}
          <span ClassName="heade"><Link to="/" >Shopping Cart</Link></span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="/">Home</Nav.Link> */}
              {/* <Nav.Link href="men">Mens</Nav.Link> */}
              {/* <Nav.Link href="women">Women</Nav.Link> */}
              {/* <Nav.Link href="kid">Kids</Nav.Link> */}


              {/* <Nav.Link href="men">Mens</Nav.Link> */}
              <Link to="/">Home</Link>

              <Link to="/men">Men</Link>

              <Link to="/women">Women</Link>

              <Link to="/kid">Kids</Link>

              {/* <Nav.Link href="#link" style={{ float: 'right' }}>Login</Nav.Link> */}
              {log === false ? <span onClick={() => setSmShow(true)}>Login</span> : <span onClick={logmeout} >Logout</span>
              }

              {log === true ? <span onClick={cartView}>Cart</span> : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <center><input className="search_field" type="text" placeholder="Search your items" /> </center>

      </div>

    </>
  )
}

export default Header
