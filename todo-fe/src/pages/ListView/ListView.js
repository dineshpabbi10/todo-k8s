import React, { useEffect } from "react"
import {verifyJwtExpiry} from "../../utils/jwtUtil";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './listview.css';

export default function ListView(props) {
    let navigator = useNavigate();

    useEffect(()=>{
        if(!verifyJwtExpiry()){
            navigator("/app/login");
            toast("Sesssion Expired !");
        }
    },[]);

    const footer = (
            <Button icon="pi pi-times" className="p-button-outlined p-button-danger" />
    );
    
  return (
    <>
        <center><h2>Lists</h2></center>

        <div className="list-view">
            <div className="p-inputgroup list-card">
                <InputText placeholder="List Name" />
                <Button label="Add" />
            </div>
            <Card className="list-card" title="Title" footer = {footer}></Card>
            <Card className="list-card" title="Title" footer = {footer}></Card>
            <Card className="list-card" title="Title" footer = {footer}></Card>
            <Card className="list-card" title="Title" footer = {footer}></Card>
            <Card className="list-card" title="Title" footer = {footer}></Card>
        </div>
    </>
  )
}