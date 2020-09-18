import axios from 'axios';

const   setAuthToken = token =>{
  if(token) {
    //apply authrization token to every request of logged in 
    axios.defaults.headers.common['Authorization'] = token;
  }else{
    // delete auth Header
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;