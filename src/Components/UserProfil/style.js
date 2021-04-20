import styled from 'styled-components';

export const Wrapper = styled.div`
height:350px;
width:1150px;
max-width:1150px;
display:flex;
background-color:#fff;
 
`;

export const Hero = styled.div`
justify-content:space-evenly;
display:flex;
flex-direction:row;
position:relative;
height:203px;
width:100%;
margin:auto;

#file{
    width:220px;
    height:220px;
    position:absolute;
    left:20px;
    z-index:9999;
    cursor:pointer;
    opacity:0;
}
img{
    left:20px;
    width:220px;
    height:220px;
    position:absolute;
    border-radius:50%;
}

h1{
    width:220px;
    left: 0;
    position: absolute;
    top: 30%;
}
`;

export const ButtonContainer = styled.div`
width:550px;
display:flex;
flex-direction:row;
margin-top:20px;
justify-content:space-between;
button{
    width:270px;
    color:#4A4A4A;
    border-color:#979797;
}
`;

export const InputInfo = styled.div`
width:75%;
height:225px;
display:flex;
flex-direction:column;
position:absolute;
right:20px;
div{
    height:auto;
}

#ProfilInfo{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin-bottom:20px;
    div{
        width:45%;
    }
}`;
