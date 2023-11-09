import React, { useEffect, useState } from 'react'
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { signout } from '../../actions';
import AppLogo from '../../images/logo.PNG'
import { RiNotification3Line } from 'react-icons/ri'
import './style.css'
import { io } from 'socket.io-client';
import NotificationModal from '../NotificationModal/NotificationModal';

/**
* @author
* @function Header
**/
const socket = io("http://localhost:2000/");

const Header = (props) => {
    const [openNoti, setOpenNoti] = useState(false)

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // Hàm đăng xuất 
    const logout = () => {
        dispatch(signout());
    }

    useEffect(() => {
        socket.on('order', () => {
        document.querySelector('.counter').style.display = "block"
        })
    }, [socket])

    const handleClickIcon = () => {
        document.querySelector('.counter').style.display = "none"
    }

    // Nếu đã đăng nhập sẽ thấy sign out
    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className='nav-item'>
                    <div className='icon-container' onClick={handleClickIcon}>
                        <RiNotification3Line className='icon-noti' onClick={() => setOpenNoti(true)}/>
                        <div className='counter'></div>
                        <NotificationModal openModal={openNoti} onCloseModal={() => setOpenNoti(false)}/>
                    </div>
                </li>
                <li className='nav-item'>
                    <span className="nav-link" onClick={logout}>Signout</span>
                </li>
            </Nav>
        )
    }


    // Nếu chưa đăng nhập sẽ thấy sign in / sign up
    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
                <li className='nav-item'>
                    <NavLink to="/signin" className="nav-link">Signin</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                </li>
            </Nav>
        )
    }

    return (
        <Navbar collapseOnSelect fixed='top' expand="lg" bg="white" variant="white" style={{
            zIndex: 1,
            borderBottom: '1px solid #dfe1e7',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 0px 5px'
        }}>
            <Container fluid>
                {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                <Link to="/" className='navbar-brand'>
                    <img src={AppLogo} alt="logo" style={{ width: '25%', marginLeft: '2.5vw' }} />
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
                    </Nav>
                    {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}

                </Navbar.Collapse>
            </Container>
        </Navbar >)

}

export default Header