import React, { Fragment } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

import PropTypes from 'prop-types';

const Users = (props) => {
  if (props.loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div style={userStyle}>
          {props.users && props.users.map(user => <UserItem user={user} key={user.id} />)} 
        </div>                
      </Fragment>
    );
  }  
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Users;
