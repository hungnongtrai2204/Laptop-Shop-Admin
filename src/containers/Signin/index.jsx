import React, { useEffect, useState } from 'react'
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import "./style.css";
import AppLogo from '../../images/logo.PNG'
import { FaEyeSlash, FaEye } from 'react-icons/fa';

/**
* @author
* @function Signin
**/

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false)
    const [emailcheck, setEmailCheck] = useState(false)
    const [passcheck, setPassCheck] = useState(false)



    const userLogin = (e) => {
        if (document.getElementById('email').value === '' &&
            document.getElementById('password').value === '') {
            setEmailCheck(true)
            setPassCheck(true)
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
        e.preventDefault();
        const user = {
            email, password
        };

        dispatch(login(user));
    }
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

    // Nếu đã đăng nhập thì không vào được sign in
    if (auth.authenticate) {
        return <Navigate to='/' />
    }
    return (
        <div className='SignIn_wrapper'>
            <div className="SignIn_Form">
                <div className="SignIn_Box">
                    <div className="logo">
                        <img src={AppLogo} alt="logo" />
                    </div>
                    <div className="title">
                        <h6>Login to admin</h6>
                    </div>
                    <div className="content">
                        {
                            emailcheck === false ?
                                <div className="email">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name='email' id='email'
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                :
                                <div className="email">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name='email'
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            setEmailCheck(false)
                                        }} />
                                    <p>Email is Required</p>
                                </div>
                        }

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

                        <button className='login' onClick={userLogin}>Sign In</button>
                        <div className="span">
                            <hr className='w-full' />
                            <span className='w-split'>Or</span>
                            <hr className='w-full' />
                        </div>
                        <div className="signup">
                            Don't have any account?
                            <span className='space'></span>
                            <a href="/signup">Sign Up as Shop Owner</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <Layout>
        //     <Container>
        //         <Row style={{ marginTop: '100px' }}>
        //             <Col md={{ span: 6, offset: 3 }}>
        //                 <Form onSubmit={userLogin}>
        //                     <Input
        //                         label="Email"
        //                         placeholder="Email"
        //                         value={email}
        //                         type="email"
        //                         onChange={(e) => setEmail(e.target.value)}
        //                     />

        //                     <Input
        //                         label="Password"
        //                         placeholder="Password"
        //                         value={password}
        //                         type="password"
        //                         onChange={(e) => setPassword(e.target.value)}
        //                     />
        //                     <Button variant="primary" type="submit">
        //                         Submit
        //                     </Button>
        //                 </Form>
        //             </Col>
        //         </Row>
        //     </Container>
        // </Layout>
    )
}

export default Signin
