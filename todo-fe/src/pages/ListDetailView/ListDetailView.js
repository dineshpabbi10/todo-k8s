import React, { useEffect }  from "react";
import {verifyJwtExpiry} from "../../utils/jwtUtil";
import {useNavigate} from "react-router-dom";

export default function ListDetailView(props) {
    let navigator = useNavigate()
    useEffect(()=>{
        if(!verifyJwtExpiry()){
            navigator("/app/login")
        }
    },[])
  return <div>List Detail Screen</div>
}