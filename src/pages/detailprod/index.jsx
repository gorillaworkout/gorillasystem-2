import React, { Component, createRef } from 'react';
import Header from '../../components/Header'
import { Breadcrumb, BreadcrumbItem,Modal,ModalBody,ModalFooter} from 'reactstrap';
import {Link,Redirect} from 'react-router-dom'
import Axios from 'axios'
import ButtonUi from './../../components/button'
import { API_URL,dateformat, priceFormatter } from '../../helpers/idrformat';
import {connect} from 'react-redux'
import {AddcartAction} from './../../redux/Actions'
import {toast} from 'react-toastify'
import {Loading} from '../../components/'
import './index.css'
import { AiOutlineConsoleSql } from 'react-icons/ai';
class DetailProd extends Component {
    state = {
        loading:true,
        products:{},
        qty:createRef(),
        isOpen:false,
        kelogin:false,
        decTicket:1,
        products2:{}
        
    }
    
    
    componentDidMount(){
        Axios.get(`${API_URL}/products/${this.props.match.params.id}`)
        .then((res)=>{
            this.setState({products:res.data,loading:false})
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    onAddToCart=()=>{
        if(this.props.role==='admin'){
            toast('Admin CANT BUY!', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else if(this.props.role==='user'){
            if(this.state.qty.current.value==''){
            toast('Quantity Harus di Isi', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            }
            else if(this.state.qty.current.value){
                console.log('masuk ke else if. quantity udh diisi')
                Axios.get(`${API_URL}/carts?userId=${this.props.id}&productId=${this.state.products.id}`)
                .then((res)=>{
                    this.setState({products2:res.data})
                    // this.props.AddcartAction(res.data)
                    if(res.data.length){
                        Axios.get(`${API_URL}/products?id=${this.state.products.id}`)
                        .then((res6)=>{
                            // console.log(res6.data)
                            Axios.patch(`${API_URL}/products/${this.state.products.id}`,{
                                ticket:parseInt((res6.data[0].ticket - this.state.qty.current.value))
                            })
                            .then((res5)=>{
                                this.setState({products:res5.data})
                                toast(`Anda Menambahkan ${this.state.qty.current.value}Quantity, Data Berhasil Ditambahkan`, {
                                    position: "top-left",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                                // this.props.AddcartAction(res5.data)

                            }).catch((err)=>{
                                console.log(err)
                            })
    
                        }).catch((err)=>{
                            console.log(err)
                        })
                        console.log(this.state.qty.current.value)
                        Axios.patch(`${API_URL}/carts/${res.data[0].id}`,{
                            // qty:parseInt((this.state.products2[0].qty + this.state.qty.current.value))
                            qty:(parseInt(this.state.products2[0].qty) + parseInt(this.state.qty.current.value))
                        })
                        .then((res8)=>{
                            console.log(res8.data)
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }else {
                        Axios.get(`${API_URL}/products?id=${this.state.products.id}`)
                        .then((res6)=>{
                            // this.setState({products2:res6.data})
                            console.log(this.state.products2)
                            console.log(res6.data[0].ticket)
                            console.log(this.state.qty.current.value)
                            Axios.patch(`${API_URL}/products/${this.state.products.id}`,{
                                ticket:parseInt((res6.data[0].ticket - this.state.qty.current.value))
                            })
                            .then((res5)=>{

                                this.setState({products:res5.data})
                                // this.props.AddcartAction(res5.data)

                            }).catch((err)=>{
                                console.log(err)
                            })
                                console.log(this.state.qty)

                        }).catch((err)=>{
                            console.log(err)
                        })
                        console.log(this.state.qty.current.value)
                        // console.log(this.state.products2[0].qty)
                        // console.log(this.state.products2[0].qty)
                        console.log(this.state.products2)
                        Axios.post(`${API_URL}/carts`,{
                            userId:this.props.id,
                            productId:this.state.products.id,
                            // qty:this.state.qty.current.value
                            qty: this.state.qty.current.value
                        }).then((res2)=>{
                            // console.log(res2.data)
                               Axios.get(`${API_URL}/carts`,{
                                   params:{
                                       userId:this.props.id,
                                       _expand:'product'
                                   }
                               }).then((res3)=>{
                                    this.props.AddcartAction(res3.data)
                                    // alert('berhasil masuk cart')
                                    toast('Thankyou! Data berhasil ditambahkan', {
                                        position: "top-left",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                    console.log(res3.data)
                               }).catch((err)=>{
                                    console.log(err)
                               })
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }
                }).catch((err)=>{
                    console.log(err)
                })
        }else {
            toast('salah broo harusnya qty disii', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            }
        } else {
            this.setState({isOpen:true})
        }
    }

  
     
    onRedirecttoLogin=()=>{
        this.setState({isOpen:false,kelogin:true})
    }
    render() {
        const {products,isOpen}=this.state
        if(this.state.loading){
            return(
                <div><Loading/></div>
            )
        }
        if(this.state.kelogin){
            return <Redirect to='/login'/>
        } 
        return (
            <div className="detail-box">
                <Modal isOpen={isOpen} toggle={()=>this.setState({isOpen:false})}>
                    <ModalBody>
                        login dulu bro baru bisa beli cuy
                    </ModalBody>
                    <ModalFooter>
                        <ButtonUi onClick={this.onRedirecttoLogin}>
                            Ok
                        </ButtonUi>
                    </ModalFooter>
                </Modal>
                <Header/>
                <Breadcrumb className='tranparant m-0 px-2'>
                    <BreadcrumbItem ><Link className='link-class' to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem ><Link className='link-class' to="/products">Products</Link></BreadcrumbItem>
                    <BreadcrumbItem active >{this.state.products.namatrip}</BreadcrumbItem>
                </Breadcrumb>
                <div className="pt-3 px-4 detail-box-dalem ">
                    <div style={{width:'100%',height:400,}}>
                        <img src={products.gambar} style={{objectFit:'cover',objectPosition:'bottom'}} height='100%' width='100%' alt={"foo"}/>
                    </div>
                    <div className="detail-box-bawah">
                    <div className="tanggalMulai">
                        <h5 className='mt-2'>Tanggal mulai :{dateformat(products.tanggalmulai)}</h5>
                        <h5 className='mt-2'>Tanggal berakhir :{dateformat(products.tanggalberakhir)}</h5>
                        <label ><h4>Jumlah Ticket: {products.ticket}</h4></label><br/>
                    </div>
                    <div className="ticketing">
                        <h1 className='mt-2'>
                            {products.namatrip}
                        </h1>
                        
                        <div className="mt-2">
                        <input type="number" className={'form-control'} placeholder='qty' style={{width:200}} ref={this.state.qty}/>
                        <ButtonUi className='mt-2' onClick={this.onAddToCart}>
                            Add to cart
                        </ButtonUi>

                        </div>
                       
                    </div>
                    <div className=' mt-3 mb-5 description'>
                        <h3>Description:</h3>
                         <h4>Harga: {priceFormatter(products.harga)}</h4>
                        <p>{products.deskripsi}</p>
                        
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
const MapstatetoProps=({Auth})=>{
    return {
        ...Auth
    }
}
export default connect(MapstatetoProps,{AddcartAction}) (DetailProd);