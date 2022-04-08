import { Avatar } from "@material-ui/core";
import React, { useEffect,useState } from "react";
import "./SidebarChat.css";
import axios from "./axios";
import {Link} from "react-router-dom";

function SidebarChat({ Key , tema, idioma, nivel, addNewChat}){

    const [seed, setSeed] = useState('');

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    },[]);

    const createChat = () => {
        const roomName = prompt("escolha o tema da sala");
        const idioma = prompt("escolha o idioma da sala");
        const nivel = prompt("escolha o nivel da sala");
        if(roomName){
            axios.post('/group/new',{
                tema: roomName,
                idioma : idioma,
                nivel : nivel,
              });
        }
    };

    return !addNewChat ? (
    <Link to={`/groups/${Key}`}>
        <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat_info">
            <h2>{tema}</h2>
            <p>{idioma +" "+ nivel}</p>
        </div>
    </div>
    </Link>
    ):(
        <div onClick ={createChat}
        className = "sidebarChat">
            <h2>add New Chat</h2>
        </div>
    );
};

export default SidebarChat;
