import React from "react";
import style from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser } from "../Global/global";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    email: yup.string().email().required("this field must not be empty"),
    password: yup.string().min(3).required("this feild must not be empty"),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const onSubmit = handleSubmit(async (value) => {
    console.log(value);
    const { email, password } = value;
    const local = "http://localhost:1101";
    const url = `${local}/api/signin`;
    await axios.post(url, { email, password }).then((res) => {
      console.log("this is the data", res);
      dispatch(createUser(res.data.data));
    });
    navigate("/home");
  });
  return (
    <div>
      <Contaner>
        <Box onSubmit={onSubmit}>
          <Holder>
            {/* <div>{errors.message && errors?.message.email}</div> */}
            <input placeholder="email" {...register("email")} />
          </Holder>
          <Holder>
            <input placeholder="password" {...register("password")} />
          </Holder>
          <Button type="submit">enter</Button>
          <Link to="/">signup</Link>
        </Box>
      </Contaner>
    </div>
  );
};

export default Signin;

// const Contaner = style.div``;
//  const Contaner = style.div``;
const Button = style.button`
// padding:10px 40px;
color white;
background-color:orange;
width: 250px;
height: 35px;
margin: 20px;
border: none;
border-radius: 5px;
cursor:pointer;
font-weight: bold;

`;
const Holder = style.div`
margin:20px;

input{
  width: 200px;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid grey;
  outline: none;
}

`;
const Box = style.form`
width:300px;
height:400px;
border:1px solid grey;
display:flex;
flex-direction:column;
align-items: center;
margin: 20px;

`;
const Contaner = style.div`
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:center;

`;
