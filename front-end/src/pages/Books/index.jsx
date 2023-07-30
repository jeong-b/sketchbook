import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';
import { Wrapper } from './styles';

import Header from '../../components/Header';
import BookCard from '../../components/BookCard';

import bookData from '../../dummy-data/bookData';

function Books() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const booksPerPage = 6; // 한 페이지에 보여질 책의 수

  useEffect(() => {
    setBooks(bookData);
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop(); // 페이지네이션을 클릭하면 페이지 상단으로 스크롤
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지의 상단으로 스크롤
  };

  return (
    <div>
      <Header />
      <br />
      <h4>검색기능 넣을겁니당</h4>
      <br />
      <div className="container">
        <Row xs={1} md={1} lg={2} xl={3} className="g-4">
          {currentBooks.map((book) => (
            <Col key={book.id}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      </div>
      <br />
      <Wrapper>
        <Pagination>
          {[...Array(Math.ceil(books.length / booksPerPage)).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Wrapper>
    </div>
  );
}

export default Books;
