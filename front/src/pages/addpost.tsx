import { Component,createEffect,createSignal } from 'solid-js';
import { useNavigate } from "solid-app-router";
import { Button } from "@suid/material"
import Axios from "axios";
import './styles/addpost.css'


const Addpost: Component = () => {

    let navigate = useNavigate();
    createEffect(()=>{
        if(localStorage.length==0){
            navigate('/signin');
        }
    })

    const [post,setpost]=createSignal({
        content:"",
        user:localStorage.getItem('user')
    });
    function inputeddata(e:any){
        setpost({...post(),content:e.currentTarget.value})            
    }

    function sendpost(){
        console.log(post());
        fetch('http://127.0.0.1:8080/posts/addpost',{
            method:"POST",
            body:JSON.stringify(post()),
        }).then((response)=>{
            response.json();
        });
        navigate('/');
        
    }

    return (
        <div class='div'>
            <textarea class='addpost' oninput={inputeddata}></textarea>
            <Button variant="contained" class='send' onClick={sendpost} >Send Post</Button>
        </div>
    )
}

export default Addpost;