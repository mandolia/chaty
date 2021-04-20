import styled from 'styled-components';

export const AuthWrapper = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
`;

export const LeftContainer = styled.div`
width:50%;
background-color:#F8F8F8;
display:flex;
height:100vh;
img{
    margin:auto;
    width:285px;
    height:301.01px;
}
`;

export const Formcontainer = styled.div`
width:50%;
height:100vh;
background-color:#53A8CB;
display:flex;


#container{
    width:auto;
    margin:auto;
    height:370px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
}

span{
    font-size:20px;
    font-weight:500;
    font-family:Roboto;
    color:#fff;
}
h1{
    text-align:left;
    font-size:34px;
    font-weight:700;
    color:#fff;
    font-family:Roboto;
    width:auto;
    height:40px;
    margin:0;
}
form{
    width:auto;
    display:flex;
    flex-direction:column;
    height:225px;
    justify-content:space-between;
    margin:0 auto;
    input{
        width:400px;
        box-sizing: border-box;
        :focus{
            outline:none;
        }
    }
    button{
        background-color:#fff;
        width:400px;
        height:50px;
        border-color:#53A8CB;
        color:#53A8CB;
        box-sizing: border-box;
    }
    a{
        text-align:right;
        text-decoration:none;
         font-weight:400;
         color:#fff;
         font-family:Roboto;
    }
  
}
`;
