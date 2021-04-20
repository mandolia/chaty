import styled from 'styled-components';

export const AuthInputContainer = styled.div`
position:relative;
display:flex;
flex-direction:column;
margin-top:15px;

span{
  position:absolute;
  left:5px;
  top:-2px;
}`;

export const Container = styled.div`
position:relative;
width:100%;
height:40px;
display:flex;
flex-direction:column;
#label{
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 25px;
  letter-spacing: 1.29412px;
  color: #000000;
  margin:0;
  margin-bottom:3px;
}
span{
  position:absolute;
  top:12px;
  margin-left:10px;
}
`;

export const ChatContainer = styled.div`
display:flex;
flex-direction:row;
position:relative;
align-items:center;
width:720px;
input{
  width:100%;
  border: 1px solid #53A8CB;
  box-sizing: border-box;
  border-radius: 4px;
  height:50px;
}
ul{
  position:absolute;
  right:0px;
  padding:0;
  margin:0;
  img{
    margin-right:15px;
  }
}
`;

export const Input = styled.input.attrs((props) => ({
  type: props.type,
}))`
    width: 200px;
    height:100%;
    font-family:Roboto;
    font-weight:400;
    position:relative;
    font-size: 15px;
    padding: 8px;
    border-radius: 5px;
    border:1px solid #47525D;
    background-color:transparent;
    padding-left:25px;
    color:#53A8CB;
    box-sizing:border-box;
    :focus{
      outline: none !important;
      border:1px solid #53A8CB;    
    }
    ::placeholder{
      color:#000;
    }
   
   
  `;

export const SelectContainer = styled.div`
position:relative;
display:flex;
flex-direction:column;
#label{
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 25px;
  letter-spacing: 1.29412px;
  color: #000000;
  margin:0;
  margin-bottom:3px;
  margin:0;
  margin-bottom:3px;
}


`;

export const ProfilInput = styled.input.attrs((props) => ({
  type: props.type,
}))`
 
    width: 100%;
    width: -moz-available;
    font-family: Helvetica;
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 25px;
    letter-spacing: 1.29412px;
    color:#4A4A4A;
    width: -webkit-fill-available;
    padding: 8px;
     border:none;
     border-bottom:2px solid #4A4A4A;
     ::placeholder{
     
       color:#4A4A4A;
     }
    
  `;

export const AuthInput = styled.input.attrs((props) => ({
  type: props.type,
}))`
   
      width: 100%;
      font-size: 15px;
      width: -moz-available;
      width: -webkit-fill-available;
      color: #fff;
      background-color:transparent;
      padding-bottom:22px;
      padding-left:40px;
      border:none;
      border-bottom:2px solid #fff;
       ::placeholder{
         color:#fff;
         font-family:Roboto;
         font-size:16px;
         font-weight:400;
       }
      
    `;

export const AuthButton = styled.button`
display:flex;
width:125px;
height:125px;
background-color:${({ color }) => color};
margin:0 auto;
border:${({ borderColor }) => `2px solid ${borderColor}`};
box-sizing: border-box;
border-radius: 10px;
margin-bottom:10 clearMessages(roomMetadata)px;
cursor:pointer;
img{
  margin: auto;
  z-index:1000;
}
`;

export const ChatButton = styled.div`
button{

display:flex;
flex-direction:row;
align-items:center;
justify-content:start;
width: 260px;
height: 50px;
border-radius:5px;
background-color:${({ color }) => color};
border:${({ borderColor }) => `1px solid ${borderColor}`};
color:${({ textColor }) => textColor};
.Icon{
  width:24px;
  height:24px;
  margin:0;
  margin-right:15px;
  margin-left:15px;
}
}
`;

export const AuthButtonContainer = styled.div`
text-align:center;
span{
  color:${({ titleColor }) => titleColor};
  font-size:40px;
  font-weight:400;
  font-family:Roboto;
}
`;
