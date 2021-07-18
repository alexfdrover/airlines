import React, { Component } from 'react';
import './App.css';
import data from './data'
const routes = data.routes

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
    {routes.map(route => {
      return (
        <tr>
          <td>{route.airline}</td>
          <td>{route.src}</td>
          <td>{route.dest}</td>
        </tr>
      )
    })}
  </table>
  </div>
)

export default App;