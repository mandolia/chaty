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

ul{
    width:auto;
    height:33px;
    list-style:none;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    padding:0;
    margin:0;
    a{
        font-size:16px;
        line-height:32.78px;
        font-weight:600;
        text-decoration:none;
        color:#164664;
        margin:0px 20px;
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
