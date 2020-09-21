import React, { Component ,createRef} from 'react';
import {connect} from 'react-redux'
import { Header, ButtonUi } from '../../components';
import './myaccount.css'
import {Link,NavLink} from 'react-router-dom'
import { API_URL } from '../../helpers/idrformat';
import Axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {toast} from 'react-toastify'

class MyAccount extends Component {
    state = { 
        dataAcc:[],
        setModal:false,
        setPassword:false,
        setEmail:false,
        userIdCust:0,
        dataPhoto:{
            photo:createRef()
        },
        dataPassword:{
            password:createRef()
        },
        dataEmail:{
            email:createRef()
        }
     }

     componentDidMount(){
         var userIdCust = window.localStorage.getItem('id')
         this.setState({userIdCust:userIdCust})
            
         Axios.get(`${API_URL}/users/${userIdCust}`)
         .then((res)=>{
            console.log(res.data)
            this.setState({dataAcc:res.data})
            
         }).catch((err)=>{
             console.log(err)
         })
     }

     onChangePic=()=>{
        this.setState({setModal:true})
        console.log(this.state.setModal)

     }
     onChangePassw=()=>{
         this.setState({setPassword:true})
     }
     onChangeEmail=()=>{
         this.setState({setEmail:true})
     }

     onSaveEmail=()=>{
         var {email}=this.state.dataEmail
         var email=email.current.value
         console.log(email)
         Axios.patch(`${API_URL}/users/${this.state.userIdCust}`,{
             email:email
         }).then((res)=>{
            Axios.get(`${API_URL}/users/${this.state.userIdCust}`)
            .then((res2)=>{
                this.setState({dataAcc:res2.data})
            }).catch((err)=>{
                console.log(err)
            })
         }).catch((err)=>{
             console.log(err)
         })
         this.setState({setEmail:false})
         
     }
     onSavePassword=()=>{
        var {password}=this.state.dataPassword
        var password=password.current.value
        console.log(password)
        var userIdCust = window.localStorage.getItem('id')
        Axios.patch(`${API_URL}/users/${userIdCust}`,{
            password:password
        }).then((res)=>{
            Axios.get(`${API_URL}/users/${userIdCust}`)
            .then((res2)=>{
                console.log(res2.data)
                console.log(res2.data.password)
                if(res2.data.password.length<=3){
                    toast.error('Password Minimal 3 Character', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                    
                }else {
                    
                    this.setState({dataAcc:res2.data})
                    this.setState({setPassword:false})
                }
            })
        }).catch((err)=>{
            console.log(err)
        })
        
        
     }
     onSave=()=>{
        var {photo}=this.state.dataPhoto
        var photo=photo.current.value
        var userIdCust = window.localStorage.getItem('id')
        console.log(userIdCust)
        Axios.patch(`${API_URL}/users/${userIdCust}`,{
            photo:photo
        }).then((res)=>{    
            Axios.get(`${API_URL}/users/${userIdCust}`)
            .then((res2)=>{
                console.log(res2)
              
                
                    this.setState({dataAcc:res2.data})

                
            }).catch((err)=>{
                console.log(err)
            })

        }).catch((err)=>{
            console.log(err)
        })
        this.setState({setModal:false})
        
     }

     toggle = () => this.setState({setModal:false});
    render() { 
        // console.log(this.props.cart.id)
        // console.log(this.state.dataAcc)

        return ( 
            <>
            {/* PHOTO */}
        
            <Modal isOpen={this.state.setModal} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}>Change Photo</ModalHeader>
            <ModalBody>
               <input type='text' ref={this.state.dataPhoto.photo} placeholder='Insert Your Photo Link' className='form-control mb-2'/>
        
            </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSave}>SAVE</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
             </Modal>
                {/* PASSWORD */}
             <Modal isOpen={this.state.setPassword} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}>Change Password</ModalHeader>
            <ModalBody>
               <input type='text' ref={this.state.dataPassword.password} placeholder='Insert New Password' className='form-control mb-2'/>
        
            </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSavePassword}>SAVE</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
             </Modal>

                {/* EMAIL */}
             <Modal isOpen={this.state.setEmail} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}>Change Email</ModalHeader>
            <ModalBody>
               <input type='text' ref={this.state.dataEmail.email} placeholder='Insert New Email' className='form-control mb-2'/>
        
            </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSaveEmail}>SAVE</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
             </Modal>

            <div>
                <Header/>
                <div className="myacc-big">
                    <div className="myacc-big-2">
                        <div className="myacc-left">
                            <div className="left-img">
                                <div className="left-ins-img">
                                    <img src="https://img.icons8.com/fluent/96/000000/guest-male.png"/>
                                    
                                </div>
                                <h5>{this.state.dataAcc.namaLengkap}</h5>
                                <p>Point : 20</p>
                            </div>
                            <div className="option">
                                YOUR SKILL:
                            </div>
                            <div className="Link">
                                <Link to='/'>
                                    <p>Home</p>
                                </Link>
                                <Link to='/products'>
                                   <p> Our Product</p>
                                </Link>
                                <Link to='/history'>
                                   <p> History </p>
                                </Link>
                                <Link to='/cart'>
                                    <p>Cart</p>
                                </Link>

                            </div>
                        </div>
                        <div className="myacc-right">
                            <div className="myacc-right-2">
                                <div className="right-1">
                                    <div className="right-1-div" style={{color:'gray', marginLeft:'50px'}}>
                                        <h1 className="ml-5">BIODATA DIRI</h1>
                                        <div className="kotak-img">
                                            {
                                                this.state.dataAcc.photo===undefined?
                                                 <img className=""src="https://hmp.me/dcrn" width="100%" height="235px"></img> 
                                                 :
                                                 <img className=""src={this.state.dataAcc.photo}width="100%" height="235px"></img>


                                            }
                                        {/* <button> Change Photo Profile</button> */}
                                        </div>
                                    </div>
                                        <div className="right-2">
                                            <div className="box-biodata">
                                                <div className="biodata-2">
                                                    <h5>Nama:</h5> 
                                                    <p>{this.state.dataAcc.namaLengkap}</p>
                                                </div>

                                                <div className="biodata-2">
                                                <h5>Username:</h5>
                                                <p>{this.state.dataAcc.username}</p>
                                                </div>

                                                <div className="biodata-2">
                                                <h5>Password:</h5>
                                                <p>{this.state.dataAcc.password}</p>
                                                <ButtonUi onClick={this.onChangePassw}> Change Password</ButtonUi>
                                                </div>

                                                <div className="biodata-2">
                                                <h5>Email</h5>
                                                <p>{this.state.dataAcc.email}</p>
                                                <ButtonUi onClick={this.onChangeEmail}> Change Email</ButtonUi>
                                                </div>

                                            </div>
                                            <div className="btn-pp">
                                            <ButtonUi onClick={this.onChangePic}>Change Profile Picture</ButtonUi>
                                            </div>

                                        </div>
                                </div>
                               
                                

                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
            </>
         );
    }
}

const Mapstatetoprops=(state)=>{
    return{
        Auth:state.Auth
    }
}
 
export default connect(Mapstatetoprops,{})(MyAccount);