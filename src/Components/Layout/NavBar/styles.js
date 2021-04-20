import styled from 'styled-components';

export const Wrapper = styled.div`
display:flex;
flex-direction:row;
font-family:Roboto;
margin-bottom:20px;
justify-content:space-between;
background-color:#fff;
height:80px;
max-height:80px;
align-items:center;
background-color:#fff;
box-shadow: 0px -4px 8px rgba(151, 151, 151, 0.2);
`;

export const NavBar = styled.ul`
display:flex;
list-style: none;
flex-direction:row;
margin:0;
padding:0;
align-items:center;
height:80px;
font-family:Roboto;
a{
    text-decoration:none;
    color:#47525D;
    font-family:Roboto;
    font-weight:400;
    width:auto;
    height:100%;
    margin-right:24px;
}
li{
    display:flex;
    flex-direction:column;
    cursor:pointer;
    height:100%;
    justify-content:flex-start;
    width:auto;
    align-items:center;
    img{
        width:34px;
        margin-top:10px;
        margin-bottom:10px;
        border-radius:50%;
    }
    :nth-child(2){
       img{ 
           background-color:#ffffff;
    }
}
    :nth-child(5){
        background-color:#53A8CB;
        width:80px;
        a{
            display:flex;
            margin:auto;
        img{
            margin:auto;
            width:34px;
            height:34px;
        }
    }
    }
    span{
        font-family: Roboto;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        margin-bottom:10px;
       
    }
}
`;

export const Logo = styled.div`
margin-left:20px;
img{
    width:60px;
    height:60px;
}
`;
