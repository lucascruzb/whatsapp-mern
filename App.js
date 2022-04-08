import React, { useEffect, useState} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from "pusher-js";
import axios from "./axios";
import { BrowserRouter  as Router , Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from './StateProvider';

function App() {

  const [groups , setGroups] = useState([]);
  const [messages , setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();
  
  useEffect(()=>{
      axios.get('/messages/sync').then(response =>{
        setMessages(response.data);
      })
  },[]);

  useEffect (()=>{
    const pusher = new Pusher('69f980a392be4715aa2b', {
      cluster: 'us2'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };
  },[messages]);

  useEffect(()=>{
    axios.get('/group/sync').then(response =>{
      setGroups(response.data);
    })
},[]);

useEffect (()=>{
  const pusher = new Pusher('69f980a392be4715aa2b', {
    cluster: 'us2'
  });

  const channel = pusher.subscribe('group');
  channel.bind('inserted', function(newGroup) {
    alert(JSON.stringify(newGroup));
    setMessages([...groups, newGroup])
  });

  return ()=>{
    channel.unbind_all();
    channel.unsubscribe();
  };
},[groups]);

  // console.log(user);
  // console.log(groups);
  //console.log(messages);

  return (
    <div className="app">
      { !user ? (
        <Login />
      ):(
      <div className = "app_body">
      <Router >
       <Sidebar groups={groups} />
        <Switch>
         <Route path = "/groups/:Key">
         <Chat messages={messages} groups={groups}/>
         </Route>
          <Route path ="/">
          <Chat New groups={groups} />
          </Route>
        </Switch>
      </Router>
    </div>
  )}    
  </div>
  );
}

export default App;
