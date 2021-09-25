import React from 'react'
import { useState, useEffect } from 'react'
import { apiCall } from '../Api.js'
import Carousel from "react-elastic-carousel";
import Cards from "../../src/components/Cards"
import womeni from "../img/women-large.jpg"
import meni from "../img/man-large.jpg"
import kids from "../img/Kids.jpg"
import { Link } from 'react-router-dom'

import "../assests/Home.css"



const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 }
];






const Home = () => {

    const [men, setMen] = useState([])
    const [women, setWomen] = useState([])
    const [kid, setKid] = useState([])

    useEffect(() => {

        const call_me = async () => {

            const result = await apiCall('GET', "http://localhost:8000/admin/getall");
            setMen(result.men);
            setWomen(result.women);
            setKid(result.kid);


        }

        call_me();


    }, [])

    return (




        <>

            <center><h1><u>Women's Zone</u></h1></center>
            <center><Link to="/women"><h1>View All</h1></Link></center>

            <div className="grid_container_home">
                <div className="grid_item1">
                    <Link to="/women"><img src={womeni} alt="sry" /></Link>
                </div>
                <div className="grid_item2">
                    {/* <Appp itemm={men} /> */}

                    <div className="carousel-wrapper">
                        <Carousel breakPoints={breakPoints}>
                            {women.map((item, index) => (
                                <Cards key={index} val={item} />
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
            <center><h1 ><u>Men's Zone</u></h1></center>
            <center><Link to="/men"><h1>View All</h1></Link></center>


            <div className="grid_container_home2">

                <div className="grid_item2">
                    {/* <Appp itemm={men} /> */}

                    <div className="carousel-wrapper">
                        <Carousel breakPoints={breakPoints}>
                            {men.map((item, index) => (
                                <Cards key={index} val={item} />
                            ))}
                        </Carousel>
                    </div>
                </div>

                <div className="grid_item1">
                    <Link to="/men"><img alt="sry" src={meni} /></Link>

                </div>
            </div>

            <center><h1><u>Kid's Zone</u></h1></center>
            <center><Link to="/kid"><h1>View All</h1></Link></center>




            <div className="grid_container_home">
                <div className="grid_item1">
                    <Link to="/kid"><img src={kids} alt="sry" style={{ maxHeight: '620px' }} /></Link>
                </div>
                <div className="grid_item2">
                    {/* <Appp itemm={men} /> */}

                    <div className="carousel-wrapper">
                        <Carousel breakPoints={breakPoints}>
                            {kid.map((item, index) => (
                                <Cards key={index} val={item} />
                            ))}
                        </Carousel>
                    </div>
                </div>
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

export default Home
