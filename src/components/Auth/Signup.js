import React, { useState } from "react";
import style from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState("");

  const formSchema = yup.object().shape({
    name: yup.string().required("this field cant be empty"),
    email: yup.string().required("this field cant be empty"),
    password: yup.string().required("this field cant be empty"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);
    setAvatar(file);
  };
  const onSubmit = handleSubmit(async (value) => {
    console.log(value);
    const { name, email, password } = value;
    const local = "http://localhost:1101";
    const url = `${local}/api/create`;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    const config = {
      "content-type": "multipart/form-data",
      onUploadprogress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        const percent = Math.floor((loaded * 100) / total);
        console.log(percent);
      },
    };

    await axios.post(url, formData, config).then((res) => {
      console.log("error data:", res);
    });
    navigate("/signin");
  });

  return (
    <div>
      <Contaner>
        <Box onSubmit={onSubmit} type="multipart/form-data">
          <ImageHolder>
            <Image src={image} />
            <Label htmlFor="pix"> </Label>
            <Input
              id="pix"
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
          </ImageHolder>
          <Holder>
            <div>{errors?.message && errors?.message.name}</div>
            <input placeholder="username" {...register("name")} />
          </Holder>
          <Holder>
            <div>{errors.message && errors?.message.email}</div>
            <input placeholder="email" {...register("email")} />
          </Holder>
          <Holder>
            <div>{errors.message && errors?.message.password}</div>
            <input placeholder="password" {...register("password")} />
          </Holder>

          <Button type="submit">enter</Button>
          <Link to="signin">login</Link>
        </Box>
      </Contaner>
    </div>
  );
};

export default Signup;

// const Contaner = style.div``;
//  const Contaner = style.div``;
//  const Contaner = style.div``;
const Label = style.label`
padding:5px 20px;
background-color:silver;
:hover{
  cursor:pointer;
  transform:scale(1)
}
`;
const Input = style.input`
display:none;
`;
const Image = style.img`
margin-bottom:10px;
height:50px;
width:50px;
border-radius:50%;
background-color:silver;
object-fit:contain;
`;
const ImageHolder = style.div`
height:100px;
width:200px;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
padding:20px;
`;
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
height:500px;
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
