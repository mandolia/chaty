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


>div{
    margin: auto;
    height:340px;
    width:500px;
    display:flex;
    text-align:center;
    flex-direction:column;
    justify-content:space-between;
    span{
        font-size:20px;
        font-weight:500;
        font-family:Roboto;
        color:#fff;
    }
    >div{
        width:100%;
    }
    #cancel{
        margin-top:20px;
        background-color:transparent;
        color:#fff;
    }
}

`;

export const ButtonContainer = styled.div`

display:flex;
flex-direction:column;
margin:0 auto;

button{
    background-color:#fff;
    width:100%;
    height:50px;
    border-color:#53A8CB;
    color:#53A8CB;
}

`;
