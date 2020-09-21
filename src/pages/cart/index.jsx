import React, { Component, createRef } from 'react';
import Header from '../../components/Header'
import {connect} from 'react-redux'
import Axios from 'axios'
import { API_URL, priceFormatter } from '../../helpers/idrformat';
import Notfound from './../notfound'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import ButtonUi from './../../components/button'
import {Modal,ModalHeader,ModalBody,ModalFooter,Breadcrumb,BreadcrumbItem} from 'reactstrap'
import {Link} from 'react-router-dom'
import {AddcartAction,ccredux} from './../../redux/Actions'
import {GoDiffAdded} from 'react-icons/go'
import {AiOutlineMinusSquare} from 'react-icons/ai'
import {BiPlusMedical} from 'react-icons/bi'
import {ImMinus} from 'react-icons/im'
import {addQty} from './../../redux/Actions'
import {toast} from 'react-toastify'   
import {Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './index.css'
const MySwal = withReactContent(Swal)

class Cart extends Component {
    state = {
        cart:[],
        isOpen:false,
        pilihan:0,  
        bukti:createRef(),
        cc:createRef(),
        qty:0,
        successful:false,
        qtyCart:1,
        countergen:0,
        // ccName:0,
        test:''
        
    }
    componentDidMount(){
        // Axios.get(`${API_URL}/carts?userId=${this.props.id}&_expand=product`)
        // console.log(this.props.id)
        Axios.get(`${API_URL}/carts`,{
            params:{
                userId:this.props.id,
                _expand:'product'
            }
        })
        .then((res)=>{
            console.log(res.data)
            localStorage.setItem('transaction',JSON.stringify(res.data))
            this.setState({cart:res.data})
            // this.setState({qty:res.data[0].qty})
            console.log(res.data[0].qty)
           
            
        }).catch((err)=>{
            console.log(err)
        })
    }


    renderTotalHarga=()=>{
        var total=this.state.cart.reduce((total,num)=>{
            return total+(num.product.harga*num.qty)
        },0)
        return total
    }

    renderCart=()=>{
        return this.state.cart.map((val,index)=>{
            return(
                <TableRow key={val.id}>
                    <TableCell >{index+1}</TableCell>
                    <TableCell >{val.product.namatrip}</TableCell>
                    <TableCell >
                        <div style={{maxWidth:'200px'}}>
                            <img width='100%' height='100%' src={val.product.gambar} alt={val.product.namatrip}/>
                        </div>
                    </TableCell>
                    <TableCell>
                        <button className="mr-2 btn-cart" onClick={()=>this.minusbtn(val.id)}><ImMinus/></button>
                            {val.qty}
                            {/* {this.props.qty} */}
                        <button className="ml-2 btn-cart" onClick={()=>this.addbtn(val.id)}><BiPlusMedical/></button>
                        </TableCell>
                    <TableCell>{priceFormatter(val.product.harga)}</TableCell>
                    <TableCell>{priceFormatter(val.product.harga*val.qty)}</TableCell>
                    <TableCell><button className="btn btn-danger "onClick={()=>this.deletebtn(val.id)}>Delete</button></TableCell>
                </TableRow>
            )
        })
    }

    minusbtn=(index)=>{
        console.log('berhasil tambah')
        var userIdCust = window.localStorage.getItem('id')
        console.log(userIdCust + ' ini user id')
        console.log(index + ' ini index dari val id key')

        console.log(this.state.cart)

        Axios.get(`${API_URL}/carts?userId=${this.props.id}&id=${index}`)
        .then((res)=>{
            console.log(res.data)
            console.log(res.data[0].productId)
            Axios.patch(`${API_URL}/carts/${res.data[0].id}`,{
                qty:parseInt(res.data[0].qty - 1)
            }).then((res2)=>{
                console.log(res2.data)
                Axios.get(`${API_URL}/carts`,{
                    params:{
                        userId:this.props.id,
                        _expand:'product'
                    }
                }).then((res3)=>{
                        console.log(res3.data)
                        this.setState({cart:res3.data})
                }).catch((err)=>{
                    console.log(err)
                })
                // this.setState({cart:res2.data})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    addbtn=(index)=>{
        console.log('berhasil tambah')
        var userIdCust = window.localStorage.getItem('id')
        console.log(userIdCust + ' ini user id')
        console.log(index + ' ini index dari val id key')

        console.log(this.state.cart)

        Axios.get(`${API_URL}/carts?userId=${this.props.id}&id=${index}`)
        .then((res)=>{
            console.log(res.data)
            console.log(res.data[0].productId)
            Axios.patch(`${API_URL}/carts/${res.data[0].id}`,{
                qty:parseInt(res.data[0].qty + 1)
            }).then((res2)=>{
                console.log(res2.data)
                Axios.get(`${API_URL}/carts`,{
                    params:{
                        userId:this.props.id,
                        _expand:'product'
                    }
                }).then((res3)=>{
                        console.log(res3.data)
                        this.setState({cart:res3.data})
                }).catch((err)=>{
                    console.log(err)
                })
                // this.setState({cart:res2.data})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })

    }

    deletebtn=(index)=>{
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
        Axios.delete(`${API_URL}/carts/${index}`)
        .then((res)=>{
                Axios.get(`${API_URL}/carts`,{
                    params:{
                        userId:this.props.id,
                        _expand:'product'
                    }
                }).then((res2)=>{
                    this.setState({cart:res2.data})
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


    // transaction itu ada id,status,userId,tanggalpembayaran,metode,buktipembayaran,
    // transactionDetails id,transactionId,productId,price,qty
    onBayarClick=()=>{
        const {pilihan}=this.state
        if(pilihan==='1'){
            this.onbayarpakebukti()
        }else if(pilihan==='2'){
            this.onbayarpakeCC()
        }else{
            alert('pilih dulu tipe pembayarannya bro')
        }
    }

    lunhAlgo=(answer)=>{
        
        var input = this.state.cc.current.value
        var x = input
    var counter = 0; //  ngitung total digit
    var output1 = 0; // ngitung genap
    var output2 = 0; // ngitung ganjil
    var pecah = 0; // ngitung per digit, ngeluarin digit
    do{
        pecah = x%10
        x = Math.floor(x/10)
        counter++
    }while (x>0)
    
    if (counter %2 == 0){
        this.state.countergen = 1 
    } else{
        this.state.countergen = 0
    }
    var z = input
    var a = Math.floor(z/Math.pow(10,15))
    var hacep = 0
    do{
        hacep = z%10
        z = Math.floor(z/10)
        if (this.state.countergen%2 == 0){
            var pecah2 = hacep*2
            if (pecah2 >= 10){
                var pecah3 = pecah2%10;
                var pecah4 = Math.floor(pecah2/10)
                output1 += pecah3+pecah4  
            }else{
                output1 += pecah2 //genap
            }
        } else if(this.state.countergen%2 != 0){
            output2 += hacep //ganjil
        }
        this.state.countergen++
    } while(z > 0)
    var total = output1+output2
    if(total % 10 == 0){
        if(counter == 16){
            if(a == 4) {
                console.log('visa')
                this.setState({ccName:'VISA'})
                return `VISA`
            }else {
                console.log('master card')
                this.setState({ccName:'Master Card'})
                return `Master Card`
            }
        }else if (counter == 15){
            console.log('amex')
            this.setState({ccName:'AMEX'})
            return `AMEX`
        }else if (counter == 13){ 
            console.log('visa')
            this.setState({ccName:'VISA'})
            return `VISA`
        }
    }else{
        console.log('not valid')
        this.setState({ccName:1})
        this.setState({test:'BISA DONG CUK'})
        // console.log(this.state.ccName)
        ccredux({cc:'not valid'})
        return 'not valid'
    }
    

    }
    onbayarpakeCC=()=>{
       this.lunhAlgo()
       const result = this.lunhAlgo(this.result2)
       console.log(result)
        
       if(result==='not valid'){
        toast.error(`Wrong Number! Check Your Credit Card Number`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
        });
       }else {
       
        Axios.post(`${API_URL}/detailTransactions`,{
            status:'Completed',
            userId:this.props.id,
            tanggalPembayaran:new Date().getTime(),
            ccName:result,
            metode:'cc',
            buktipembayaran:'https://hmp.me/dcrf',
            namatrip:this.state.cart.namatrip,
            gambar:this.state.cart.gambar,
            qty:this.state.qty,
            harga:this.state.harga,
            subtotal:this.state.harga * this.state.qty
               
           }).then((res)=>{
                console.log(res.data)
           }).catch((err)=>{
               console.log(err)
           })
           Axios.post(`${API_URL}/transactions`,{
               status:'Completed',
               userId:this.props.id,
               tanggalPembayaran:new Date().getTime(),
               ccName:result,
               metode:'cc',
               buktipembayaran:'https://hmp.me/dcrf'
           }).then((res)=>{
               var arr=[]
               this.state.cart.forEach((val)=>{
                   arr.push(Axios.post(`${API_URL}/transactionsdetails`,{
                       transactionId:res.data.id,
                       productId:val.productId,
                       price: parseInt(val.product.harga),
                       qty:val.qty
                   }))
               })
               Axios.all(arr).then((res1)=>{
                   var deletearr=[]
                   this.state.cart.forEach((val)=>{
                       deletearr.push(Axios.delete(`${API_URL}/carts/${val.id}`))
                   })
                   Axios.all(deletearr)
                   .then(()=>{
                       Axios.get(`${API_URL}/carts`,{
                           params:{
                               userId:this.props.id,
                               _expand:'product'
                           }
                       })
                       .then((res3)=>{
                           console.log(res3.data)
                           this.props.AddcartAction([])
                           this.setState({cart:res3.data,isOpen:false})
                           
                           toast.error(`Pembelian Anda Berhasil! THANKYOU`, {
                               position: "top-right",
                               autoClose: 2000,
                               hideProgressBar: false,
                               closeOnClick: true,
                               draggable: true,
                               progress: undefined,
                           });
                           this.setState({successful:true})
                       }).catch((err)=>{
                           console.log(err)
                       })
                   }).catch((Err)=>{
                       console.log(Err)
                   })
               }).catch((err)=>{
                   console.log(err)
               })
           }).catch((err)=>{
    
           })
       
       }
        
    }
    onbayarpakebukti=()=>{
        Axios.post(`${API_URL}/transactions`,{
            status:'WaitingAdmin',
            userId:this.props.id,
            tanggalPembayaran:new Date().getTime(),
            metode:'upload',
            buktipembayaran:this.state.bukti.current.value
        }).then((res)=>{
            var arr=[]
            this.state.cart.forEach((val)=>{
                arr.push(Axios.post(`${API_URL}/transactionsdetails`,{
                    transactionId:res.data.id,
                    productId:val.productId,
                    price: parseInt(val.product.harga),
                    qty:val.qty
                }))
            })
            Axios.all(arr).then((res1)=>{
                var deletearr=[]
                this.state.cart.forEach((val)=>{
                    deletearr.push(Axios.delete(`${API_URL}/carts/${val.id}`))
                })
                Axios.all(deletearr)
                .then(()=>{
                    Axios.get(`${API_URL}/carts`,{
                        params:{
                            userId:this.props.id,
                            _expand:'product'
                        }
                    })
                    .then((res3)=>{
                        console.log(res3.data)
                        this.props.AddcartAction([])
                        this.setState({cart:res3.data,isOpen:false})
                        toast.error(`Waiting Admin For Accepting Your Payment! THANKYOU`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            progress: undefined,
                        });
                        this.setState({successful:true})
                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch((Err)=>{
                    console.log(Err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{

        })
    }
    onCheckOutClick=()=>{
        this.setState({isOpen:true})
        
    }

    render() {
        if(this.state.successful){
            return <Redirect to="/"></Redirect>
        }
        if(this.props.role==='user') {
            return (
                <div>
                 
                    <Modal isOpen={this.state.isOpen} toggle={()=>this.setState({isOpen:false})}>
                        <ModalHeader toggle={()=>this.setState({isOpen:false})}>Pembayaran</ModalHeader>
                        <ModalBody>
                            <select onChange={(e)=>this.setState({pilihan:e.target.value})} className='form-control' defaultValue={0} >
                                <option value="0" hidden>Select payment</option>
                                <option value="1">input bukti transfer</option>
                                <option value="2">Credit card</option>
                            </select>
                            {
                                this.state.pilihan==2?
                                <input className='form-control' ref={this.state.cc} placeholder='masukkan cc'/>
                                :
                                this.state.pilihan==1?
                                <input className='form-control' ref={this.state.bukti}  placeholder='input bukti pembayaran'/>
                                :
                                null
                            }
                            <div>
                              Total Harga  {priceFormatter(this.renderTotalHarga())}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <ButtonUi onClick={this.onBayarClick}>
                                Bayar
                            </ButtonUi>
                        </ModalFooter>
                    </Modal>
                    <Header/>
                    <div className=' pt-3' style={{paddingLeft:'10%',paddingRight:'10%'}}>
                    <Breadcrumb className='tranparant m-0 px-2'>
                    <BreadcrumbItem ><Link className='link-class' to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem ><Link className='link-class' to="/products">Products</Link></BreadcrumbItem>
                    {/* <BreadcrumbItem active >{this.state.products.namatrip}</BreadcrumbItem> */}
                     </Breadcrumb>
                        <Paper >
                            <TableContainer >
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell style={{width:'200px'}}>Nama Trip</TableCell>
                                            <TableCell style={{width:'200px'}}>Gambar</TableCell>
                                            <TableCell>Jumlah</TableCell>
                                            <TableCell>Harga</TableCell>
                                            <TableCell>subtotal Harga</TableCell>
                                            <TableCell>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.renderCart()}
                                    </TableBody>
                                    <TableFooter>
                                        <TableCell colSpan={4}></TableCell>
                                        {
                                            this.state.cart.length?
                                            <>
                                            <TableCell style={{fontWeight:'700',color:'black',fontSize:20}}>Subtotal Harga</TableCell>
                                            <TableCell style={{color:'black',fontSize:20}}>{priceFormatter(this.renderTotalHarga())}</TableCell>
                                            </>
                                            :
                                            null
                                        }
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            {
                                this.state.cart.length?
                            <ButtonUi onClick={this.onCheckOutClick}  className='my-3' >
                                CheckOut
                            </ButtonUi>
                            :
                            null
                            }
                        </Paper>
                    </div>
                </div>
            );
        }else{
            return(
                <Notfound/>
            )
        }
    }
}
const MapstatetoProps=({Auth})=>{
    return {
        ...Auth
    }
}
export default connect(MapstatetoProps,{AddcartAction,addQty,ccredux})(Cart);