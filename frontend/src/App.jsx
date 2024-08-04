import React, { useEffect, useState } from 'react';
import './App.css'; 
import CardList from './components/CardList';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-black'>
      <CardList users={users} />
    </div>
  );
};

export default App;