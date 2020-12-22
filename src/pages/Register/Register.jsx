import React, { Component,createRef } from 'react';
import './Register.css'
import BgRegister from '../../assets/BgRegister2.jpg'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Alert } from 'reactstrap';
// import {GrInstagram,GrFacebook} from 'react-icons/gr'
import { API_URL } from '../../helpers/idrformat';
import {Redirect} from 'react-router-dom'
// import {LoginFunc} from './../../Redux/Actions'
import Axios from 'axios'
import {connect} from 'react-redux'
import {AiOutlineHome} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import { isEmail } from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {toast} from 'react-toastify'    


const Styles={
    root:{
   
        '& label.Mui-focused': {
            color: '#fd79a8',
            // color:'white,'
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
          },
          '& .MuiOutlinedInput-root': {
    
            '& fieldset': {
              borderColor: 'white',
            //   color:'#fd79a8'
                color:'white'
            },
            '&:hover fieldset': {
              borderColor: 'white',
              color:'#fd79a8'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
              border:'3px solid ',
              color:'#fd79a8'
            },
          },
    }
}

const required = value => {
    if (!value) {
      return (
        <div className="position error-inf" role="alert" >
          This field is required!
          {/* <p>This field is required!</p> */}
        </div>
      );
    }
  };
  
  const email = value => {
    if (!isEmail(value)) {
      return (
        <div className="position error-inf" role="alert" >
          This is not a valid email.
          {/* <p> This is not a valid email.</p> */}
          {/* <button onClick={this.cancelbtn}>x</button> */}
        </div>
      );
      
    }
  };

  const vnamaLengkap = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="position error-inf" role="alert" >
            Your Name must be between 3 and 20 characters.
          {/* <p>The username must be between 3 and 20 characters.</p> */}
        </div>
      );
    }
  };

  
  const vusername = value => {
    
    if (value.length < 6 || value.length > 20) {
      return (
        <div className="position error-inf" role="alert" >
            The username must be between 3 and 20 characters.
          {/* <p>The username must be between 3 and 20 characters.</p> */}
        </div>
      );
    }
  };
  
  const vpassword = value => {
    if (value.length < 6 || value.length > 40 ) {
      return (
        <div className="position error-inf" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };





class Register extends Component {

    state = { 

        namaLengkap:'',
        username: "",
        email: "",
        password: "",
        successful: false,
        message: "",
        isRegister:false
    
     }

     cancelbtn=()=>{
        this.setState({successful:false})
    }


    // onChangeUsername(e) {
    //   this.setState({
    //     username: e.target.value
    //   });
    onChangeUsername=(e)=>{
      this.setState({
            username: e.target.value
          });
    }

   
    // }
    // onChangeNamaLengkap(e){
    //     this.setState({namaLengkap:e.target.value})
    // }

    onChangeNamaLengkap=(e)=>{
      this.setState({namaLengkap:e.target.value})
    }
    // onChangeUsername(e){
    //     this.setState({username:e.target.value})
    // }
    
    onChangeUsername=(e)=>{
      this.setState({username:e.target.value})
    }
  
    // onChangeEmail(e) {
    //   this.setState({
    //     email: e.target.value
    //   });
    
    // }
    onChangeEmail=(e)=>{
      this.setState({
            email: e.target.value
          });
    }
  
    // onChangePassword(e) {
    //   this.setState({
    //     password: e.target.value
    //   });
  
  
    // }
    onChangePassword=(e)=>{
      this.setState({
        password: e.target.value
      });
    }

    handleRegister=(e)=> {
        e.preventDefault();
    
        this.setState({
          message: "",
          successful: false
        });
    
        this.form.validateAll();

      }

      Register=(e,namaLengkap,username,password,email)=>{
       
        this.setState(
              {
                  [namaLengkap]:e.target.value,
                  [username]:e.target.value,
                  [password]:e.target.value,
                  [email]:e.target.value
              }
          )
          var obj ={
            namaLengkap:this.state.namaLengkap,
            username:this.state.username,
            password:this.state.password,
            email:this.state.email,
            role:'user'
        }
        // const{password,username}= this.state
        if(this.state.password==='' || this.state.username ==='' ){
            toast.error('Username/Password Harus Di isi', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
        }else {
            // if(this.state.password.match(/^[0-9][A-Za-z0-9 -]*$/) && this.state.password.match(/[a-z]/i) )
            if(this.state.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/))
            // if(this.state.password.match(/^[0-9][A-Za-z0-9 -]*$/))
            // this.state.password.match(/[a-z]/i) 
            {
              console.log('masuk ke else')
              Axios.get(`${API_URL}/users?username=${this.state.username}`)
              .then((res1)=>{
                  if(res1.data.length){
                
                    console.log(res1.data.length)
                      console.log('Username/Password Sudah Terdaftar')
                      toast.error('Username/Password Sudah Terdaftar', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                  } else {
                      Axios.post(`${API_URL}/users`,obj)
                      .then((res)=>{
                          console.log('Data berhasil di tambahkan')
                          toast.error('Register Anda Berhasil', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            progress: undefined,
                        });
                          this.setState(
                            {
                              namaLengkap:'',
                              username:'',
                              password:'',
                              email:'',
                              isRegister:true
                            })
                               
                      }).catch((err)=>{
                          console.log(err)
                      })
                  }
              }).catch((err)=>{
                  console.log(err)
              })

            }else {
              toast.error('Password anda Harus Anda Huruf Besar, Huruf Kecil, angka Dan Special Character', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
            }

        }

        console.log(obj)
          console.log(this.state.namaLengkap)
          console.log(this.state.username)
          console.log(this.state.password)
          console.log(this.state.email)
      }

 
    render() { 
        const {classes} = this.props
        console.log(this.props.Auth)
        if(this.props.Auth.isLogin){
            return <Redirect to='/'/>
        }
        if(this.state.isRegister){
          return <Redirect to='/'/>
        }
        return ( 
            <div className="box-besar">
            <div>
                <img src={BgRegister} alt="error" className="box-gambar" style={{height:'740px'}}/>
            </div>
                
            <div className="box-login d-flex ">  
                        <div className='align-self-center mt-3 '>
                            {/* <Link to='/manageAdmin' style={{textDecoration:'none'}}> */}
                                <h1 >Register</h1>
                            {/* </Link> */}
                            
                        </div>
                        <div className="bth ">
                            <Link to='/'>
                            <button className="bth-btn">
                                <p><AiOutlineHome/></p>
                            </button>
                            </Link>
                            
                        </div>

            <Form onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group div-name">
                  <label htmlFor="namaLengkap">Nama Lengkap</label>
                  <Input
                    type="text"
                    className="form-control input-form"
                    name="username"
                    value={this.state.namaLengkap}
                    onChange={this.onChangeNamaLengkap}
                    validations={[required, vnamaLengkap]}
                  />
                </div> 
                  
                <div className="form-group div-name">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control input-form"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group div-name">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control input-form"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group div-name">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control input-form"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block" onClick={this.Register}>Sign Up</button>
                </div>
                
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>

                    
                           
                        
                    {/* </div> */}
       
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
 
// export default Register;
export default withStyles(Styles) (connect(Mapstatetoprops)(Register))