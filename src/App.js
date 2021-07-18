import React, { Component } from 'react';
import './App.css';
import data from './data'

let { routes, getAirlineById, getAirportByCode } = data

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
  <table>
    <th>Airline</th>
    <th>Source Airport</th>
    <th>Destination Airport</th>
    <tbody>
      {routes.map(route => {
        return (
          <tr>
            <td>{getAirlineById(route.airline)}</td>
            <td>{getAirportByCode(route.src)}</td>
            <td>{getAirportByCode(route.dest)}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
  </div>
)

export default App;