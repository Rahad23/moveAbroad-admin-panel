import { useForm } from "react-hook-form";
import "./Login_Registration_Css/Login_Registration.css";
import bcrypt from 'bcryptjs';
import axios from "axios";
// import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";

const Login=()=>{
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [admin, setAdmin] = useState([]);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();


    const onSubmit = data => {
        const email = data?.email;
        const password = data?.password;
        admin.map(adminData=>
            bcrypt.compare(password, adminData?.password, function(err, isMatch) {
                if(adminData?.email !== email){
                   return toast.error("Email is incorrect!")
                }
                if (err) {
                  console.error(err);
                } else {
                  if (isMatch) {
                        toast.success("login successfully")
                        navigate("/")
                        reset();
                  } else {
                    toast.error("Password is incorrect!");
                  }
                }
              })

            )
    };
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/admin`)
        .then(response => {
          setLoader(false);
          setAdmin(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },[])
    return <>
  <div className="hero min-h-screen bg-white bg-Img">
    <div className="setOpacity"></div>
<div className="hero-content flex justify-between">
<div className="card w-[450px] shadow-md bg-white border-[1px] border-[#ddd]">
<div className="card-body">
<form onSubmit={handleSubmit(onSubmit)}>
<div className="form-control">
    <label className="label">
      <span className="label-text">Email</span>
    </label>
    <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered bg-white" />
    {
    errors.email && <span className="text-red-700">This field is required</span>
    }
  </div>
  <div className="form-control">
    <label className="label">
      <span className="label-text">Password</span>
    </label>
    <input {...register("password", { required: true })} type="password" placeholder="password" className="input input-bordered bg-white" />
    {
    errors.password && <span className="text-red-700">This field is required</span>
    }
    <div className="flex justify-between">
    <label className="label">
      <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
    </label>
    </div>
  </div>
  <div className="form-control mt-6">
    <button className="btn btn-primary bg-[#274396] border-none">Login</button>
  </div>
</form>
</div>
</div>
</div>
</div>
  </>
}

export default Login;