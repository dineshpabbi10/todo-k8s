import React,{useEffect,useState} from "react"
import {verifyJwtExpiry} from "../../utils/jwtUtil";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "./Services/RegisterService"

export default function Register(props) {
    let navigator = useNavigate();
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");

    const submitCredentials = async ()=>{
        if(await registerUser (email,password)){
            setEmail("");
            setPassword("");
            navigator("/app/list");
        }
    }

    useEffect(()=>{
        if(verifyJwtExpiry()){
            navigator("/app/list")
        }
    },[]);

    return (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Register User</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={email}
                  onChange = {(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange = {(e)=>setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="button" onClick={()=>{
                    submitCredentials();
                }} className="btn btn-primary">
                  Submit
                </button>
              </div>
              <Link to={"/app/login"}>Login</Link>
            </div>
          </form>
        </div>
    )
}