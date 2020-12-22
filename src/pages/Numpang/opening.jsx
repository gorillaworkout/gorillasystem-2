import React, { Component } from 'react';
import './opening.css'
import {Link,NavLink} from 'react-router-dom'

class Home extends Component {
    state = {  }

    onClickbtn=()=>{
        console.log('click berhasil')
    }

    render() { 
        return (  
            
    <div className="test">
        <Link to='/Home2'>
            <div id="circle-container" onClick={this.onClickbtn}>
                <div id="cc">
                    <div class="circle" id="five"></div>
                    <div class="circle" id="four"></div>
                    <div class="circle" id="three"></div>                
                    <div class="circle" id="two"></div>
                    <div class="circle" id="one"></div>
                </div>  
            </div>
        </Link>

    </div>);
    }
}
 
export default Home;