import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from '../styles/NavBar.module.css';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';


const NavBar = () => {
  return (
    <div>
        <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
        <Navbar.Brand className= {styles.NavBarBrand}>
          <img src={logo} alt="logo" height="65" />
        </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink exact to="/" className={styles.NavLink} activeClassName ={styles.Active}>
              <i className="fas fa-home"></i>Home
            </NavLink>
            <NavLink to="/signin" className={styles.NavLink} activeClassName ={styles.Active}>
              <i className="fas fa-sign-in-alt"></i>Sign in
            </NavLink>
            <NavLink to="/signup" className={styles.NavLink} activeClassName ={styles.Active}>
              <i className="fas fa-user-plus"></i>Sign up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar