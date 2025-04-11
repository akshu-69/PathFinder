// Home.js
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';
import { itemImages } from '../items';
import './Home.css';
import ItemType from '../types/item';

function Home({ items }) {
  return (
    <div className="home-content">
      <div className="welcome-banner">
        <h1 className="welcome-message">Welcome to Pathfinder</h1>
        <h2 className="welcome-subtitle">Empowering Your Professional Journey</h2>
        <Link to="/Quiz" className="cta-button">
          Start Career Assessment →
        </Link>
      </div>

      <div className="courses-section">
        <h2 className="section-title">Featured Courses</h2>
        <div className="home-component">
          {items.map((item) => (
            <Thumbnail
              key={item.itemId}
              itemId={item.itemId}
              image={itemImages[item.imageId]}
              title={item.title}
              shortDescription={item.shortDescription}
            />
          ))}
        </div>
      </div>

      <div className="appointment-section">
        <h2 className="section-title">Mentorship Sessions</h2>
        <div className="appointment-links">
          <div className="appointment-actions">
            <a href="/schedule-appointment" className="appointment-link">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
              Schedule Appointment
            </a>
            <a href="/cancel-appointment" className="appointment-link">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
              Manage Appointments
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Home;
