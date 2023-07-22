
export const setSession = (username, isLoggedIn) => {
    localStorage.setItem('email', username);
    localStorage.setItem('isLoggedIn', isLoggedIn);
  };
  

  export const getSession = () => {
    const username = localStorage.getItem('username');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return { username, isLoggedIn: isLoggedIn === 'true' };
  };

  export const clearSession = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
  };
  