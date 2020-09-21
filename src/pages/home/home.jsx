import React, {Component} from 'react';
import Homescreen from '../../assets/homeScreen.webp'
import TravelBook from '../../assets/travelbook.svg'
import Traveller from '../../assets/traveling1.jpg'
import Homescreen2 from '../../assets/bg-1.jpg'
import Homescreen3 from '../../assets/bg-2.jpg'
import Homescreen4 from '../../assets/bg-3.jpg'
import Homescreen5 from '../../assets/bg-4.jpg'
import Header from '../../components/Header'
import ButtonUi from '../../components/button'
import './home.css'
import {Link} from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaSuitcaseRolling } from "react-icons/fa";
import {GoLocation} from 'react-icons/go'
import {BsCamera} from 'react-icons/bs'

class Home extends Component {
    state = {}
    render() {
        return (
            
        <div className="box-atas">
            <div>
                <Header/>
                <div
                    style={{
                    width: "100%",
                    height: '90vh'
                }}>
                    {/* <img src={Homescreen} width='100%' height='100%'></img> */}
                    <Carousel autoPlay showStatus={false} showIndicators={false} showThumbs={false} infiniteLoop={true}>
                <div className="background">
                    <img src={Homescreen2} width="100%" height="500px"/>
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div className="background">
                    <img src={Homescreen3} width="100%" height="500px"/>
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div className="background" >
                    <img src={Homescreen4} width="100%" height="500px"/>
                    {/* <p className="legend">Legend 3</p> */}
                </div>
                </Carousel>
                </div>
                <div
                    style={{
                    height: '8vh',
                    backgroundColor: '#ff8f54',
                    justifyContent: 'space-between',
                    marginTop:'-80px'}}
                    className=' text-white d-flex  align-items-center px-5 promo'>

                    <div>
                        Promo
                    </div>
                    <div>
                        <Link to='/products'>
                            <ButtonUi>
                                Lihat Promo
                            </ButtonUi>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="box-bawah">
                <div className="box-bawah-1">
                <Carousel className="carousel-1" autoPlay showStatus={false} showIndicators={false} showThumbs={false} infiniteLoop={true}>
                    <img src={Homescreen3} className="box-2-gambar-2"/>
                    <img src={Homescreen4} className="box-2-gambar-2"/>
                    <img src={Homescreen2} className="box-2-gambar-2"/>
                </Carousel>
                    <p>Lorem ipsum dolor sit, 
                        amet consectetur adipisicing elit. 
                        Temporibus officiis libero cum harum nemo 
                        reiciendis autem. Perspiciatis blanditiis 
                        commodi repudiandae nostrum? Inventore explicabo obcaecati corporis voluptates blanditiis accusamus asperiores aperiam!</p>
                    
                </div>  
                <div className="box-bawah-2">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus officiis libero cum harum nemo reiciendis autem. Perspiciatis blanditiis commodi repudiandae nostrum? Inventore explicabo obcaecati corporis voluptates blanditiis accusamus asperiores aperiam!</p>
                <Carousel className="carousel-2" autoPlay showStatus={false} showIndicators={false} showThumbs={false} infiniteLoop={true}>
                    <img src={Homescreen3} className="box-2-gambar-2"/>
                    <img src={Homescreen4} className="box-2-gambar-2"/>
                    <img src={Homescreen2} className="box-2-gambar-2"/>
                </Carousel>
               
                    
                    
                </div>         
                <div className="box-bawah-3">
                <Carousel className="carousel-1"autoPlay showStatus={false} showIndicators={false} showThumbs={false} infiniteLoop={true}>
                    <img src={Homescreen3} className="box-2-gambar-2"/>
                    <img src={Homescreen4} className="box-2-gambar-2"/>
                    <img src={Homescreen2} className="box-2-gambar-2"/>
                </Carousel>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus officiis libero cum harum nemo reiciendis autem. Perspiciatis blanditiis commodi repudiandae nostrum? Inventore explicabo obcaecati corporis voluptates blanditiis accusamus asperiores aperiam!</p>
                    
                </div> 
            </div>

               
                        
                <div className='d-flex justify-content-center align-items-center mt-5' style={{backgroundColor:'lightgray', height:'100px'}}>
                    Mau Gabung
                </div>

               
            </div>
        );
    }
}

export default Home;