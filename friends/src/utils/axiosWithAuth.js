import axios from 'axios';

// 1. authorize calls with authorization headers
// 2. set url prefix to our server

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  
  return axios.create({
    // config object
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: token
    }
  })
}