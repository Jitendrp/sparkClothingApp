import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ name, path }) => {
  return (
    <li className="nav-item">
      <Link data-testid="nav-link" className="nav-link" to={path}>
        {name}
      </Link>
    </li>
  );
};
MenuItem.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string
};
export default MenuItem;
