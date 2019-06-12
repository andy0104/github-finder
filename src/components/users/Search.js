import React, {useState, useContext} from 'react';
// import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const {clearUsers, users} = githubContext;
  const [text, setText] = useState('');
  
  const onValueChange = (e) => {
    setText(e.target.value);
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert('Please enter username', 'primary');
    } else {
      githubContext.searchGitUsers(text);
      setText('');
    }    
  }
    
  return (
    <div>
      <form className="form" onSubmit={onFormSubmit} method="POST">
        <input placeholder="Search..." name="text" type="text" value={text} onChange={onValueChange} />
        <input type="submit" className="btn btn-dark btn-block" value="Search" />
      </form>
      { users.length > 0 && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> }
    </div>
  );
  
}

// Search.propTypes = {  
//   clearUsers: PropTypes.func.isRequired,
//   showClear: PropTypes.bool.isRequired,
//   setAlert: PropTypes.func.isRequired
// }

export default Search;