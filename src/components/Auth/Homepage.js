import React from "react";
import style from "styled-components";

const Homepage = () => {
  return (
    <div>
      <Contaner>
        <Box>
          <div>hello world </div>
          <button>click</button>
        </Box>
      </Contaner>
    </div>
  );
};

export default Homepage;

// const Contaner = style.div``;
//  const Contaner = style.div``;

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
