import './PeoplePage.scss';
import IconSearch from '../assets/icons/icon_search.svg?react';
import IconAvatar from '../assets/icons/icon_avatar.svg?react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { getUsers } from '../store/slices/usersSlice';
import { NavLink } from 'react-router-dom';

export default function PeoplePage() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  console.log(users);

  return (
    <main className="people-page">
      <div className="search-container">
        <IconSearch />
        <input type="text" placeholder="Search" />
      </div>
      <section className="people-grid">
        {users?.map((user) => (
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
    </main>
  );
}
