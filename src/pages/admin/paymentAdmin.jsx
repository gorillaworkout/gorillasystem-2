import React, { Component } from 'react';
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
import { API_URL } from '../../helpers/idrformat';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

class PaymentAdmin extends Component {

    state = {
        classes:useStyles,
        dataPayment:[]
    }
    // http://localhost:4000/transactions?userId=3&_expand=user
    // classes = useStyles()
    // Axios.get(`${API_URL}/carts?userId=${this.props.id}&_expand=product`)
    componentDidMount=()=>{
        Axios.get(`${API_URL}/transactions`)
        .then((res)=>{
            this.setState({dataPayment:res.data})
            // console.log(res.data[0].id)
            console.log(this.state.dataPayment)
        }).catch((err)=>{
            console.log(err)
        })

        // console.log(this.state.dataPayment.userId)

        // Axios.get(`${API_URL}/transactions?userId=${this.state.}`)
    }

    dateformat=(n)=>{
        var today = new Date(n);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
    
        today = mm + '-' + dd + '-' + yyyy;
        return today
      }
    renderTable=()=>{
        return this.state.dataPayment.map((val,index)=>{
                console.log(val.status)
                if(val.status==='Completed'){
                    console.log('berhasil')
                    return (
                        <>
                        <TableRow key={val.id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{val.status}</TableCell>
                            <TableCell><img src={val.buktipembayaran} alt={val.ccName}  style={{width:'150px',height:'80px'}}></img></TableCell>
                            <TableCell>{this.dateformat(val.tanggalPembayaran)}</TableCell>
                            <TableCell>Approved</TableCell>
                        </TableRow>
                        </>
                    )
                }else {
                    console.log('masuk ke else')
                    return (
                        <>
                        <TableRow key={val.id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{val.status}</TableCell>
                            <TableCell><img src={val.buktipembayaran} alt={val.ccName}  style={{width:'200px',height:'80px'}}></img></TableCell>
                            <TableCell>{this.dateformat(val.tanggalPembayaran)}</TableCell>
                            <TableCell><button  className=" btn btn-primary btn-action"onClick={()=>this.OnApprove(val.id)}>approve</button></TableCell>
                        </TableRow>
                        </>
                    )

                }
        })
    }

    OnApprove=(index)=>{
        console.log(index)
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
                Axios.patch(`${API_URL}/transactions/${index}`,{
                    status:'Completed'
                })
                .then((res)=>{  
                    console.log(res.data)
                    Axios.get(`${API_URL}/transactions/`)
                    .then((res1)=>{
                        this.setState({dataPayment:res1.data})
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

    render() { 
        return (
            <div>
                <Header/>
          <div className='px-5 mt-3'>
              {/* <ButtonUi onClick={toggle} className='my-3' >
                  Add Data
              </ButtonUi> */}
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
          );
    }
}
 
export default PaymentAdmin;