import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Search = ({showClear, clearUsers, setAlert, searchGitUsers}) => {
  const [text, setText] = useState('');
  
  const onValueChange = (e) => {
    setText(e.target.value);
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter username', 'light');
    } else {
      searchGitUsers(text);
      setText('');
    }    
  }
    
  return (
    <div>
      <form className="form" onSubmit={onFormSubmit} method="POST">
        <input placeholder="Search..." name="text" type="text" value={text} onChange={onValueChange} />
        <input type="submit" className="btn btn-dark btn-block" value="Search" />
      </form>
      { showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> }
    </div>
  );
  
}

Search.propTypes = {
  searchGitUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
}

export default Search;