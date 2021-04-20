import React, { useContext, useEffect } from 'react';
import firebase from 'firebase';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Link } from 'react-router-dom';
import * as Style from './style';
import { firebaseAuth } from '../../Provider/AuthProvider/authProvider';
import Logo from '../../Illustration/hichatylogo.svg';
import AuthInput from '../UI/AuthInput';
import FooterButton from '../UI/FooterButton';
import OTP from '../OTP';
import Share from '../Share';

const Signup = () => {
  const {
    handleSignup,
    authStep,
    setSignupError,
    signUpInput,
    setsignUpInput,
    signupError,
    setValuePhone,
    valuePhone,
  } = useContext(firebaseAuth);
  const appVerifier = window.recaptchaVerifier;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignup(signUpInput, appVerifier);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupError('');
    setsignUpInput((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      callback() {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
    });
  }, []);
  const renderAuth = () => {
    switch (authStep) {
      case 1:
        return (
          <Style.SignupWrapper>
            <Style.LeftContainer>
              <img src={Logo} />
            </Style.LeftContainer>
            <Style.Formcontainer>
              <div id="container">
                <h1>REGISTER</h1>
                <form onSubmit={handleSubmit}>
                  <AuthInput required type="text" onChange={handleChange} name="name" value={signUpInput.name} icon="contact" placeholder="Full name" />
                  <AuthInput required type="text" onChange={handleChange} name="email" value={signUpInput.email} icon="message" placeholder="Email address" />
                  <AuthInput required type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" onChange={handleChange} name="password" value={signUpInput.password} icon="lock" placeholder="Password" />
                  <AuthInput required type="text" onChange={handleChange} name="gender" value={signUpInput.gender} icon="gender" placeholder="Gender" />
                  <PhoneInput
                    id="phone"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={valuePhone}
                    onChange={setValuePhone}
                  />
                  <div id="recaptcha-container" />
                  <FooterButton onSubmi={handleSubmit}>Register</FooterButton>
                  <Link to="/login">Login here!</Link>
                </form>
                {signupError ? <p style={{ textAlign: 'center', color: 'red' }}>{signupError}</p> : null}
              </div>
            </Style.Formcontainer>

          </Style.SignupWrapper>
        );

      case 2:
        return <OTP />;
      case 3:
        return <Share />;
      default: return null;
    }
  };

  return renderAuth();
};

export default Signup;
