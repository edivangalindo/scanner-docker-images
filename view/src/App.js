import React from 'react';
import useResults from './hooks/useResults'
import Logo from './components/Logo';
import Table from './components/Table';
import useColumns from './hooks/useColumns';
import './assets/App.css';

function App() {
  const columns = useColumns();
  const results = useResults();

  return (
    <>
      <Logo />
      <div className="App">
        <Table columns={columns} results={results} />
      </div>
    </>
  );
}

export default App;
