import { Component, createEffect, createSignal ,For} from 'solid-js';
import { Button } from "@suid/material"

import {  useNavigate} from "solid-app-router";

const userpost: Component = () => {
    const navigate=useNavigate();
    const [posts,setposts]=createSignal([])
    createEffect(()=>{
        fetch('http://127.0.0.1:8080/posts/myposts',{
            method:"POST",
            body:JSON.stringify(localStorage.getItem('user'))
        })
        .then(response => response.json())
        .then(data => {
            setposts(data); console.log(posts());
            
        })
    })
    const deleteTodo =(id:any)=>{
        fetch(`http://127.0.0.1:8080/posts/delete`, {
      method: 'POST',
      body:JSON.stringify(id)
    })
    .then(res => res.json())
    .then(res=> setposts(res))
    navigate('/')
        
    }

    return (
        <div>
            <For each={posts()}>{(post,i)=>
            <div class="post-container" style=' border: 1px solid black'>
            <div class="post-body">
                <div class="post-text">
                    <p>{post.content}</p>
                </div>
                <Button variant="contained" class='send'  onClick={() => deleteTodo(post._id)}>Delete post</Button>
            </div>
        </div>
            }
            </For>
        </div>
    )
}

export default userpost;