import styled from 'styled-components';

const BodyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow-style: none;  
  scrollbar-width: none;
  -ms-overflow-style:none;
  
   ::-webkit-scrollbar {
    display: none;
}
`;

export default BodyContainer;