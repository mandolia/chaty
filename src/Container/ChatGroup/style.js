import styled from 'styled-components';

export const Wrapper = styled.div`
height:100%;
overflow:auto;

`;

export const SearchBar = styled.div`
width:100%;
display:flex;
justify-content:space-between;
`;

export const GroupBar = styled.div`
display:flex;
flex-direction:row;
position:relative;
margin-bottom:20px;

input{
    background-color:#fff;
    border:2px solid #53A8CB;
    position:relative;
}
form,div{
    margin-left:10px;
}

img{
    cursor:pointer;
}
`;

export const ButtonContainer = styled.div`
display:flex;
flex-direction:row;
position:absolute;
right:0;
top:0;
button{
    width:76px;
    font-family:Roboto;
    font-weight:400;
    height:43px;
    background-color:#53A8CB;
    border:none;
    border-radius:5px;
    color:#fff;
    cursor:pointer;
    margin-left:20px;
    :first-child{
        width:130px;
    }
}
`;
