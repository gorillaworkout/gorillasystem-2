import React, { Component } from 'react';
import Header from '../../components/Header'
import './listprod.css'
import { 
    Breadcrumb, BreadcrumbItem, Card, CardImg} from 'reactstrap';
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { API_URL,priceFormatter } from '../../helpers/idrformat';
class ListProd extends Component {
    state = {
        Products:[],
        today:0
      }
    componentDidMount(){
        Axios.get(`${API_URL}/products`)
        .then((res)=>{
            console.log(res.data)
            var today2 = new Date().getTime()
            this.setState({today:today2})

            this.setState({Products:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    renderCard=()=>{
        return this.state.Products.map((val)=>{
            if(this.state.today > val.tanggalmulai){
                return(
                    // <div key={val.id} className="col-md-3 px-2 py-2">
                    //     <Link to={'/products'}>
                    //         <Card className='kartu card-rounded'>
                    //             <CardImg top width="100%" className='card-rounded' height={200} src={val.gambar} alt="Card image cap" />
                    //             <div class="overlay card-rounded">
                    //                 <div class="text">
                    //                     <div>
                    //                         {val.namatrip}
                    //                         <p>EXPIRED</p>
                    //                     </div>
                    //                     <div>
                    //                         {priceFormatter(val.harga)}
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         </Card>
                    //     </Link>
                    // </div>
                    null
                )
            }else {
                return(
                    <div key={val.id} className="col-md-3 px-2 py-2">
                        <Link to={'/products/'+val.id}>
                            <Card className='kartu card-rounded'>
                                <CardImg top width="100%" className='card-rounded' height={200} src={val.gambar} alt="Card image cap" />
                                <div class="overlay card-rounded">
                                    <div class="text">
                                        <div>
                                            {val.namatrip}
                                        </div>
                                        <div>
                                            {priceFormatter(val.harga)}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </div>
                )
            }
        })
    }
    render() { 
        console.log(this.state.today)
        return (
            <div>
                <Header/>
                <div className='pt-3 px-4'>
                    <Breadcrumb className='tranparant m-0 px-2'>
                        <BreadcrumbItem ><Link className='link-class' to="/">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Products</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="row p-0 m-0">
                        {this.renderCard()}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default ListProd;