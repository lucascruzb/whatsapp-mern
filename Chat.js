import { Avatar, IconButton} from '@material-ui/core';
import { MoreVert, AttachFile, SearchOutlined, InsertEmoticon } from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic"
import React, { useEffect, useState } from 'react';
import "./Chat.css";
import axios from "./axios";
import {useParams} from "react-router-dom";
import { useStateValue } from './StateProvider';

function Chat({New, messages, groups}) {
    const {Key} = useParams();
    const [input, setInput] = useState('');
    const [{user}, dispatch] = useStateValue();
    const [seed, setSeed] = useState('');
    const group = groups.filter(group => group._id === Key);
    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    },[]);

    const sendMessage =  async( e ) => {
      e.preventDefault();
      const a = new Date().toUTCString();
     await axios.post('/messages/new',{
        "message": input,
        "name": user.displayName,
        "timeStamp" : a,
        "Sala": ""+group[0]._id,
      });
      setInput("");
    };
    
    return !New ? (<div 
    className = "chat">
        <div className='chat_header'>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
          <div className='chat_headerInfo'>
            <h3>{group[0].tema}</h3>
            <p>{group[0].idioma +" "+ group[0].nivel} </p>
          </div>
          <div className='chat_headerRight'>
            <IconButton>
              <SearchOutlined/>
            </IconButton>
            <IconButton>
              <AttachFile/>
            </IconButton>
            <IconButton>
              <MoreVert/>
            </IconButton>
          </div>
        </div>
        <div className='chat_body'>
          {messages.filter(message => message.Sala === Key).map((message) => (
            <p 
            className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
            <span className = "chat_name">{message?.name}</span>
            {message?.message}
            <span className = "chat_timestamp">{message?.timeStamp}</span>
            </p>
          ))}
       </div>
            <div className = 'chat_footer'>
            <InsertEmoticon />
            <form>
              <input value={input} onChange = {e => setInput(e.target.value)}placeholder='type a message' type = "text" />
              <button onClick={sendMessage} type = 'submit'>Send message</button>
            </form>
            <MicIcon />
            </div>     
      </div>):(
<div 
    className = "chat">
        <div className='chat_header'>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
          <div className='chat_headerInfo'>
            <h3>tema novo grupo</h3>
            <p>idioma do novo grupo </p>
          </div>
          <div className='chat_headerRight'>
            <IconButton>
              <SearchOutlined/>
            </IconButton>
            <IconButton>
              <AttachFile/>
            </IconButton>
            <IconButton>
              <MoreVert/>
            </IconButton>
          </div>
        </div>
        <div className='chat_body'>
        </div>
     <div className = 'chat_footer'>
     <InsertEmoticon />
      <form>
     <input value={input} onChange = {e => setInput(e.target.value)}placeholder='type a message' type = "text" />
     <button onClick={sendMessage} type = 'submit'>Send message</button>
     </form>
 <MicIcon />
 </div>  
 </div>
      );
  };

export default Chat