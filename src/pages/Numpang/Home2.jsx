import React, { Component } from 'react';
import './Home2.css'
import Moon from './../../Assets/moon.jpg'
import {Link,NavLink} from 'react-router-dom'

class Home2 extends Component {
    state = {  }

    componentDidMount(){
        window.addEventListener('scroll', function(){
            let header = document.querySelector('header');
            header.classList.toggle('sticky',window.scrollY > 0)
        })
    }

    componentWillUnmount(){
        // let header = document.querySelector('header');
        // header.removeEventListener('scroll',window.scrollY > 0)
    }

     
    render() { 
        return ( 
            <>
           <header >
                <a href="#" className="logo">GW</a>
                <ul>
                    <Link to='/'>
                        <li><a href="#">Home</a></li>
                    </Link>
                    <Link to='/Home3'>
                    <li><a href="#">About</a></li>
                    </Link>
                    <Link to='/loading'>
                        <li><a href="#">Services</a></li>
                    </Link>
                    <Link to='/home4'>
                        <li><a href="#">Home 4</a></li>
                    </Link>
                    <li><a href="#">Team</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
           </header>
           <section className="banner">

           </section>
           
           
           </>
        )
    }
}
 
export default Home2;