import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions";
import "./style.css";
import AppLogo from '../../images/logo.PNG'
import { FaEyeSlash, FaEye } from 'react-icons/fa';
/**
 * @author
 * @function Signup
 **/

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(false)
  const [fncheck, setFNCheck] = useState(false)
  const [lncheck, setLNCheck] = useState(false)
  const [emailcheck, setEmailCheck] = useState(false)
  const [passcheck, setPassCheck] = useState(false)

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user.loading) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [user.loading]);

  const userSignup = (e) => {
    if (document.getElementById('email').value === '' &&
      document.getElementById('password').value === ''
      && document.getElementById('firstname').value === ''
      && document.getElementById('lastname').value === '') {
      setEmailCheck(true)
      setPassCheck(true)
      setFNCheck(true)
      setLNCheck(true)
      return
    }
    else
      if (document.getElementById('firstname').value === ''
        && document.getElementById('lastname').value === '') {
        setFNCheck(true)
        setLNCheck(true)
        return
      }
      else if (document.getElementById('email').value === '') {
        setEmailCheck(true)
        return
      }
      else if (document.getElementById('password').value === '') {
        setPassCheck(true)
        return
      }
      else if (document.getElementById('firstname').value === '') {
        setFNCheck(true)
        return
      }
      else if (document.getElementById('lastname').value === '') {
        setLNCheck(true)
        return
      }
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup(user));
  };

  const UnHide = () => {
    console.log({ selected })
    if (!selected) {
      document.getElementById('password').setAttribute('type', 'text')
      setSelected(true)
    }
    else {
      document.getElementById('password').setAttribute('type', 'password')
      setSelected(false)
    }
  }
  // Nếu đã đăng nhập thì không vào được sign up
  if (auth.authenticate) {
    return <Navigate to="/" />;
  }

  if (user.loading) {
    return <p>Loading...!</p>;
  }

  return (
    <div className='SignUp_wrapper'>
      <div className="SignUp_Form">
        <div className="SignUp_Box">
          <div className="logo">
            <img src={AppLogo} alt="logo" />
          </div>
          <div className="title">
            <h6>Register new account</h6>
          </div>
          <div className="content">
            {/* FirtsName */}
            {
              fncheck === false ?
                <div className="email">
                  <label htmlFor="firstname">First Name</label>
                  <input type="text" name='firstname' id='firstname'
                    onChange={(e) => setFirstName(e.target.value)} />
                </div>
                :
                <div className="email">
                  <label htmlFor="firstname">First Name</label>
                  <input type="text" name='firstname'
                    onChange={(e) => {
                      setFirstName(e.target.value)
                      setFNCheck(false)
                    }} />
                  <p>First name is Required</p>
                </div>
            }
            {/* LastName */}
            {
              lncheck === false ?
                <div className="email">
                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" name='lastname' id='lastname'
                    onChange={(e) => setLastName(e.target.value)} />
                </div>
                :
                <div className="email">
                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" name='lastname'
                    onChange={(e) => {
                      setLastName(e.target.value)
                      setLNCheck(false)
                    }} />
                  <p>Last name is Required</p>
                </div>
            }
            {/* Email */}
            {
              emailcheck === false ?
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input type="email" name='email' id='email'
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                :
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input type="email" name='email'
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailCheck(false)
                    }} />
                  <p>Email is Required</p>
                </div>
            }

            {/* password */}
            {
              selected === false && passcheck === false ?
                <div className="password">
                  <label htmlFor="email">Password</label>
                  <input type='password' id='password'
                    onChange={(e) => setPassword(e.target.value)}></input>
                  <FaEye className='icon' onClick={() => {
                    setSelected(true)
                    UnHide()
                  }} />
                </div>
                : selected === false && passcheck === true ?
                  <div className="password">
                    <label htmlFor="email">Password</label>
                    <input type='password' id='password'
                      onChange={(e) => {
                        setPassCheck(false)
                        setPassword(e.target.value)
                      }}></input>
                    <FaEye className='icon' onClick={() => {
                      setSelected(true)
                      UnHide()
                    }} />
                    <p>Password is Required</p>
                  </div>
                  : selected === true && passcheck === false ?
                    <div className="password">
                      <label htmlFor="email">Password</label>
                      <input type='password' id='password'
                        onChange={(e) => setPassword(e.target.value)}></input>
                      <FaEyeSlash className='icon' onClick={() => {
                        setSelected(true)
                        UnHide()
                      }} />
                    </div>
                    :
                    <div className="password">
                      <label htmlFor="email">Password</label>
                      <input type='password' id='password'
                        onChange={(e) => {
                          setPassCheck(false)
                          setPassword(e.target.value)
                        }}></input>
                      <FaEyeSlash className='icon' onClick={() => {
                        setSelected(true)
                        UnHide()
                      }} />
                      <p>Password is Required</p>
                    </div>
            }

            <button className='login' onClick={userSignup}>Sign Up</button>
            <div className="span">
              <hr className='w-full' />
              <span className='w-split'>Or</span>
              <hr className='w-full' />
            </div>
            <div className="signup">
              Already have any account?
              <span className='space'></span>
              <a href="/signin">Sign In</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <Layout>
    //   <Container>
    //     {user.message}
    //     <Row style={{ marginTop: "100px" }}>
    //       <Col md={{ span: 6, offset: 3 }}>
    //         <Form onSubmit={userSignup}>
    //           <Row>
    //             <Col md={6}>
    //               <Input
    //                 label="First Name"
    //                 placeholder="First Name"
    //                 value={firstName}
    //                 type="text"
    //                 onChange={(e) => setFirstName(e.target.value)}
    //               />
    //             </Col>
    //             <Col md={6}>
    //               <Input
    //                 label="Last Name"
    //                 placeholder="Last Name"
    //                 value={lastName}
    //                 type="text"
    //                 onChange={(e) => setLastName(e.target.value)}
    //               />
    //             </Col>
    //           </Row>
    //           <Input
    //             label="Email"
    //             placeholder="Email"
    //             value={email}
    //             type="email"
    //             onChange={(e) => setEmail(e.target.value)}
    //           />

    //           <Input
    //             label="Password"
    //             placeholder="Password"
    //             value={password}
    //             type="password"
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //           <Button variant="primary" type="submit">
    //             Submit
    //           </Button>
    //         </Form>
    //       </Col>
    //     </Row>
    //   </Container>
    // </Layout>
  );
}

export default SignUp
