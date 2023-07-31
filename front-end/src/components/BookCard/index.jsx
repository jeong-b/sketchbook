import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Wrapper, FontWrap } from './styles';

function BookCard({ book }) {
  const [showModal, setShowModal] = useState(false);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
    <FontWrap>
        <Card style={{ width: '25rem', margin: '20px 0px 20px 0px'}} onClick={handleModalShow}>
          <Card.Img variant="top" src={book.bookcover} style={{ width: '24.9rem', height: '30rem' }} />
          <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{book.title}</Card.Title>
        </Card.Body>
        </Card>
        </FontWrap>

        <Modal show={showModal} onHide={handleModalClose} size="xl">
          <Modal.Header closeButton>
            {/* <Modal.Title>{book.title}</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
          <Wrapper>

            <div style={{ flex: 1 }}>
              <img src={book.bookcover} alt={book.title} style={{ width: '30rem', height: '35rem' }} />
            </div>
            <div style={{ flex: 2, padding: '10px 40px 10px 40px' }}>
              <h2>{book.title}</h2>
              <h5>{book.writer} 작가</h5>
              <br />
              {/* <p>{book.summary}</p> */}
              <p dangerouslySetInnerHTML={{ __html: book.summary.replace(/\n/g, '<br>') }} />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
                <Button
                  variant="outline-primary"
                  className="custom-button-style"
                  onClick={() => console.log('첫 번째 버튼 클릭')}
                >
                  캐릭터 출력하기
                </Button>
                <Button
                  variant="outline-primary"
                  className="custom-button-style"
                  onClick={() => console.log('두 번째 버튼 클릭')}
                >
                  시작하기
                </Button>
              </div>
            </div>
      </Wrapper>
          </Modal.Body>
        </Modal>
    </>
  );
}

export default BookCard;
