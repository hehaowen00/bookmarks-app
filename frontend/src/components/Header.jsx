import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from '../context/Auth';

function Header() {
  const { auth } = useContext(AuthContext);

  if (auth.allowed) {
    return (
      <Authenticated />
    )
  } else {
    return (
      <Default />
    )
  }
}

function Authenticated() {
  let username = 'testing';
  return (
    <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
      <Container>
      <LinkContainer to='/home'>
        <Navbar.Brand>Bookmarks</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='header' />
      <Navbar.Collapse id='header'>
        <Nav className='me-auto'>
          <LinkContainer to='/home'>
            <Nav.Link>My Bookmarks</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/collection/new'>
            <Nav.Link>New Collection</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/settings'>
            <Nav.Link>Settings</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <Navbar.Text className='underline white'>
            Signed in as: {username}
          </Navbar.Text>
          <LinkContainer to='/logout'>
            <Nav.Link>Sign Out</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function Default() {
  return (
    <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
      <Container>
      <LinkContainer to='/home'>
        <Navbar.Brand>Bookmarks</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='header' />
      <Navbar.Collapse id='header'>
        <Nav className='me-auto'>
        </Nav>
        <Nav>
          <LinkContainer to='/'>
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/register'>
            <Nav.Link>Register</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
