import React, { Fragment, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

const User = (props) => {
  const githubContext = useContext(GithubContext);
  const {
    name,
    login,
    bio,
    avatar_url,
    html_url,
    location,
    hireable,
    company,
    blog,
    public_repos,
    public_gists,
    followers,
    following
  } = githubContext.user;

  const { match } = props;

  useEffect(() => {
    githubContext.getUser(match.params.login);
    githubContext.getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);
  
  if (githubContext.loading) return <Spinner />;
  return (      
    <Fragment>
      <Link to={`/`} className="btn btn-light">Back To Search</Link>
      Hireable: {' '}
      {hireable ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times-circle text-danger"></i>}
      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} alt="avatar" className="round-img" style={{width: '150px'}} />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {
            bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )
          }
          <a href={html_url} rel="noopener noreferrer" target="_blank" className="btn btn-dark my-1" >Visit Github Profile</a>
          <ul>
            <li>
              {login && <Fragment>
                <strong>Username:</strong> {login}
              </Fragment>}
            </li>
            <li>
              {company && <Fragment>
                <strong>Company:</strong> {company}
              </Fragment>}
            </li>
            <li>
              {blog && <Fragment>
                <strong>Website:</strong> {blog}
              </Fragment>}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>          
      </div>
      <Repos repos={githubContext.repos} />
    </Fragment>      
  );
}

// User.propTypes = {
//   loading: PropTypes.bool,
//   user: PropTypes.object.isRequired,
//   repos: PropTypes.array.isRequired,
//   getUser: PropTypes.func.isRequired,
//   getUserRepos: PropTypes.func.isRequired
// }

export default User;