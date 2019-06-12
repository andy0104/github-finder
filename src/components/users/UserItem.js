import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

const UserItem = (props) => {  
  const { avatar_url, login } = props.user; 
  return (
    <Fragment>
      <div className="card text-center">
        <img src={avatar_url} alt="" className="round-img avatar-img" />
        <h3>{login}</h3>
        <div >
          <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">More</Link>
        </div>
      </div>
    </Fragment>
  );
  
}

export default UserItem;
