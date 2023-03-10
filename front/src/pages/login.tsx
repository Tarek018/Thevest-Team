import { Component, createSignal } from 'solid-js';
import {  useNavigate} from "solid-app-router";
import { Button } from "@suid/material"
import './styles/login.css'

const login: Component = () => {
    const [user,setuser]=createSignal({
        user:"",
        pass:""
    })
    function decodeJWT(token:any) {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace('-', '+').replace('_', '/');
          return JSON.parse(window.atob(base64));
        } catch (err) {
          return null;
        }
      }
    const navigate=useNavigate()
    function submitdata(){
        fetch('http://127.0.0.1:8080/users/login',{
            method:"POST",
            body:JSON.stringify(user())
        }).then((response)=>{
            response.json().then((result)=>{
                console.warn("result",result);
                localStorage.setItem('login',JSON.stringify({
                    login:true,
                    token:result.mytoken,
                }));
                localStorage.setItem('user',user().user)
                navigate('/')
            })
        })
        
    }
    return (
        <div class='login'>
            <div class="content">
                <input type="text" placeholder='Username' class='user'  oninput={(e)=>{
                    setuser({...user(),user:e.currentTarget.value});   
                }}/><br />
                <input type="password" placeholder='Password' class='pass' oninput={(e)=>{
                    setuser({...user(),pass:e.currentTarget.value});   
                }}/><br />
                <Button variant="contained" onClick={submitdata}>Send Post</Button>
            </div>
        </div>
    )
}

export default login;