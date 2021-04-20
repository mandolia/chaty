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

export const CardContainer = styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;
font-family:Roboto;
justify-content:start;
cursor:pointer;
.profil{
  width:360px;
  height:195px;
}


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
    background: #FFFFFF;
    box-shadow: 0px 0px 4px rgba(148, 148, 148, 0.25);
    border-radius: 4px;
    z-index: 1000;
    position: absolute;
    top: 100%;
    li{
      border-bottom:2px solid #000;
      display:flex;
      flex-direction:row;
      padding:15px 5px;
      align-items:center;
      justify-content:center;
      text-align:center;
      font-size:12px;
      font-weight:400;
      font-family:Roboto;
      color: #FB5051;
      :first-child{
        color: #53A8CB;
      }
      img{
        width:20px;
        height:20px;
      }
    }
    #addAdmin{
      color:#000;
    }
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
