import { Component, createSignal } from 'solid-js';
import { Button } from "@suid/material";
import { useNavigate } from "solid-app-router";

import { Navigate } from 'solid-app-router';

const signin: Component = () => {
    let navigate = useNavigate();

    const [user,setUser]=createSignal({
        email:"",
        name:"",
        user:"",
        password:""
    })
    function signin(){
        fetch('http://127.0.0.1:8080/users/signin',{
            method:"POST",
            body:JSON.stringify(user())
        }).then((response)=>{
            response.json().then((result)=>{
                console.warn("result",result);
                localStorage.setItem('login',JSON.stringify({
                    login:true,
                    token:result.mytoken,
                }));
                localStorage.setItem('user',user().user);
            })
        });
        navigate('/');
        
    }
    return (
        <div>
            <h1>Signin</h1>
            <input type="email" placeholder='Email' oninput={(e)=>{
                    setUser({...user(),email:e.currentTarget.value});   
                }} />
            <input type='text' placeholder='Name' oninput={(e)=>{
                    setUser({...user(),name:e.currentTarget.value});   
                }} />
            <input type='text' placeholder='User' oninput={(e)=>{
                    setUser({...user(),user:e.currentTarget.value});   
                }} />
            <input type='password' placeholder='Password' oninput={(e)=>{
                    setUser({...user(),password:e.currentTarget.value});   
                }}  />
            <Button variant="contained" class='send' onClick={signin} >Sign in</Button>


        </div>
    )
}

export default signin;