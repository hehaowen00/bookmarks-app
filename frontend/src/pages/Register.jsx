import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';

import { AuthContext } from '../context/Auth';
import { register, verifyToken } from '../api/Auth';
import { setPageTitle } from '../util/Util';
import { Link } from 'react-router-dom';

function Register() {
  const { setToken } = useContext(AuthContext);
  const nav = useNavigate();

  const [fields, setFields] = useState({
    username: '',
    password: '',
    error: '',
    success: false,
  });

  const updateField = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const { username, password } = fields;

    let resp = await register(username, password);

    if (resp.error) {
      setFields({ ...fields, error: resp.message, success: false });
      return;
    }

    setFields({ ...fields, error: '',  success: true });
  };

  const load = useCallback(async () => {
    let token = sessionStorage.getItem('token');

    if (!token) {
      return;
    }

    let resp = await verifyToken(token)

    if (resp.error) {
      setToken(resp.username, token);
      nav('/home');
    }
  }, []);

  useEffect(() => {
    load();
    setPageTitle('Register');
  }, []);


  return (
    <>
      <Header />
      <Container>
        <p></p>
        <Row className='justify-content-center'>
          <Col className='text-center' lg={4} md={6} sm={12} xs={12}>
            <h3>Register</h3>
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
              {fields.error &&
                <Alert variant='danger'>
                  {fields.error}
                </Alert>
              }
              {fields.success &&
                <Alert variant='success'>
                  User added. Click <Link to='/'>here</Link> to login.
                </Alert>
              }
              <Button className='w-100' type='submit' variant='primary'>
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Register;
