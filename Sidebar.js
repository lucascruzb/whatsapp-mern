import "./Sidebar.css";
import ChatIcon from '@mui/icons-material/Chat';
import {Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import SidebarChat from './SidebarChat'
import { useStateValue } from './StateProvider';

function Sidebar({groups}) {

  const [ {user}, dispatch] = useStateValue();

  return (<div 
  className = "sidebar">
      <div className = "sidebar_header">
          <Avatar src = {user?.photoURL}/>
         <div className = "sidebar_headerRight">
           <IconButton>
            <ChatIcon />
          </IconButton>
           <IconButton>
            <MoreVertIcon />
          </IconButton>
          </div>
      </div>

     <div className = "sidebar_search">
        <div className = "sidebar_searchContainer">
         <SearchOutlined />
         <input placeholder = "Search or start new chat " type= "text" />
       </div>
     </div>
     <div className= 'sidebar_chats'>
         <SidebarChat addNewChat/>
         {groups.map((group) => (
         <SidebarChat Key={group._id} tema={group.tema} idioma ={group.idioma} nivel={group.nivel}/>
          ))}
     </div>
    </div>
    );
}

export default Sidebar;