import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  paginateList
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map(index => (
          <LinkContainer
            key={index + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${index + 1}`
                  : `/page/${index + 1}`
                : `/admin/${paginateList}/${index + 1}`
            }
          >
            <Pagination.Item active={index + 1 === page}>
              {index + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
