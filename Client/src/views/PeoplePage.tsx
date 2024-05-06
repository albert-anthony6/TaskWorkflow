import { useEffect } from 'react';
import './PeoplePage.scss';
import ReactPaginate from 'react-paginate';
import IconSearch from '../assets/icons/icon_search.svg?react';
import IconAvatar from '../assets/icons/icon_avatar.svg?react';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { getUsers } from '../store/slices/usersSlice';
import { NavLink } from 'react-router-dom';

export default function PeoplePage() {
  const dispatch = useAppDispatch();
  const { users, pagination } = useAppSelector((state) => state.users);

  function handlePageClick(data: { selected: number }) {
    dispatch(getUsers({ pageNumber: data.selected + 1, pageSize: 12 }));
  }

  useEffect(() => {
    dispatch(getUsers({ pageNumber: 1, pageSize: 12 }));
  }, [dispatch]);

  return (
    <main className="people-page">
      <div className="search-container">
        <IconSearch />
        <input type="text" placeholder="Search" />
      </div>
      <section className="people-grid">
        {users?.length &&
          users.map((user) => (
            <NavLink to={`/user/${user.id}`} className="people-card">
              {user.avatar ? (
                <img src={user.avatar.url} alt={user.displayName} />
              ) : (
                <IconAvatar className="avatar avatar__medium" />
              )}
              <div className="username">
                <p>{user.displayName}</p>
                <div className="caption">Developer at HighRise</div>
              </div>
            </NavLink>
          ))}
      </section>
      <ReactPaginate
        className="pagination"
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pagination?.totalPages as number}
        previousLabel="< Previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item--prev"
        previousLinkClassName="page-link"
        nextClassName="page-item--next"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="pagination__active"
        renderOnZeroPageCount={null}
      />
    </main>
  );
}
