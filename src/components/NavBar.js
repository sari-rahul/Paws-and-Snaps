import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut= async()=>{
    try{
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    }catch(err){
      console.log(err)
    }
  };

  const add = (
  <NavLink
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/post/create" >   
    Add Article
  </NavLink>)

  const loggedInIcons = <>
   {/*Adoption link*/}
      <NavLink
        className={styles.NavLink}
        to="/"     
      >
        Adoption
      </NavLink>
      {/*Wildlife link*/}
      <NavLink
        className={styles.NavLink}
        to="/"     
      >
        Wildlife
      </NavLink>
      
      {/*Wellness link*/}
      <NavLink
        className={styles.NavLink}
        to="/"     
      >
        Wellness
      </NavLink>
      {/*Logout link*/}
      <NavLink
        className={styles.NavLink}
        to="/"
        onClick={handleSignOut}
      > Log out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text= "Profile" height={40}/>
      </NavLink>
  </>;
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="65" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && add}

        <Navbar.Toggle 
        aria-controls="basic-navbar-nav" 
        ref={ref}
        onClick={() => setExpanded(!expanded)}/>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;