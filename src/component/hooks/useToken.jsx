// hooks/useToken.js
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useToken = (email) => {
    console.log(email)
//   const [token, setToken] = useState('');
  useEffect(() => {
    
    if (email) {

        axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/jwt`,{
            email: email,
        })
        .then(function (response) {
            if(response.status === 200){
                toast.success("Create a new book");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        // axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/jwt`,{
        //     email: email
        // })
        // .then(response => {
        //     console.log(response)
        //     // if (response.accessToken) {
        //     //     localStorage.setItem('access-token', response.accessToken);
        //     //   }
        // })
        // .catch(error => {
        //   console.error(error);
        // });
    }
  }, [email]);
};

export default useToken;
