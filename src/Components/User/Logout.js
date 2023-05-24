import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Logout(props) {
    const navigate=useNavigate()
// const token=props.userState


    // const config = {
    //     headers: { Authorization: 'Bearer' +token}
   
    // };
    
    // axios.post( 
    //   'http://127.0.0.1:8000/api/logout',
     
    //   config
    // ).then(console.log).catch(console.log);
    



    // let url = "http://127.0.0.1:8000/api/logout";
    
    // let header= {
    //     headers: {'Authorization': "Bearer " + token}
    // };
    
    // axios.post(url, header)
    //  .then(res => {
    //    console.log(res)
    //  }).catch(err => {
    //    console.log(err)
    //  });


    localStorage.setItem('token', null);
    props.setUserState(null);
    localStorage.removeItem('CurrentUser')
    localStorage.removeItem('token')
    navigate('/login')
  
}

export default Logout