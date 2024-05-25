import { useEffect, useState } from 'react';
import './PeoplePage.scss';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { getUsers } from '../store/slices/usersSlice';
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Skeleton from 'react-loading-skeleton';
import StyledSearch from '../components/micro/StyledSearch';
import IconAvatar from '../assets/icons/icon_avatar.svg?react';

export default function PeoplePage() {
  const dispatch = useAppDispatch();
  const { users, pagination } = useAppSelector((state) => state.users);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  function handlePageClick(data: { selected: number }) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoading(true);
    dispatch(
      getUsers({ pagingParams: { pageNumber: data.selected + 1, pageSize: 12 }, searchTerm })
    ).finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        setIsLoading(true);
        dispatch(getUsers({ pagingParams: { pageNumber: 1, pageSize: 12 }, searchTerm })).finally(
          () => {
            setIsLoading(false);
          }
        );
      },
      searchTerm ? 500 : 0
    );

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  return (
    <main className="people-page">
      <StyledSearch handleChange={(event) => setSearchTerm(event.target.value)} />
      <section className="people-grid">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="people-card">
              <Skeleton baseColor="#ccc" duration={0.9} width="100%" height="100%" />
            </div>
          ))
        ) : users && users.length > 0 ? (
          users.map((user) => (
            <NavLink to={`/user/${user.id}`} key={user.id} className="people-card">
              {user.avatar ? (
                <img
                  src={user.avatar.url}
                  alt={user.displayName}
                  className="avatar avatar__medium"
                />
              ) : (
                <IconAvatar className="avatar avatar__medium" />
              )}
              <div className="username">
                <p>{user.displayName}</p>
                <div className="caption">{user.bio}</div>
              </div>
            </NavLink>
          ))
        ) : (
          <div className="empty-state">No users found</div>
        )}
      </section>
      {(pagination?.totalPages as number) > 1 && (
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
      )}
    </main>
  );
}
