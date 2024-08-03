import React from 'react';
import './App.css'; 
import CardList from './components/CardList';
import data from './components/data.json'; // Adjust the path as necessary



const App = () => {
  return (
    <div className='bg-black'>
      <CardList data={data} />
    </div>
  );
};

export default App;