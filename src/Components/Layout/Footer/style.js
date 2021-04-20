import styled from 'styled-components';

export const Wrapper = styled.div`
align-items:center;
display:flex;
height:100px;
max-height:100px;
background-color:#fff;
flex-direction:row;
box-shadow: 0px -4px 8px rgba(151, 151, 151, 0.2);
img{
    width:150px;
    margin-left:-10px;
}
margin-top:20px;

`;

export const Details = styled.div`
display:flex;
flex-direction:column;
align-items:center;
height:100%;
justify-content:space-evenly;
width:auto;
margin:0 auto;
ul{
margin:0;
padding:0;
display:flex;
font-family:Roboto;
font-weight:400;
list-style: none;
flex-direction:row;

li{
    margin:0 10px;
}
}

`;
