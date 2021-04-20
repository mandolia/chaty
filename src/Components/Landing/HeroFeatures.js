import React from "react";
import { HeroCard } from "./styles";

const HeroFeature = ({ icon, title, paragraph }) => {
  return (
    <HeroCard>
      <img src={icon} alt="icon" />
      <h1>{title}</h1>
      <p>{paragraph}</p>
    </HeroCard>
  );
};

export default HeroFeature;
