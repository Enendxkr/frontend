import React from "react";
import classes from "./AuthContainer.module.css";
import SignupInput from "./SignupInput";
import { signupService } from "../../api/AuthService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupContainer = () => {
    
    const navigate = useNavigate();

    const signupSubmitHandler = async (formData) => {
        const signupResponseData = await signupService(formData);
        if (signupResponseData.success){
            const tokenData = signupResponseData.data;
            const accessToken = tokenData.accessToken;
            const refreshToken = tokenData.refreshToken;

            sessionStorage.setItem('accessToken',accessToken);
            sessionStorage.setItem('refreshToken',refreshToken);
            
            toast.success("회원가입에 성공하셨습니다.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/')
        }else{
            const message = signupResponseData.message;
            toast.error(`${message}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <React.Fragment>
            <div className={classes.auth_wrapper}>
                <SignupInput signupSubmitHandler={signupSubmitHandler}/>
            </div>
        </React.Fragment>
    );
};

export default SignupContainer;
