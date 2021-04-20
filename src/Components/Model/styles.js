import styled from 'styled-components';

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Modal = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 4px rgba(209, 222, 242, 0.5);
  border-radius: 4px;
  width: auto;
  max-width:1150px;
  padding:0px 10px;
  z-index: 9999;
 
`;
