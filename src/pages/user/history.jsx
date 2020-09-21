import React, { Component, useEffect } from 'react';
import Header from '../../components/Header'
import ButtonUi from './../../components/button'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios'
import { API_URL,priceFormatter } from '../../helpers/idrformat';
import {connect} from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Redirect} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './history.css'

const MySwal = withReactContent(Swal)

const useStyles = makeStyles({
    root: {
      width: '200%',
    },
    container: {
      maxHeight: 840,
    },
  });



class History extends Component {
    state = { 
        classes:useStyles,
        dataUser:[],
        userId:null,
        isLoading:true,
        isDetail:false,
        cartDetail:[],
        JSON:[]
     }

     dateformat=(n)=>{
        var today = new Date(n);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
    
        today = mm + '-' + dd + '-' + yyyy;
        return today
      }

     componentDidMount=()=>{
        const id = window.localStorage.getItem('id')
         if(id){
            // this.setState({isHistory:true})
            Axios.get(`${API_URL}/transactions?userId=${id}`)
            .then((res)=>{
               console.log(res.data)

               this.setState({
                 dataUser:res.data, 
                userId:id,
                isLoading:false
                })
            }).catch((err)=>{
                console.log(err)
            })
         }else {
           this.setState({isLoading:false})
         }

         var dataJson = JSON.parse(localStorage.getItem('transaction'))
         this.setState({JSON:dataJson})
         

      //    Axios.get(`${API_URL}/carts`,{
      //     params:{
      //         userId:id,
      //         _expand:'product'
      //     }
      // })
      // .then((res)=>{
      //     console.log(res.data)
      //     this.setState({cartDetail:res.data})
      //     // this.setState({qty:res.data[0].qty})
      //     // console.log(res.data[0].qty)
      // }).catch((err)=>{
      //     console.log(err)
      // })

        Axios.get(`${API_URL}/detailTransactions`)
        .then((res)=>{
          console.log(res.data)
            this.setState({cartDetail:res.data})
        }).catch((err)=>{
          console.log(err)
        })



         
         
        //  console.log(test)
        //  console.log(this.props.Auth.cart)
        //  console.log(this.props.Auth.cart2)
     }

     onDeleteItem=(index)=>{

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
              Axios.delete(`${API_URL}/transactions/${index}`)
          .then((res)=>{
            console.log(res.data)
            const id = window.localStorage.getItem('id')
            Axios.get(`${API_URL}/transactions?userId=${id}`)
            .then((res1)=>{
              console.log(res1.data)
              this.setState({dataUser:res1.data})
            //   setProduct(res1.data)
            }).catch((err)=>{
              console.log(err)
            })
          }).catch((err)=>{
            console.log(err)
          })
        //   console.log(product)
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
     onDetailItem=(index)=>{
       console.log('detail' + index)
       this.setState({isDetail:true})
     }
     
     onSaveDetail=()=>{
       this.setState({isDetail:false})
     }

     renderTable=()=>{
         return this.state.dataUser.map((val,index)=>{
           console.log(val.status)
           if(val.status==='WaitingAdmin'){
              console.log('waiting gadmin')
           }else {
             return (
                 <>
                 <TableRow key={val.id}>
                     <TableCell>{index+1}</TableCell>
                     <TableCell>{val.status}</TableCell>
                     <TableCell><img src={val.buktipembayaran} alt='Bayar Pake Credit Card'  style={{width:'200px'}}></img></TableCell>
                     <TableCell>{this.dateformat(val.tanggalPembayaran)}</TableCell>
                     <TableCell>
                       <button onClick={()=>this.onDeleteItem(val.id)}>Delete</button>
                       <button onClick={()=>this.onDetailItem(val.id)}>Details</button>
                       </TableCell>
                     
                 </TableRow>
                 </>
             )

           }
         })
     }

     renderDetail=()=>{
       return this.state.cartDetail.map((val,index)=>{
         return(
          <>
          <TableRow key={val.id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{val.product.namatrip}</TableCell>
              <TableCell><img src={val.product.gambar} alt='Bayar Pake Credit Card'  style={{width:'200px'}}></img></TableCell>
              <TableCell>{val.qty}</TableCell>
              <TableCell>{priceFormatter(val.product.harga)}</TableCell>
              <TableCell>{priceFormatter(val.product.harga*val.qty)}</TableCell>

              <TableCell>
                {/* <button onClick={()=>this.onDeleteItem(val.id)}>Delete</button>
                <button onClick={()=>this.onDetailItem(val.id)}>Details</button> */}
                </TableCell>
              
          </TableRow>
          </>
         )
       })
     }
     renderDetail2=()=>{
      return this.state.JSON.map((val,index)=>{
        return(
         <>
         <TableRow key={val.id}>
             <TableCell>{index+1}</TableCell>
             <TableCell>{val.product.namatrip}</TableCell>
             <TableCell><img src={val.product.gambar} alt='Bayar Pake Credit Card'  style={{width:'200px'}}></img></TableCell>
             <TableCell>{val.qty}</TableCell>
             <TableCell>{priceFormatter(val.product.harga)}</TableCell>
             <TableCell>{priceFormatter(val.product.harga*val.qty)}</TableCell>

             <TableCell>
               {/* <button onClick={()=>this.onDeleteItem(val.id)}>Delete</button>
               <button onClick={()=>this.onDetailItem(val.id)}>Details</button> */}
               </TableCell>
             
         </TableRow>
         </>
        )
      })
    }


     toggle = () => this.setState({setModal:false});
    render() { 
      console.log(this.state.JSON)
      console.log(this.state.cartDetail)
      console.log(this.props.cart)
      // console.log(this.state.cartDetail[0].productId)
      if(this.state.isLoading){
        return <div>Loading....</div>
      }else if (!this.state.userId){
        return <Redirect to='/'/>
      }else {
        return ( 
          <>
             <Modal className="custom-modal-style" isOpen={this.state.isDetail} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}>Details</ModalHeader>
            <ModalBody>
            <Paper className={this.state.classes.root}>
                <TableContainer className={this.state.classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                          <TableCell>No.</TableCell>
                          <TableCell>Nama Product</TableCell>
                          <TableCell style={{width:'200px'}}>Gambar</TableCell>
                          <TableCell>Qty</TableCell>
                          <TableCell style={{width:'300px'}}>Harga</TableCell>
                          <TableCell style={{width:'300px'}}>SubTotal</TableCell>
                         
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {this.renderTable()} */}
                        {/* {this.renderDetail()} */}
                        {this.renderDetail2()}
                    </TableBody>
                    </Table>
                </TableContainer>
              </Paper>
    
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.onSaveDetail}>OK</Button>
                {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
            </ModalFooter>
        </Modal>

            <div>
                 <Header/>
          <div className='px-5 mt-3'>
              {/* <ButtonUi onClick={toggle} className='my-3' >
                  Add Data
              </ButtonUi> */}
              <div className="align-self-center" style={{width:'100%'}}>
              <h1 >History Pembelian</h1>

              </div>
              <Paper className={this.state.classes.root}>
                <TableContainer className={this.state.classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                          <TableCell>No.</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell style={{width:'200px'}}>Gambar</TableCell>
                          <TableCell>Tanggal Pembayaran</TableCell>
                          <TableCell style={{width:'300px'}}>Action</TableCell>
                         
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderTable()}
                    </TableBody>
                    </Table>
                </TableContainer>
              </Paper>
          </div>
            </div>
            </>
         );

      }
        }
    } 
// }


const Mapstatetoprops=(state)=>{
    return{
        Auth:state.Auth
    }
}
 
export default connect(Mapstatetoprops,{})(History);