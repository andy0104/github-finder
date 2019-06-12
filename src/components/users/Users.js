import React, { Fragment, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

// import PropTypes from 'prop-types';

const Users = (props) => {
  const githubContext = useContext(GithubContext);
  const {loading, users} = githubContext;
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div style={userStyle}>
          {users && users.map(user => <UserItem user={user} key={user.id} />)} 
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

// Users.propTypes = {
//   users: PropTypes.array.isRequired,
//   loading: PropTypes.bool.isRequired
// };

export default Users;
