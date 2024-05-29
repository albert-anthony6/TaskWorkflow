import { useEffect, useState } from 'react';
import './PeoplePage.scss';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { getUsers } from '../store/slices/usersSlice';
import { NavLink } from 'react-router-dom';
import { useDebouncedSearch } from '../utils/hooks/useDebouncedSearch';
import { usePagination } from '../utils/hooks/usePagination';
import Pagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import Skeleton from 'react-loading-skeleton';
import StyledSearch from '../components/micro/StyledSearch';
import IconAvatar from '../assets/icons/icon_avatar.svg?react';

export default function PeoplePage() {
  const dispatch = useAppDispatch();
  const { users, pagination } = useAppSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const isLoadingSearch = useDebouncedSearch(searchTerm, dispatch, getUsers);
  const { handlePageClick, isLoadingPagination } = usePagination(
    dispatch,
    getUsers,
    null,
    searchTerm
  );

  // Update the combined loading state whenever either loading state changes
  useEffect(() => {
    setIsLoading(isLoadingSearch || isLoadingPagination);
  }, [isLoadingSearch, isLoadingPagination]);

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
      <Pagination
        current={pagination?.currentPage as number}
        total={pagination?.totalPages as number}
        onPageChange={handlePageClick}
        previousLabel="Previous"
        nextLabel="Next"
      />
    </main>
  );
}
