import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Container, ListGroup, ToastContainer, Toast } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import CollectionHeader from '../components/CollectionHeader';
import Header from '../components/Header';
import BookmarkItem from '../components/BookmarkItem';

import { deleteBookmark, getBookmarks } from '../api/Bookmark';

function Collection() {
  const { id } = useParams();
  let list_id = parseInt(id);

  const [bookmarks, setBookmarks] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const token = sessionStorage.getItem('token');
    let resp = await getBookmarks(token, id);

    if (resp.error) {
      setError('Failed to retrieve bookmarks');
      return;
    }

    setBookmarks(resp.payload);
  }, []);

  const deleteItem = async (bookmark) => {
    const token = sessionStorage.getItem('token');
    let resp = await deleteBookmark(token, { ...bookmark, list_id });

    if (resp.error) {
      setError('Failed to delete bookmark');
      return;
    }

    const items = [...bookmarks];
    const { id } = bookmark;
    const idx = items.findIndex(e => e.id === id);
    items.splice(idx, 1);
    setBookmarks(items);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <p></p>
        <CollectionHeader id={id} setError={setError} />
        {error &&
          <Alert variant='danger'>
            {error}
          </Alert>
        }
        <p></p>
        <ListGroup>
        {bookmarks.map(({ id, title, url }) =>
          <BookmarkItem
            key={id}
            id={id}
            title={title}
            url={url}
            setShow={setShow}
            deleteItem={deleteItem}
          />
        )}
        </ListGroup>
        {show &&
          <ToastContainer className='toast-view'>
            <Toast className='toast-border' bg='success' onClose={() => setShow(false)}>
              <Toast.Header className='toast-border'>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Copied URL to Clipboard!</strong>
              </Toast.Header>
            </Toast>
          </ToastContainer>
        }
      </Container>
    </>
  )
}

export default Collection;
