import React, { Component,createRef } from 'react';
import './Login.css'
import Foto from '../../assets/homeScreen.webp'
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {API_URL} from './../../helpers/idrformat'
import { Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {LoginFunc,LoginThunk,ClearFunc} from './../../redux/Actions'
import {toast} from 'react-toastify'    
const Styles={
    root:{
   
        '& label.Mui-focused': {
            color: 'white',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
          },
          '& .MuiOutlinedInput-root': {
    
            '& fieldset': {
              borderColor: 'white',
              color:'white'
            },
            '&:hover fieldset': {
              borderColor: 'white',
              color:'white'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
              border:'3px solid ',
              color:'white'
            },
          },
    }
}

class Login extends Component {
    
    state = {
        username:createRef(),
        password:createRef(),
        alert:'',
        cart:''
    }

    OnLoginClick=()=>{
        const {username,password}=this.state
        var username1=username.current.value
        var password1=password.current.value
        this.props.LoginThunk(username1,password1)
        console.log(username1,password1)
      
      
    }

    render() { 
        const { classes } = this.props;
        console.log(this.props.Auth)
        if(this.props.Auth.isLogin){
            return <Redirect to='/'/>
        }
        return (
            <div className='row m-0 p-0'>
                <div className='col-md-6 m-0 p-0' style={{height:'100vh'}} >
                    <img width='100%' height='100%' src={Foto} alt={'foto'}/>
                </div>
                <div className='col-md-6 m-0 p-0 d-flex justify-content-center align-items-center' style={{background:'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>
                    <div className='login-kotak d-flex px-4'>
                        <h1 className='align-self-center'>Login</h1>
                        <div className='mt-3'>
                            <TextField className={classes.root} inputRef={this.state.username} label="Username" fullWidth='true' variant="outlined" size='small' />
                        </div>
                        <div className='mt-3'>
                            <TextField className={classes.root} inputRef={this.state.password} type="password"  label="Password" fullWidth='true' variant="outlined" size='small' />
                        </div>
                        <div className='mt-3 mb-2'>
                            {
                                this.props.Auth.Error?
                                <div className='alert alert-danger'>{this.props.Auth.error} <span onClick={this.props.Clearfunc} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>x</span></div>
                                :
                                null
                            }
                        </div>
                        <div className=' align-self-end '>
                            <button  disabled={this.props.Auth.isLoading  } onClick={this.OnLoginClick} className='px-3 py-2 rounded text-white' style={{border:'white 1px solid',backgroundColor:'transparent'}}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
}
const Mapstatetoprops=(state)=>{
    return{
        Auth:state.Auth
    }
}

export default withStyles(Styles) (connect(Mapstatetoprops,{LoginFunc,LoginThunk,ClearFunc})(Login));
