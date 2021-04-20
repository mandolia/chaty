import styled from 'styled-components';

export const Wrapper = styled.div`
width:100%;
height:100%;
text-align:center;
display:flex;
flex-direction:column;
justify-content:space-evenly;
overflow:auto;
position:relative;
overflow-style: none;  
scrollbar-width: none;
-ms-overflow-style:none;
::-webkit-scrollbar {
    display: none;
}
border-radius:5px;


#screenShare{
    display:${({ display }) => display ? 'block' : 'none'};

    .videoInsert {
        position: absolute; 
        right: 0; 
        bottom: 0;
        min-width: 100%; 
        min-height: 100%;
        width: auto; 
        height: auto; 
        background-size: cover;
        overflow: hidden;
    }

    #profil{
        margin: 0 auto;
        width:408px;
        height:308px;
        border-radius: 10px;
    }

    h1{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 34px;
        line-height: 40px;
        color:#fff;
        margin-bottom:0;
    }
    h2{
        font-family: Avenir Next;
        font-style: normal;
        font-weight: 275;
        font-size: 50px;
        line-height: 68px;
        margin-top:12px;
        color:#fff;
    }
 

}
#bottom{
    width:100%;
    height:150px;
    display:${({ display }) => display ? 'flex' : 'none'};
    position:absolute;
    bottom:0;
    justify-content:center;
    align-items:center;
    img{
        width:45px;
        height:45px;
        cursor:pointer;
        margin:0px 20px;
    }
    button{
        opacity:1;
        margin:0 20px;
        color:#000;
        background-color:#fff;
        border:none;
        opacity:1;
        border-radius: 126.126px;
    }
}
    
}



 #requestStep{
    display:${({ display }) => display ? 'none' : 'flex'};
    width:60%;
    height:100%;
    margin:0 auto;
    flex-direction:column;
    justify-content:space-evenly;
     
    #profil{
        margin: 0 auto;
        width:408px;
        height:308px;
        border-radius: 10px;
    }
    
        button{
            width:200px;
            height:50px;
            background-color:#fff;
            border-radius:5px;
        }
        button:nth-of-type(2) {
           border:1px solid red;
           color:red;
         }
         button:nth-of-type(1) {
            border:1px solid green;
            color:green;
          }
    }
}
`;

