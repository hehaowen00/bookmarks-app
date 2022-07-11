import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  ListGroup,
  Row
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import CollectionItem from '../components/CollectionItem';
import Header from '../components/Header';

import { CollectionContext } from '../context/Collection';
import { getCollections } from '../api/Collection';
import { setPageTitle } from '../util/Util';

function Home() {
  const { context, setCollections } = useContext(CollectionContext);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    let token = sessionStorage.getItem('token');
    let resp = await getCollections(token);

    if (resp.error) {
      setError('Failed to load collections')
      return;
    }

    setCollections(resp.payload);
  }, []);

  useEffect(() => {
    load();
    setPageTitle('Home');
  }, []);

  return (
    <>
      <Header />
      <Container>
        <p></p>
        <Row>
          <Col>
            <InputGroup>
              <FormControl className='mb-2' type='text' placeholder='Search' />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <LinkContainer to='/collection/new'>
              <Button variant='primary' className="w-100">
                Create Collection
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <p></p>
        <h5>Collections</h5>
        {error &&
          <Alert variant='danger'>
            {error}
          </Alert>
        }
        <Row>
          <Col>
            <ListGroup>
              {context.map(({ id, name }) =>
                <CollectionItem key={id} id={id} name={name} setError={setError} />
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <br />
    </>
  )
}

export default Home;
