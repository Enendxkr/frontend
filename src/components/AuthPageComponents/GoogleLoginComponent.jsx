import React, { useState } from 'react';
import google from "../../assets/google.png";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from "@react-oauth/google";
import classes from "./GoogleLoginComponent.module.css"
import { motion } from 'framer-motion';
import { socialLoginService } from '../../api/AuthService';
import { useNavigate } from "react-router-dom";
import Loading from '../LayoutComponents/Loading';

const GOOGLE_USERINFO_REQUEST_URL = import.meta.env.VITE_GOOGLE_USERINFO_REQUEST_URL;

const GoogleLoginButton = () => {

  const navigate = useNavigate();
  const [isLogin,setIsLogin] = useState(false);
  
  const signIn = useGoogleLogin({
      onSuccess: async (res) => { 
          setIsLogin(true);
          const token = res.access_token;
          try {
            const res = await axios.get(GOOGLE_USERINFO_REQUEST_URL, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const responserData = await res.data;
            const socialLoginData = await socialLoginService({
              userId : `google_${responserData.id}`,
              name : responserData.name,
              email : responserData.email
            });
            if (socialLoginData.success){
              const tokenData = socialLoginData.data;
              const accessToken = tokenData.accessToken;
              const refreshToken = tokenData.refreshToken;
  
              sessionStorage.setItem('accessToken',accessToken);
              sessionStorage.setItem('refreshToken',refreshToken);
              navigate('/')
            }
          } catch (error) {
             console.log(error);
          }finally{
             setIsLogin(false);
          }
      },
      onError: (error) =>{ console.log(error);}
  });

  return (
      <>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signIn()}>
            <img className={classes.icon} src={google} alt="Login with Google"/>
        </motion.div>
        {isLogin && <Loading/>}
      </>
    
  );
};

const GoogleLoginComponent = () => {

  return (
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
      <GoogleLoginButton/>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
