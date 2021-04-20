import styled from 'styled-components';

export const Wrapper = styled.div`
width:360px;
height:245px;
padding:10.2px;
position:relative;
background-color:#ffffff;
display:flex;
box-shadow: 0px 0px 5px rgba(126, 126, 126, 0.5);
border-radius: 4px;
font-family:Roboto;
}
`;

export const CardTemModel = styled.div`
width:400px;
height:240px;
background-color:#fff;
`;

export const Description = styled.div`
width:100%;
display:flex;
position:relative;
flex-direction:row;
font-family:Roboto;
justify-content:space-between;
margin:auto;
`;

export const CardContainer = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;
font-family:Roboto;
justify-content:start;
.profil{
  cursor:pointer;
  width:360px;
  height:195px;
}
`;

export const IconContainer = styled.div`
width:auto;
display:flex;
flex-direction:row;
justify-content:end;
align-items:center;
img{
  cursor:pointer;
  margin:0 5px;
  width:24px;
  height:24px;
}
>div{
  display:flex;
  flex-direction:column;
  margin:0 5px;
  height:100%;
  justify-content:space-evenly;
}
ul{
    padding: 0;
    width:100px;
    list-style:none;
    margin: 0;
    background: #fff;
    z-index: 1000;
    position: absolute;
    top: 100%;
    li{
      border-bottom:2px solid #000;
      padding:15px 20px;
      text-align:center;
      font-size:12px;
      font-weight:400;
      font-family:Roboto;
    }
  
}

#time{
  width: 93px;
  height: 40px;
  background: #F8F8F8;
  border: 1px solid #53A8CB;
  box-sizing: border-box;
  border-radius: 4px;
  font-family:Roboto;
  font-weight:400;
  font-size:16px;
  text-align:center;
}

`;
export const PersonalInfo = styled.div`
width:auto;
max-width:50%;
margin-right:2px;
h1 {
   
    margin-bottom:5px;
    font-style: normal;
    font-family:Roboto;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 1.29412px; 

}
span{
    font-style: normal;
    font-weight: 400;
    font-family:Roboto;
    font-size: 14px;
    line-height: 16px;
    color: #737373;
}
`;

export const ButtonContainer = styled.div`
display: flex;
justify-content: space-between;
.red{
width: 115px;
height: 40px;
background: #FB5051;
border-radius: 4px;
border:none;
cursor:pointer;
}
.green{
width: 115px;
height: 40px;
background: #38D744;
border-radius: 4px;
border:none;
cursor:pointer;
}
.otp{
  width: 255px;
  margin: 0 auto;
height: 40px;
background: #38D744;
border-radius: 4px;
border:none;
cursor:pointer;
}
`;

export const CardWrapper = styled.div`
width:75%;
height:100%;
margin:0 auto ;
text-align:center;
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-evenly;
h1{
font-size:20px;
font-weight:700;
font-family:Roboto;
line-height:1.6;
color:#000;
}
span{
  font-size:16px;
  font-weight:400;
  color:#4A4A4A;
  font-family:Roboto;
}
button{
  background-color:#53A8CB;
  border:none;
  font-family:Roboto;
  color:#fff;
}

`;
