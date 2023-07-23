
export const setSession = (token, isLoggedIn) => {
    localStorage.setItem('token', token)
    localStorage.setItem('isLoggedIn', isLoggedIn);
  };
  

  export const getSession = () => {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return { token, isLoggedIn: isLoggedIn === 'true' };
  };

  export const clearSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
  };
  
  // export const tokenVerifiedLogout=()=>{
  //   const token = localStorage.getItem('token');
  //   if(!token){
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('isLoggedIn');
  //   }
  // }