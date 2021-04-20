import styled from 'styled-components';

export const Wrapper = styled.div`
display:flex;
width:100%;
height:100%;
flex-direction:row;
justify-content:space-between;
overflow-style: none;  
scrollbar-width: none;
-ms-overflow-style:none;
::-webkit-scrollbar {
    display: none;
}
`;



export const LeftContainer = styled.div`
width:260px;
padding:20px;
margin:10px;
margin-left:0px;
background-color:#fff;
box-shadow: 0px 0px 4px rgba(209, 222, 242, 0.5);
border-radius: 10px;
height:100vh;
max-height:766px;
img{
    width:24px;
    height:24px;
    margin:auto;
}
#button{
    margin-top:180px;
}
input{
    ::placeholder{
        color:#000 !important;
    }
    color:#000;
    margin-left: auto;
    border-color:#C4C4C4;
    padding:10px;
    box-sizing:border-box;
    width:85%;
   
}
span{
    left:3px;
    top:10px;
    width:30px;
    height:30px;
}

#image{
    margin:auto;
    width:260px;
    height:260px;
    display:flex;
    border: 2px solid #F8F8F8;
    box-shadow: 0px 0px 4px rgba(209, 222, 242, 0.5);
    box-sizing: border-box;
    border-radius: 5px;
    img{
        width:230px;
        height:230px;
        margin:auto;
        border-radius:4px;
     
    }
}


button{
    width:100%;
    margin-bottom:20px;
    cursor:pointer;
    margin-top:15px;
}

button:nth-of-type(3) {
   margin-bottom:40px;

}

`;

export const RightContainer = styled.div`
width:890px;
height:100vh;
max-height:804px;
margin:10px 0px;
margin-left:10px;
background-color:#fff;
box-shadow: 0px 0px 4px rgba(209, 222, 242, 0.5);
border-radius: 10px;
background:${({ backgroundColor }) => (backgroundColor ? '#fff' : 'linear-gradient(180deg, #F08835 0%, #FF7271 100%)')};
`;
