import {axiosInstance} from "../../../utils/axiosConfig";
import { toast } from 'react-toastify';

export const loginUser = async (email,password)=>{
    try{
        let response  = await axiosInstance.post("http://localhost:3000/api/user/login",{email,password});
        localStorage.setItem("access_token",response.data.token);
        toast(response.data.msg);
        return true;
    }catch(e){
        toast(e.response.data.msg);
        return false;
    }
}

export const logOutUser = () => {
    localStorage.removeItem("auth_token");
}