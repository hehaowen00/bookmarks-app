import React, { useContext, useState } from 'react';
import { Button, ListGroupItem, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { CollectionContext } from '../context/Collection';
import { deleteCollection } from '../api/Collection';

function CollectionItem({ id, name, setError }) {
  const { removeCollection } = useContext(CollectionContext);
  const [showModal, setShowModal] = useState(false);

  let url = `/collection/${id}`;

  const toggleModal = async () => {
    setShowModal(!showModal);
  };

  const deleteItem = async () => {
    let token = sessionStorage.getItem('token');
    let resp = await deleteCollection(token, { id, name });

    if (resp.error) {
      setError('Failed to delete collection');
      setShowModal(false);
      return;
    }

    removeCollection(id);
    setShowModal(false);
  };

  return (
    <>
      <Modal backdrop={true} show={showModal} onHide={toggleModal} centered>
        <Modal.Body>
          <b>Delete "{name}" ?</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={deleteItem}>
            Delete
          </Button>
          <Button variant='primary' size='sm' onClick={toggleModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ListGroupItem className='d-flex justify-content-between'>
        <Link className='blue plain' to={url}>
          {name}
        </Link>
        <a onClick={toggleModal} className='button plain red' href='#'>
          <b>X</b>
        </a>
      </ListGroupItem>
    </>
  )
}

export default CollectionItem;
