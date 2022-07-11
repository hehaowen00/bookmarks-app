import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/Header';

import { AuthContext } from '../context/Auth';
import { login } from '../api/Auth';
import { setPageTitle } from '../util/Util';

function Login() {
  const { setToken } = useContext(AuthContext);
  const nav = useNavigate();

  const [fields, setFields] = useState({
    username: '',
    password: '',
    error: '',
  });

  const updateField = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const { username, password } = fields;

    let resp = await login(username, password);

    // login user
    if (resp.error) {
      setFields({ ...fields, error: 'Incorrect username or password' });
      return;
    }

    setToken(username, resp.token);
    nav('/home');
  };

  const checkToken = useCallback(async () => {
    let token = sessionStorage.getItem('token');

    if (token) {
      setToken(fields.username, token);
      nav('/home');
      return;
    }
  }, []);

  useEffect(() => {
    checkToken();
    setPageTitle('Login');
  }, []);

  return (
    <>
      <Header />
      <Container>
        <p></p>
        <Row className='justify-content-center'>
          <Col className='text-center' lg={4} md={6} sm={12} xs={12}>
            <h3>Login</h3>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col lg={4} md={6} sm={12} xs={12}>
            <Form onSubmit={submit}>
              <Form.Group className='mb-3'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name='username'
                  type='username'
                  placeholder='Username'
                  value={fields.username}
                  onChange={updateField}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={fields.password}
                  onChange={updateField}
                  required
                />
              </Form.Group>
              <p className='text-end'>
                <Link className='plain' to='/register'>Don't have an account?</Link>
              </p>
              {fields.error &&
                <Alert variant='danger'>
                  {fields.error}
                </Alert>
              }
              <Button className='w-100' type='submit' variant='primary'>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login;
