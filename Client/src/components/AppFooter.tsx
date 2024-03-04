import { Link } from 'react-router-dom';
import './AppFooter.scss';
import IconLogo from '../assets/icons/icon_logo.svg?react';
import IconLinkedin from '../assets/icons/icon_linkedin.svg?react';

export default function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="app-footer--content">
        <div className="app-footer--content__left">
          <IconLogo />
          <div className="caption">Collaboration platform for modern teams.</div>
        </div>
        <div className="app-footer--content__right">
          <div className="app-footer--column">
            <h4>Company</h4>
            <Link to="/about-us" className="caption">
              About Us
            </Link>
          </div>
          <div className="app-footer--column">
            <h4>Features</h4>
            <ul id="features">
              <li className="caption">Manage Tasks</li>
              <li className="caption">Track Tasks</li>
              <li className="caption">Upload Photos</li>
              <li className="caption">Easy Search</li>
            </ul>
          </div>
          <div className="app-footer--column">
            <h4>Contact Us</h4>
            <ul id="contact-us">
              <li className="caption">info@tworkflow.com</li>
              <li className="caption">1-800-200-300</li>
              <li className="caption">
                1010 Sunset Blvd. <br /> Palo Alto, CA
              </li>
            </ul>
          </div>
          <div className="app-footer--column">
            <h4>Stay Up to Date</h4>
            <div className="caption">
              Follow us on{' '}
              <a href="https://www.linkedin.com/in/avaldes21/" target="_blank">
                Linkedin: <IconLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="caption">© Copyright Task Workflow LLC</div>
    </footer>
  );
}
