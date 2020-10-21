
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/actions/UserActions';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon, loggedInUser, logout }) => {
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <NavLink to='/' activeClassName='nav-active' exact>
            Home
          </NavLink>
        </li>
        {loggedInUser && loggedInUser.isAdmin && (
          <li>
            <NavLink to='/dashboard' activeClassName='nav-active' exact>
              Admin
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to='/info' activeClassName='nav-active' exact>
            Info
          </NavLink>
        </li>
        <li>
          <NavLink to='/about' activeClassName='nav-active' exact>
            About
          </NavLink>
        </li>
      </ul>
      {loggedInUser === null && (
        <ul>
          <li>
            <NavLink exact to='/login' className='pointer'>
              Login
            </NavLink>
          </li>
        </ul>
      )}
      {loggedInUser !== null && (
        <ul>
          <li>
            <img
              src='https://www.krocmemphis.org/wp-content/uploads/2016/10/generic-avatar.png'
              alt='user-avatar'
              className='user-avatar'
            />
            <NavLink exact to='/'>
              {loggedInUser.username}
            </NavLink>
          </li>
          <li>
            <a href='/#' className='pointer' onClick={() => logout()}>
              Logout
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'MisterToy - inventory manger',
};

const mapStateToProps = (state) => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
