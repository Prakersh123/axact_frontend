import React from 'react'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import "../../assests/upload_pro.css"
import { apiCall } from "../../Api.js";

const axios = require("axios")

const CLOUDINARY_UPLOAD_URI =
  "https://api.cloudinary.com/v1_1/dy6nqdi1h/image/upload";
const UPLOAD_PRESET = "vdk2ndjr"
function Example() {
  const [lgShow, setLgShow] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [formData, setformData] = useState({
    p_name: "",
    p_category: "mens",
    // p_name:'',
    p_price: '0.0',
    p_dis: "",
    p_sale: 'no',
    p_disc: '0',
    p_img: '',



  })

  const formHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }








  const imgUpload = (e) => {
    setImageFile(e.target.files[0]);
  }


  const submitHandler = async (e) => {






    e.preventDefault();

    console.log(formData, "arya");

    /* Prepare the productImage */
    if (imageFile && /\.(|jpe?g|png)$/i.test(imageFile.name)) {
      var formDat = new FormData();
      formDat.append("file", imageFile);
      formDat.append("upload_preset", UPLOAD_PRESET);

      /* Now push the image to cloudinary */
      axios
        .post(CLOUDINARY_UPLOAD_URI, formDat)
        .then((res) => {
          console.log(res);

          const va = res.data.url;


          var formd = formData;
          formd.p_img = va;
          console.log("hey", formd)

          apiCall('POST', "https://axact-backend.herokuapp.com/admin/arya", formd)
          setLgShow(false);





        })
        .catch((err) => {
          console.log(err);
        });
    }




  }


  return (
    <>
      {/* <Button onClick={() => setSmShow(true)}>Small modal</Button>{' '} */}
      <Button onClick={() => setLgShow(true)}>Add a new Product</Button>{' '}


      <Modal
        size="md"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Upload a Product
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form className="upload_form" onSubmit={submitHandler}>

            <label>
              <span>Category:</span>
              <span>
                <input required type="radio" value="mens" name="p_category" onChange={formHandler} /> Mens

            <input required type="radio" value="womens" name="p_category" onChange={formHandler} /> Womens

            <input required type="radio" value="kids" name="p_category" onChange={formHandler} /> Kids
            </span>
            </label>
            <label>
              Product Name:
                    <input required type="text" placeholder="enter product name" onChange={formHandler}
                value={formData.p_name}
                name="p_name"
              />
            </label>
            <label>
              Product Price:
                    <input required type="number" placeholder="enter product name" value={formData.p_price} onChange={formHandler}

                name="p_price"
              />
            </label>
            <label>
              Product Description:
                    <textarea placeholder="Describe your product" onChange={formHandler}
                value={formData.p_dis}
                name="p_dis"
              />


            </label>
            <label>
              Upload Image:
                    <input required type="file" name="p_img" onChange={imgUpload} accept=".jpg,.jpeg,.svg,.png" />
            </label>

            <label>
              <span>OnSale :</span>
              <span>
                <input type="radio" value="yes" name="p_sale" onChange={formHandler} /> Yes
                    <input type="radio" value="no" name="p_sale" onChange={formHandler} /> No
                    </span>

            </label>

            {
              // console.log(formData.p_sale)
              formData.p_sale === "yes" ? <label>Discount Price:<input type="number" onChange={formHandler}
                value={formData.p_disc} name="p_disc" /></label> : null

            }
            <button type="submit">Upload </button>

          </form>



        </Modal.Body>
      </Modal>
    </>
  );
}


const Uploadproduct = () => {
  return (
    <div>
      <Example />
    </div>
  )
}

export default Uploadproduct
