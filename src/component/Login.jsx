import React, { useEffect } from "react";

import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { json, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../clint";
const Login = () => {
  const navigate = useNavigate();
  const handleGoogleRespnse = (response) => {
    console.log(response);
    const googleId = response.clientId;

    let userObject = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(userObject));
    const { name, picture: imageUrl } = userObject;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });

    console.log(userObject);
  };

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        "643734708513-jsokkjju0skbqk0r7el0rb4cgb0v7gff.apps.googleusercontent.com",
      callback: handleGoogleRespnse,
    });

    google.accounts.id.renderButton(document.getElementById("SignIn"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative h-full w-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center bg-blackOverlay top-0 left-0 bottom-0 right-0">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl" id="SignIn">
            {/* <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => {
                return (
                  <button
                    type="button"
                    className="px-4 py-3 bg-mainColor flex justify-center items-center rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4 w-6 h-6" />
                    Sign In with Google{" "}
                  </button>
                );
              }}
              onSuccess={responceGoogle}
              onFailure={responceGoogle}
            /> */}
            {/* ===========================================================          
            <GoogleLogin
              onSuccess={responceGoogle}
              onFailure={responceGoogle}
              render={(renderProps) => {
                return (
                  <button
                    type="button"
                    className="px-4 py-3 bg-mainColor flex justify-center items-center rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4 w-6 h-6" />
                    Sign In with Google{" "}
                  </button>
                );
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
