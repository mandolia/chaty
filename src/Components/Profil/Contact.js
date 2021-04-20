import React from 'react';
import ProfilButton from '../UI/ProfilButton';
import * as Style from './style';
import ProfilInput from '../UI/ProfilInput';

const Contact = ({ setOpen }) => (
  <>
    <Style.ContactContainer>
      <h1>Contact Us</h1>
      <ProfilInput label="Name" placeholder="Enter Name" />
      <ProfilInput label="Email" placeholder="Enter Email" />
      <ProfilInput label="Number" placeholder="Enter Number" />
      <ProfilInput label="Query" placeholder="Write your Query" />
      <ProfilButton id="green">Send</ProfilButton>
      <ProfilButton onClick={() => setOpen(false)}>Close</ProfilButton>
    </Style.ContactContainer>
  </>
);

export default Contact;
