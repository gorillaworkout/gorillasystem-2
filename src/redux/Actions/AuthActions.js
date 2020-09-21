import Axios from 'axios'
import { API_URL } from '../../helpers/idrformat'
import {ADDCART, LOGIN,ADDQTY} from './../Type'
import {toast} from 'react-toastify'  
export const LoginFunc=(obj,cart)=>{
    return{
        type:LOGIN,
        payload:obj,
        cart:cart
    }
}

export const LogoutFunc=()=>{
    return{
        type:'LOGOUT'
        
    }
}
export const ccredux=(obj)=>{
    return{
        type:'CC',
        payload:obj
    }
}

export const ClearFunc=()=>{
    return(dispatch)=>{
        dispatch({type:'CLEAR'})
    }
    // return{
    //     type:'CLEAR'
    // }
}

// export const AddQty=()=>{
//     return{
//         type:'ADD'
//     }
// }

export const AddcartAction=(cart)=>{
    return{
        type:ADDCART,
        cart:cart
    }
}

export const addQty=()=>{
    console.log('masuk ke addqty')
    return{
        type:ADDQTY
        
    }
}

// export const tambahQty=(index,userIdCust)=>{
//     return(dispatch)=>{
//         dispatch({type:'LOADING'})
//         Axios.get(`${API_URL}/carts?userId=${userIdCust}`)
//         .then((res)=>{
//             console.log(res.data)
//             console.log('bayu')
//         })
//     }
// }

export const LoginThunk=(username,password)=>{
    return(dispatch)=>{
        dispatch({type:'LOADING'})
        Axios.get(`${API_URL}/users`,{
            params:{
                username:username,
                password:password
            }
        }).then((res)=>{
            if(res.data.length){
                Axios.get(`${API_URL}/carts`,{
                    params:{
                        userId:res.data[0].id,
                    _expand:'product'
                    }
                }).then((res1)=>{
                    Axios.get(`${API_URL}/users?username=${username}&password=${password}`)
                    .then((res2)=>{
                        console.log(res2.data)
                        if(res2.length){
                            toast.error(`Username / password Sudah ada `, {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                draggable: true,
                                progress: undefined,
                            });
                            console.log('username/password sudah ada')
                        }else {
                            localStorage.setItem('id',res.data[0].id)
                            toast.error(`Selamat Datang ${username}`, {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                draggable: true,
                                progress: undefined,
                            });
                            // this.props.LoginFunc(res.data[0])
                            console.log(res.data[0])
                            dispatch({type:'CART',payload:res.data[0]})
                            dispatch({type:'LOGIN',payload:res.data[0],cart:res1.data})
                            
                        }        
                    }).catch((err)=>{
                        console.log(err)
                    })
                    

                }).catch((err)=>{
                    dispatch({type:'Error',payload:'error server'})
                })
                }else{
                    dispatch({type:'Error',payload:'error dari Redux'})
                    toast.error(`Username / password Anda Salah`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // this.setState({alert:'Password / Username salah bro'})
                }
        }).catch((err)=>{
            dispatch({type:'Error',
            payload:'server error cuk'})
        })
    }
}   