import React, { useContext, useEffect } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import * as Style from './style';
import Logo from '../../Illustration/hichatylogo.svg';
import AuthInput from '../UI/AuthInput';
import FooterButton from '../UI/FooterButton';
import { firebaseAuth } from '../../Provider/AuthProvider/authProvider';
import OTP from '../OTP';
import Share from '../Share';

const Login = () => {
  const {
    handleLogin,
    loginError,
    loginInput,
    setloginInput,
    authStep,
    setLoginError,
    setValuePhone,
    valuePhone,
  } = useContext(firebaseAuth);
  const appVerifier = window.recaptchaVerifier;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(appVerifier);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginError('');
    setloginInput((prev) => ({ ...prev, [name]: value }));
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
          <Style.AuthWrapper>
            <Style.LeftContainer>
              <img src={Logo} />
            </Style.LeftContainer>
            <Style.Formcontainer>
              <div id="container">
                <h1>LOGIN</h1>
                <form onSubmit={handleSubmit}>
                  {/* <Style.Choice>
                                    <div>
                                        <div id="checkbox">
                                            <div />
                                        </div>
                                        <span>Personal</span>
                                    </div>
                                    <div>
                                        <div id="checkbox">
                                            <div />
                                        </div>
                                        <span>Corporate</span>
                                    </div>
                                </Style.Choice> */}
                  <PhoneInput
                    id="phone"
                    required
                    name="mobile"
                    placeholder="Mobile Number"
                    value={valuePhone}
                    onChange={setValuePhone}
                  />
                  <AuthInput icon="lock" type="password" required placeholder="Password" onChange={handleChange} name="password" value={loginInput.password} />
                  <div id="recaptcha-container" />
                  <FooterButton>Login</FooterButton>
                  <div>
                    <Link to="/signup">Register here!</Link>
                    <Link id="forgot" to="/forget">Forgot password</Link>
                  </div>
                  {loginError ? <p style={{ textAlign: 'center', color: 'red' }}>{loginError}</p> : null}
                </form>
              </div>
            </Style.Formcontainer>

          </Style.AuthWrapper>
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

export default Login;
