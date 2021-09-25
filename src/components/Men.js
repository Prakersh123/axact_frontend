import React from 'react'
import { useState, useEffect } from 'react'
import { apiCall } from '../Api.js'
import Cards from "../../src/components/Cards"

import "../assests/Home.css"







const Men = () => {

    // const [selected, setselected] = useState("home")
    const [men, setMen] = useState([])

    useEffect(() => {

        const call_me = async () => {

            const result = await apiCall('GET', "https://axact-backend.herokuapp.com/admin/getall");
            setMen(result.men);
        }

        call_me();


    }, [])

    return (




        <>

            <center><h1><u>Men's Zone</u></h1></center>
            {/* <center><Link to="/women"><h1>View All</h1></Link></center> */}



            <div className="grid_container_men">
                {men.map((item, index) => (
                    <Cards key={index} val={item} />
                ))}

            </div>


            {/* <div className="mwk_container" style={{ boxSizing:'border-box', padding:'5%',display:'grid', gridTemplateColumns:'1fr 1fr 1fr'}}>
            <img src={womeni} style={{height:'500px'}}/>
            <img src={womeni} style={{height:'500px'}}/>
            <img src={womeni} style={{height:'500px'}}/>
       
        </div>
        <div className="home_grid_container"  style={{display:'flex'}}>
          aryas
          {
              men.map((ele,index)=>{return <Cards key={index} val={ele}/>})

            }     
          {
            //   selected==="home"?men.map((ele,index)=>{<Cards key={index} val={ele}/>}):null

            
            //   men.map((ele,index)=>{return <Cards key={index} val={ele}/>}),
            //   women.map((ele,index)=>{return <Cards key={index} val={ele}/>}),
              kid.map((ele,index)=>{return <Cards key={index} val={ele}/>})

          }
          {
              women.map((ele,index)=>{return <Cards key={index} val={ele}/>})

            }     
                 
        </div> */}
        </>
    )
}

export default Men
