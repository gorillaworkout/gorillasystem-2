import React, { Component,createRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Header from '../../components/Header'
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios'
import { API_URL } from '../../helpers/idrformat';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ButtonUi from './../../components/button'
// import './managerUser.css'
import './manageUser.css'
const MySwal = withReactContent(Swal)

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

  

class ManageUser extends Component {
    state = { 
        classes : useStyles,
        // namaLengkap:createRef(),
        // username:createRef(),
        // password:createRef(),
        // email:createRef(),
        // role:createRef(),
        dataUsers:[],
        setModal:false,
        addUser:{},
        dataForm:{
        namaLengkap:createRef(),
        username:createRef(),
        password:createRef(),
        email:createRef(),
        role:createRef(),
        }
        // namaLengkap:'',
        // username:'',
        // password:'',
        // email:'',
        // role:''
        
     }
     namaLengkapRef = createRef()
     usernameRef=createRef()
     passowrdRef=createRef()
     emailRef=createRef()
     roleRef=createRef()


     componentDidMount(){
        Axios.get(`${API_URL}/users`)
        .then((res)=>{
            console.log(res.data)
            this.setState({dataUsers:res.data})
            console.log(this.state.dataUsers)
        }).catch((err)=>{
            console.log(err)
        })

     }

     onChangeAdmin=(index)=>{
        console.log(index)
        MySwal.fire({
            title: `Are you sure want to Change to User?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                Axios.patch(`${API_URL}/users/${index}`,{
                    role:'admin'
                })
                .then((res)=>{  
                    console.log(res.data)
                    Axios.get(`${API_URL}/users/`)
                    .then((res1)=>{
                        this.setState({dataUsers:res1.data})
                    }).catch((err)=>{
                        console.log(err)
                    })
                   
                }).catch((err)=>{
                    console.log(err)
                })
                
              MySwal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
          }else{  
             MySwal.fire(
                'Cancelled',
                'Youre Still User!:)',
                'error'
              )
            }
          })
     }

     onChangeUser=(index)=>{
        console.log(index)
        MySwal.fire({
            title: `Are you sure want to Change to User?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                Axios.patch(`${API_URL}/users/${index}`,{
                    role:'user'
                })
                .then((res)=>{  
                    console.log(res.data)
                    Axios.get(`${API_URL}/users/`)
                    .then((res1)=>{
                        this.setState({dataUsers:res1.data})
                    }).catch((err)=>{
                        console.log(err)
                    })
                   
                }).catch((err)=>{
                    console.log(err)
                })
                
              MySwal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
          }else{  
             MySwal.fire(
                'Cancelled',
                'Youre Still Admin!:)',
                'error'
              )
            }
          })
     }

     renderUsers=()=>{
         return this.state.dataUsers.map((val,index)=>{
             if(val.role === 'admin'){
                return(
                    <>
                      <TableRow key={val.id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{val.id}</TableCell>
                            <TableCell>{val.namaLengkap}</TableCell>
                            <TableCell>{val.username}</TableCell>
                            <TableCell>{val.password}</TableCell>
                            <TableCell>{val.email}</TableCell>
                            <TableCell>{val.role}</TableCell>
                            <TableCell>
                                <button className="btn btn-primary btn-action" onClick={()=>this.onChangeUser(val.id)}>Change To User</button>
                                <button className="btn btn-danger btn-action" onClick={()=>this.onDelete(val.id)}>Delete</button>    
                            </TableCell>
                        </TableRow>

                    </>
                 )
                 
             }else {
                 return (
                    <>
                     <TableRow key={val.id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{val.id}</TableCell>
                            <TableCell>{val.namaLengkap}</TableCell>
                            <TableCell>{val.username}</TableCell>
                            <TableCell>{val.password}</TableCell>
                            <TableCell>{val.email}</TableCell>
                            <TableCell>{val.role}</TableCell>
                            <TableCell>
                                <button className="btn btn-primary btn-action"onClick={()=>this.onChangeAdmin(val.id)}>Change To Admin</button>
                                <button className="btn btn-danger btn-action"onClick={()=>this.onDelete(val.id)}>Delete</button>
                            </TableCell>
                        </TableRow>
                    
                    </>

                 )
             }
         })
     }

     onDelete=(index)=>{
        console.log('delete' + index)
        MySwal.fire({
            title: `Are you sure remove ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
        
        var userIdCust = window.localStorage.getItem('id')
                console.log(userIdCust)
                console.log(index)
        Axios.delete(`${API_URL}/users/${index}`)
        .then((res)=>{
            Axios.get(`${API_URL}/users/`)
            .then((res1)=>{
                this.setState({dataUsers:res1.data})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
              MySwal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
          }else{
                
             MySwal.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
     }

     addData=()=>{
        this.setState({setModal:true})
     }
     onSave=()=>{
         var {namaLengkap,username,password,email,role}=this.state.dataForm
        var namaLengkap=namaLengkap.current.value
        var username=username.current.value
        var password=password.current.value
        var email=email.current.value
        var role=role.current.value
     
        var obj={
            namaLengkap,username,password,email,role
        }
        Axios.post(`${API_URL}/users`,obj)
        .then((res)=>{
            Axios.get(`${API_URL}/users`)
            .then((res2)=>{
                console.log(res2.data)
                this.setState({dataUsers:res2.data})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
        this.setState({setModal:false})
        console.log(namaLengkap,username,password,email,role)
     }
      toggle = () => this.setState({setModal:false});

    render() { 
        return (  
            <>
            <Modal isOpen={this.state.setModal} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}>Add User</ModalHeader>
            <ModalBody>
               <input type='text' ref={this.state.dataForm.namaLengkap} placeholder='Masukkan Nama' className='form-control mb-2'/>
               <input type='text' ref={this.state.dataForm.username} placeholder='Masukkan Username' className='form-control mb-2'/>
               <input type='password' ref={this.state.dataForm.password} placeholder='Masukkan Password'  className='form-control mb-2'/>
               <input type='text' ref={this.state.dataForm.email} placeholder='Masukkan Email'  className='form-control mb-2'/>
               {/* <input type='text' ref={this.state.dataForm.role} placeholder='Masukkan Role'  className='form-control mb-2'/> */}
               <select    ref={this.state.dataForm.role} className='form-control' defaultValue={0} >
                                <option value="0" hidden>Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            {/* {
                                this.state.pilihan==2?
                                <input className='form-control' ref={this.state.cc} placeholder='masukkan cc'/>
                                :
                                this.state.pilihan==1?
                                <input className='form-control' ref={this.state.bukti}  placeholder='input bukti pembayaran'/>
                                :
                                null
                            } */}

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.onSave}>SAVE</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>

            <div>
               <div>
                <Header/>
          <div className='px-5 mt-3'>
              {/* <ButtonUi onClick={toggle} className='my-3' >
                  Add Data
              </ButtonUi> */}
              <ButtonUi onClick={this.addData}>Add Data</ButtonUi>
              <Paper className={this.state.classes.root}>
                <TableContainer className={this.state.classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                          <TableCell>No.</TableCell>
                          <TableCell>ID</TableCell>
                          <TableCell style={{width:'200px'}}>Nama Lengkap</TableCell>
                          <TableCell style={{width:'200px'}}>Username</TableCell>
                          <TableCell typeof="password">Password</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell style={{width:'300px'}}>Role</TableCell>
                          <TableCell style={{width:'300px'}}>Action</TableCell>
                         
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {this.renderTable()} */}
                        {this.renderUsers()}
                    </TableBody>
                    </Table>
                </TableContainer>
              </Paper>
          </div>
            </div>
            </div>
           </> 
        );
    }
}
 
export default ManageUser;