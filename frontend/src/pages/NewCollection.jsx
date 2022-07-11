import React, { useState } from 'react';
import { Button, Col, Container, FormControl, Row, Form, Alert } from 'react-bootstrap';
import Header from '../components/Header';

import { addCollection } from '../api/Collection';
import { useNavigate } from 'react-router-dom';

function NewCollection() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    let token = sessionStorage.getItem('token');
    let resp = await addCollection(token, title);
    if (!resp.error) {
      nav('/home');
      return;
    }

    setError(resp.message);
  };

  return (
    <>
    <Header />
    <Container>
      <p></p>
      <h4>New Collection</h4>
      <Form onSubmit={submit}>
        <Row className='mb-2'>
          <Col md={10}>
            <FormControl
              type='input'
              className='mb-2 me-2'
              name='title'
              onChange={e => setTitle(e.target.value)}
              placeholder='New Collection'
              required
            />
          </Col>
          <Col>
            <Button type='submit' className='w-100'>Add Collection</Button>
          </Col>
        </Row>
      </Form>
    {error &&
      <Alert variant='danger'>
        {error}
      </Alert>
    }
    </Container>
    </>
  )
}

export default NewCollection;
