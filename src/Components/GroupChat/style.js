import styled from 'styled-components';

export const AddCardContainer = styled.div`
width:360px;
position:relative;
height:245px;
background-color:#ffffff;
display:flex;
flex-direction:column;
padding:10px;
justify-content:space-between;
box-shadow: 0px 0px 5px rgba(126, 126, 126, 0.5);
border-radius: 4px;
font-size:10px;
font-family:Roboto;
font-weight:400;
text-align:center;
div{
    width:100%;
    background-color:#F8F8F8;
    height:195px;
    display:flex;
}
img{
    width:90px;
    height:90px;
    cursor:pointer;
    margin:auto;
  
}
`;

export const CardLayout = styled.div`
display: grid;
grid-template-columns:380px 380px 380px;
grid-template-rows: auto auto auto;
column-gap:30px;
row-gap:30px;
margin-top:20px;
`;
