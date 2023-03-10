import { Component, createSignal, For, Show } from 'solid-js';
import {  createEffect } from 'solid-js';
import {  createStore } from 'solid-js/store';
import './styles/home.css'
import Nav from '../components/nav';
import { Button } from "@suid/material"
import {  useNavigate} from "solid-app-router";






const home: Component = () => {
    const navigate=useNavigate()

      const [posts,setPosts]=createSignal([])
    createEffect(async () => {
        const response = await fetch('http://127.0.0.1:8080/posts');
        const data = await response.json();
        setPosts(data)
        console.log(posts());
      });

    
    return (
        
        <>
        <div style='text-align: center; margin:20px border: 1px solid black'>
        <nav class='nav'>
            <h1>FbLite</h1>
            <div>
                <Show when={localStorage.length==0}>
                    <Button color="inherit" onClick={()=>{navigate('/signin');  }}>signin</Button>
                    <Button color="inherit" onClick={()=>{navigate('/login');  }}>login</Button>
                </Show>
                <Show when={localStorage.length>0}>
                    <h3>{localStorage.getItem("user")}</h3>
                    <Button color="inherit" onClick={()=>{navigate('/useracc');  }}>View account</Button>
                    <Button color="inherit" onClick={()=>{localStorage.clear();  location.reload()  }}>logout</Button>
                    

                </Show>
            </div>
        </nav>
            <For each={posts()}>{(post,i)=>
            <div class="post-container" style=' border: 1px solid black'>
            <h3 class="post-title" style='text-align: start; padding: 15px;'>{post.user}</h3>
            <div class="post-body">
                <div class="post-text">
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
            }
            </For>
        </div></>
    )
}

export default home;