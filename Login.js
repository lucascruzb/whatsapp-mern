import { Button } from '@mui/material';
import React from 'react'
import "./Login.css";
import {auth , provider} from "./firebase"
import { signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { actionType } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
    
    const [{ },dispatch] = useStateValue();

    const singIn = () =>{
        signInWithPopup(auth, provider).then((result) => {
         dispatch({
             type : actionType.SET_USER,
             user : result.user,
         });
         const credential = GoogleAuthProvider.credentialFromResult(result);
         const token = credential.accessToken;
         const user = result.user;
         console.log(result);
     }).catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     const email = error.email;
     const credential = GoogleAuthProvider.credentialFromError(error);
  });
    };
  return (
    <div className = 'login'>
        <div className = 'login_container'>
            <img 
                src = 'https://images.vexels.com/media/users/3/136340/isolated/lists/74ac661d8216442ae469efb39c9584dc-icone-de-mensagem-de-correio.png'
                alt=''
            />
         <div className='login_text'>
              <h1>login no unipampeando</h1>
         </div>
         <Button onClick={singIn}>
            Sing in with Google
         </Button>
         </div>
        </div>
  )
}
export default Login