import {ADDCART, LOGIN,ADDQTY} from './../Type'
const INITIAL_STATE={
    username:'',
    password:'',
    id:0,
    isLogin:false,
    isLoading:false,
    error:'',
    cart:[],
    qty:0,
    cart2:[],
    ccName:'test'

}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case LOGIN:
            // return {...state,...action.payload,isLogin:true}
            return {...state,...action.payload,isLogin:true,isLoading:false,cart:action.cart}  
        
        case 'LOGOUT':
            return INITIAL_STATE
        
        case 'Error':
            return {...state,error:action.payload, isLoading:false}
        
        case 'LOADING':
            return {...state,isLoading:true}

        case 'CLEAR':
            return {...state ,error:''}

        case ADDCART:
            return{...state,cart:action.cart}

        case ADDQTY:
            console.log('masuk ke reducer')     
            return{
                ...state, qty:state.qty+1
            }
        case 'CART':
            console.log('masuk ke reducer CART')
            return {...state,cart2:action.payload}

        case 'CC':
            console.log('masuk ke reducer CC')
            return {...state,ccName:action.payload.cc}

        default:
            return state
    }
}