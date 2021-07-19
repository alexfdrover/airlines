import React, { useState } from 'react'
import Select from './Select'

const Table = (props) => {
  const format = props.format
  const cols = props.columns
  const routes = props.rows
  const airlines = props.airlines
  const airports = props.airports

  const [start, setStart] = useState(0)
  const PAGE_SIZE = 25
  
  const [state, setState] = useState({
    airlineFilter: 'all',
    airportFilter: 'all',
    view: routes
  })

  const genKey = route => {
    return `${route.airline}/${route.src}/${route.dest}`
  }

  const createRow = route => {
    return (
      <tr key={genKey(route)}>
        <td>{format('airline', route.airline)}</td>
        <td>{format('airport', route.src)}</td>
        <td>{format('airport', route.dest)}</td>
      </tr>
    )
  }

  const headerCells = cols.map(col => {
    return <th key={col.name}>{col.name}</th>
  })
  
  const paginationMessage = `Showing ${start} - ${start + PAGE_SIZE} routes of total ${state.view.length} routes`
  const nextPage = () => {
    if (start === (state.view.length - PAGE_SIZE)) return
    setStart(start + PAGE_SIZE)
  }
  const prevPage = () => {
    if (start === 0) return
    setStart(start - PAGE_SIZE)
  }

  const airlineOptions = airlines.map(airline => airline.name)
  const airportOptions = airports.map(airport => `${airport.name} (${airport.code})`)

  const filterRoutes = (airlineFilter, airportFilter) => {
    if (airlineFilter === 'all' && airportFilter === 'all') {
      return routes
    } else if (airlineFilter !== 'all' && airportFilter === 'all') {
      return routes.filter(route => {
        return (route.airline === airlineFilter)
      })
    } else if (airlineFilter === 'all' && airportFilter !== 'all') {
      return routes.filter(route => {
        return route.src === airportFilter || route.dest === airportFilter
      })
    } else {
      return routes.filter(route => {
        return (route.airline === airlineFilter && (route.src === airportFilter || route.dest === airportFilter))
      })
    }
  }

  const changeAirlineHandler = (event) => {
    setStart(0)
    const airline = event.target.value
    let { airlineFilter, airportFilter, view } = state

    if (airline === 'All Airlines') {
      airlineFilter = 'all'
    } else {
      airlineFilter = airlines.find(n => n.name === airline).id
    }
    view = filterRoutes(airlineFilter, airportFilter)
    setState({airlineFilter, airportFilter, view})
  }

  const changeAirportHandler = (event) => {
    setStart(0)
    const airport = event.target.value.split(' (')[0]
    let { airlineFilter, airportFilter, view } = state

    if (airport === 'All Airports') {
      airportFilter = 'all'
    } else {
      airportFilter = airports.find(n => n.name === airport).code
    }
    view = filterRoutes(airlineFilter, airportFilter)
    setState({airlineFilter, airportFilter, view})
  }

  const bodyRows = state.view.map(route => {
    return createRow(route)
  }).slice(start, start + PAGE_SIZE)
  
  return (
    <div>
      Show routes on
        <Select options={airlineOptions}
          valueKey='id'
          titleKey='name'
          allTitle='All Airlines'
          value=''
          onSelect={changeAirlineHandler}
        />
      fly in or out of
        <Select options={airportOptions}
          valueKey='id'
          titleKey='name'
          allTitle='All Airports'
          value=''
          onSelect={changeAirportHandler}
        />

      <table>
        <thead>
          <tr>{headerCells}</tr>
        </thead>
        <tbody>
          {bodyRows}
        </tbody>
      </table>

      <button onClick={() => prevPage()}>Previous Page</button>
      {paginationMessage}
      <button onClick={() => nextPage()}>Next Page</button>
    </div>
  )
}

export default Table