import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { getCollection, updateCollection } from '../api/Collection';
import { setPageTitle } from '../util/Util';

function CollectionHeader({ id, setError }) {
  const [title, setTitle] = useState('');
  const token = sessionStorage.getItem('token');

  const updateTimer = new Timer();

  const keyDown = () => {
    updateTimer.keydown();
  };

  const keyUp = () => {
    updateTimer.keyup(updateName, 500);
  };

  const updateName = async () => {
    const name = name.trim();

    let resp = await updateCollection(token, { id, name });

    if (resp.error) {
      return;
    }
  };

  const load = useCallback(async () => {
    let resp = await getCollection(token, id);

    if (resp.error) {
      setError(resp.message);
      return;
    }

    const { name } = resp.payload;
    setTitle(name);
    setPageTitle(name);
  }, []);

  useEffect(() => {
    load();
  }, []);


  return (
    <Form>
      <Row>
        <Col md='10'>
          <FormControl
            type='input'
            className='mb-2 me-2 title'
            name='name'
            placeholder='Name'
            onChange={e => setTitle(e.target.value)}
            onKeyDown={keyDown}
            onKeyUp={keyUp}
            value={title}
          />
        </Col>
        <Col md={2} sm={12} xs={12}>
          <LinkContainer to={`/bookmark/new/${id}`}>
          <Button className='w-100' variant='primary'>
            Add Bookmark
          </Button>
          </LinkContainer>
        </Col>
      </Row>
    </Form>
  )
}

class Timer {
  constructor() {
    this.timer = null;
  }

  keydown() {
    clearTimeout(this.timer)
  }

  keyup(f, t) {
    clearTimeout(this.timer);
    this.timer = setTimeout(f, t);
  }
}

export default CollectionHeader;
