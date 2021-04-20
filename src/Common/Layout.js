import styled from 'styled-components';
export const Container = styled.div`
max-width: 1440px;
margin: 0 auto;
width: 100%;
overflow-style: none;  
scrollbar-width: none;
-ms-overflow-style:none;
::-webkit-scrollbar {
    display: none;
}
`;

export const Wrapper = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-between;
background-color:#E5E5E5;
overflow-style: none;  
scrollbar-width: none;
-ms-overflow-style:none;
::-webkit-scrollbar {
    display: none;
}
`;

export const LandingLayoutWrapper = styled.div`
height: 100%;
background-color:#E5E5E5;
`;
