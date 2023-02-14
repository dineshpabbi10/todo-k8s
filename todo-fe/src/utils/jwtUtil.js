export const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
};

export const verifyJwtExpiry = () =>{
    const decodedJwt = parseJwt(localStorage.getItem("access_token"));
    if (decodedJwt && decodedJwt.exp * 1000 > Date.now()) {
        return true;
    }
    return false;
}