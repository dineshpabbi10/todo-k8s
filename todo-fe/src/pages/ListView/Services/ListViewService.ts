import {axiosInstance} from "../../../utils/axiosConfig";
import { toast } from 'react-toastify';

export const fetchList = async ()=>{
    try{
        let response  = await axiosInstance.get("http://localhost:3000/api/list/");
        toast(response.data.msg);
        return response.data.data;
    }catch(e){
        toast(e.response.data.msg);
        return null;
    }
}

export const logOutUser = () => {
    localStorage.removeItem("auth_token");
}