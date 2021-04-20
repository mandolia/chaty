import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Style from "./styles";
import DeviceButton from "../UI/DeviceButton";
import HeroFeatures from "./HeroFeatures";
import Pic1 from "../../Illustration/LandingPage/chat.svg";
import Pic2 from "../../Illustration/LandingPage/groupchat.svg";
import Pic3 from "../../Illustration/LandingPage/temporarychat.svg";
import Pic4 from "../../Illustration/LandingPage/videocall.svg";
import Pic5 from "../../Illustration/LandingPage/audiocall.svg";
import Logo from "../../Illustration/hichatylogo.svg";
import videocall from "../../Illustration/LandingPage/videocall.svg";
import AudioGroup from "../../Illustration/LandingPage/audiocall.svg";
import ChatScreen from "../../Illustration/LandingPage/ChatScreen.svg";
import GroupAudioCall from "../../Illustration/LandingPage/GroupAudioCall.svg";
import GroupChatScreen from "../../Illustration/LandingPage/GroupChatScreen.svg";
import TemChatScreen from "../../Illustration/LandingPage/temporarychat.svg";
import SmileIcon from "../../Illustration/smileIcon.svg";
import SubtractIcon from "../../Illustration/subtractIcon.svg";
import LockIcon from "../../Illustration/lockIcon.svg";
import ApplePhone from "../../Illustration/LandingPage/ApplePhone.svg";
import AndroidPhone from "../../Illustration/LandingPage/AndroidDevice.svg";
import Hero from "../../Illustration/hero.svg";
import {Link} from 'react-router-dom';

const Landing = () => {
  const history = useHistory();
  const [Pic, setPic] = useState(0);
  const handleSubmit = () => {
    history.push("/");
  };

  const renderingPicture = () => {
    switch (Pic) {
      case 0:
        return <img className="phone" src={ChatScreen} />;
      case 1:
        return <img className="phone" src={GroupChatScreen} />;
      case 2:
        return <img className="phone" src={TemChatScreen} />;
      case 3:
        return <img className="phone" src={AudioGroup} />;
      case 4:
        return <img className="phone" src={GroupAudioCall} />;
      case 5:
        return <img className="phone" src={videocall} />;
      default:
        return <img className="phone" src={ChatScreen} />;
    }
  };

  return (
    <Style.Wrapper>
      <img src={Hero} id="hero" alt="hero" />
      <Style.HeroFeatures>
        <HeroFeatures
          title="Easy to use"
          icon={SmileIcon}
          paragraph="Lorem ipsum lorem ipsum lorem ipsum
          loresmdnso dkfjoerodk sierueir eiriie
          slierieirieii eirhewoin vkeriier"
        />
        <div id="blackBorder" />
        <HeroFeatures
          title="Awesome Design"
          icon={SubtractIcon}
          paragraph="Lorem ipsum lorem ipsum lorem ipsum
          loresmdnso dkfjoerodk sierueir eiriie
          slierieirieii eirhewoin vkeriier iereiuier
          oeiruieur eiriimpeir93 ierieei eriiiwcniieir"
        />
        <div id="grayBorder" />
        <HeroFeatures
          title="More Secure"
          icon={LockIcon}
          paragraph="Lorem ipsum lorem ipsum lorem ipsum
          loresmdnso dkfjoerodk sierueir eiriie
          slierieirieii eirhewoin vkeriier"
        />
      </Style.HeroFeatures>
      <h3>HiChaty FEATURES</h3>
      <div style={{ backgroundColor: "#53A8CB" }}>
        <div id="feature">
          <div id="leftSide">
            <div onClick={() => setPic(0)}>
              <img src={Pic1} />
              <h4>Chat</h4>
              <p className="details">
                Lorem ipsum lorem ipsum lorem ipsum loresmdnso dkfjoerodk
                sierueir eiriie slierieirieii eirhewoin vkeriier{" "}
              </p>
            </div>
            <div onClick={() => setPic(1)}>
              <img src={Pic2} />
              <h4>Group Chat</h4>
              <p className="details">
                Lorem ipsum lorem ipsum lorem ipsum loresmdnso dkfjoerodk
                sierueir eiriie slierieirieii eirhewoin vkeriier{" "}
              </p>
            </div>
            <div onClick={() => setPic(2)}>
              <img src={Pic3} />
              <h4>Temporary Chat</h4>
              <p className="details">
                Lorem ipsum lorem ipsum lorem ipsum loresmdnso dkfjoerodk
                sierueir eiriie slierieirieii eirhewoin vkeriier{" "}
              </p>
            </div>
          </div>

          <div id="bar" />
          {renderingPicture()}
          <div id="rightSide">
            <div onClick={() => setPic(3)}>
              <img src={Pic5} />
              <h4>Audio Call</h4>
              <p className="details">
                Lorem ipsum lorem ipsum lorem ipsum loresmdnso dkfjoerodk
                sierueir eiriie slierieirieii eirhewoin vkeriier{" "}
              </p>
            </div>
            <div onClick={() => setPic(4)}>
              <img src={Pic2} />
              <h4>Group A.Call</h4>
              <p className="details">
                Lorem ipsum lorem ipsum lorem ipsum loresmdnso dkfjoerodk
                sierueir eiriie slierieirieii eirhewoin vkeriier{" "}
              </p>
            </div>
            <div onClick={() => setPic(5)}>
              <img src={Pic4} />
              <h4>Video Call</h4>
              <p className="details">
                Lorem ipsum lorem ipsum lorem ipsum loresmdnso dkfjoerodk
                sierueir eiriie slierieirieii eirhewoin vkeriier{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="device">
        <div className="phones">
          <img src={ApplePhone} alt="apple" />
          <img src={AndroidPhone} alt="android" />
        </div>
        <div>
          <h2>Download App now</h2>
          <p>
            Download HiChaty Messanger on your Device and Stay connect with
            Friends & family
          </p>
          <div className="buttons">
            <DeviceButton type="IOS">
              <div id="buttonContent">
                <span>Available on the</span>
                <p className="ButtonMark">App Store</p>
              </div>
            </DeviceButton>
            <DeviceButton type="Android">
              <div id="buttonContent">
                <span>Get it On</span>
                <p className="ButtonMark">Google play</p>
              </div>
            </DeviceButton>
          </div>
        </div>
      </div>

      <div id="lastSection">
        <img id="logo" src={Logo} alt="logo" />
        <p id="footerP">
        Let’s Join HiChaty Messanger
        </p>
       <Link to="signup">
       <button  >Register Here!</button></Link></div>
    </Style.Wrapper>
  );
};
export default Landing;
