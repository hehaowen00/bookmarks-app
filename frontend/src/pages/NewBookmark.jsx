import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  FormControl,
  Row,
  Form,
} from 'react-bootstrap';

import Header from '../components/Header';

import { getCollections } from '../api/Collection';
import { addBookmark } from '../api/Bookmark';
import { useNavigate, useParams } from 'react-router-dom';
import { setPageTitle } from '../util/Util';

function NewBookmark() {
  const { id } = useParams();
  const nav = useNavigate();

  const [fields, setFields] = useState({
    error: '',
    title: '',
    url: '',
    collection: id,
    collections: [],
  });

  const updateField = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const { title, url } = fields;
    const token = sessionStorage.getItem('token');

    if (!url.startsWith('http')) {
      setFields({ ...fields, error: 'Invalid URL' });
      return;
    }

    const list_id = parseInt(fields.collection);

    let resp = await addBookmark(token, { list_id, title, url });

    if (resp.error) {
      setFields({
        ...fields,
        error: 'Failed to add bookmark',
      });
      return;
    }

    nav(`/collection/${list_id}`);
  };

  const load = useCallback(async () => {
    let token = sessionStorage.getItem('token');
    let resp = await getCollections(token);

    if (resp.error) {
      setFields({
        ...fields,
        error: 'Failed to load collections',
      });
      return;
    }

    setFields({ ...fields, collections: resp.payload });
  }, []);

  useEffect(() => {
    load();
    setPageTitle('New Bookmark');
  }, []);

  return (
    <>
      <Header />
      <Container>
        <p></p>
        <h4>New Bookmark</h4>
        <Form onSubmit={submit}>
          <Row className='mb-2'>
            <Col md='12'>
              <FormControl
                type='input'
                name='url'
                className='me-2'
                placeholder='Link'
                onChange={updateField}
                value={fields.url}
                required
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>
              <FormControl
                type='input'
                className='me-2'
                name='title'
                placeholder='Title'
                onChange={updateField}
                value={fields.title}
                required
              />
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col className='mb-2' md={10} sm={12} xs={12}>
              <Form.Select
                name='collection'
                onChange={updateField}
                value={fields.collection}
              >
                {fields.collections.map(({ id, name }) =>
                  <option key={id} value={id}>{name}</option>
                )}
              </Form.Select>
            </Col>            <Col md={2} sm={12} xs={12}>
              <Button type='submit' className='w-100'>Add Bookmark</Button>
            </Col>
          </Row>
          {fields.error &&
            <Alert variant='danger'>
            {fields.error}
            </Alert>
          }
        </Form>
      </Container>
    </>
  )
}

export default NewBookmark;
