import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users?q=${query}`
          );
          setResults(response.data);
        } catch (error) {
          console.error('Search error:', error);
        }
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Search Users</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          
          {loading && (
            <div className="text-center mt-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          <div className="mt-3">
            {results.map(user => (
              <div key={user.id} className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;