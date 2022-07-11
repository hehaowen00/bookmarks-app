import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Clipboard } from 'react-bootstrap-icons';

function BookmarkItem({ id, title, url, setShow, deleteItem }) {
  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    setShow(true);
  };

  const onClick = () => {
    deleteItem({ id: parseInt(id), title, url });
  };

  return (
    <>
      <ListGroupItem className='d-flex justify-content-between'>
        <a className='blue plain' href={url} target='_blank'>
          {title}
        </a>
        <div className='button-row'>
          <a className='button plain blue icon' href='#' onClick={copyUrl}>
            <Clipboard />
          </a>
          <a className='button plain red' href='#' onClick={onClick}>
            <b>X</b>
          </a>
        </div>
      </ListGroupItem>
    </>
  )
}

export default BookmarkItem;
