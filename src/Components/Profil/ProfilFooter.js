import React, { useState } from 'react';
import { FooterProfil } from './style';
import FooterButton from '../UI/FooterButton';
import Model from '../Model';
import Condition from './Condition';
import Contact from './Contact';
import AboutUs from './AboutUs';

const ProfilFooter = () => {
  const [open, setOpen] = useState(false);
  const [modelName, setModelName] = useState(0);

  const handleShowMessageClick = (i) => {
    setModelName(i);
    setOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const handleCloseModal = () => setOpen(false) && setModelName(0);
  document.body.style.overflow = 'scroll';

  const handleModel = () => {
    switch (modelName) {
      case 1:
        return <Condition setOpen={setOpen} />;
      case 2:
        return <Condition setOpen={setOpen} />;
      case 3:
        return <Contact setOpen={setOpen} />;
      case 4:
        return <AboutUs setOpen={setOpen} />;
      default: return null;
    }
  };

  return (
    <>
      <Model
        onClose={handleCloseModal}
        open={open}
      >
        {handleModel()}
      </Model>
      <FooterProfil>
        <FooterButton onClick={() => handleShowMessageClick(1)}>Invite</FooterButton>
        <FooterButton onClick={() => handleShowMessageClick(2)}>Terms & Conditions</FooterButton>
        <FooterButton onClick={() => handleShowMessageClick(3)}> Contact us </FooterButton>
        <FooterButton onClick={() => handleShowMessageClick(4)}>About Us </FooterButton>
      </FooterProfil>
    </>
  );
};

export default ProfilFooter;
