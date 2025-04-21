import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Profile from '../images/UserIcon.png';
import './UserDetails.css';

function UserDetails() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="user-details-component">
      {currentUser.username ? (
        <div className="logged-in-user">
          {currentUser.access === 'associate' && (
            <Link to="/orders">Orders</Link>
          )}
          <img src={Profile} alt="profile" />
          <p>{currentUser.username}</p>
        </div>
      ) : (
        <Link to="/login">Log In</Link>
      )}
    </div>
  );
}

export default UserDetails;
