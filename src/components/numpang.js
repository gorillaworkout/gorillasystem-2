Axios.get(`${API_URL}/detailTransactions`)
.then((res)=>{
    console.log(res.data)
    this.setState({detailCart2:res.data})
}).catch((err)=>{
  console.log(err)
})
