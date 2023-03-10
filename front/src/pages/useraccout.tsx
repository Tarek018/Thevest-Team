import { Component, createEffect, createSignal, For } from 'solid-js';
import { Button } from "@suid/material";
import { useNavigate } from "solid-app-router";
import Userpost from "./userpost";

const useraccout: Component = () => {
    let navigate=useNavigate()
    const [account,setAccount]=createSignal({
        email:"",
        name:"",
        user:"",
        password:""
    })
    createEffect(async()=>{
       
        await fetch('http://127.0.0.1:8080/users/account',{
            method:"POST",
            body:JSON.stringify(localStorage.getItem("user"))
        })
        .then(response => response.json())
        .then((data=>{
            setAccount({...account(),email:JSON.stringify(data[0].email)}); 
            setAccount({...account(),name:JSON.stringify(data[0].name)}); 
            setAccount({...account(),user:JSON.stringify(data[0].user)}); 
            setAccount({...account(),password:JSON.stringify(data[0].password)}); 
    
        }))
        
        

    })
    return (
        <div>
            <h1>Your Account</h1>
            <input type="email" placeholder='Email' value={account().email}/>
            <input type='text' placeholder='Name' value={account().name}/>
            <input type='text' placeholder='User'  value={account().user}/>
            <input type='password' placeholder='Password' value={account().password}  />
            <Button variant="contained" onClick={()=>{navigate('/addpost');  }}>Add Post</Button>

            <Userpost  />
        </div>
    )
}

export default useraccout;