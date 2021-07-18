import React from 'react';
import './App.css';
import Table from './components/Table'
import DATA from './data'

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

const routes = DATA.routes

function formatValue(property, value) {
   if (property === 'airline') {
     return DATA.getAirlineById(value).name
   } else if (property === 'airport') {
     return DATA.getAirportByCode(value).name
   }
}

const App = () => (
  <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <p>
        Welcome to the app!
      </p>
    </section>
    <Table className='routes-table' columns={columns} rows={routes} format={formatValue} />
  </div>
)

export default App;