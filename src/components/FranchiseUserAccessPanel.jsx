import React, { useEffect, useState } from 'react';

export function FranchiseUserAccessPanel({ supabase }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('users') // 
          .select('*');

        if (error) throw error;
        setUsers(data);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [supabase]);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>👥 Franchise User Access Panel</h2>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {users.length > 0 ? (
            users.map((user, index) => (
              <li key={index}>
                <strong>{user.name || user.email || 'Unnamed User'}</strong>
              </li>
            ))
          ) : (
            <li>No users found.</li>
          )}
        </ul>
      )}
    </div>
  );
}
