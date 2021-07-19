import React, { useState } from 'react'
import Select from './Select'

const Table = (props) => {
  const format = props.format
  const cols = props.columns
  const routes = props.rows
  const airlines = props.airlines
  const [start, setStart] = useState(0)
  const [currentRoutes, setCurrentRoutes] = useState(routes)
  const PAGE_SIZE = 25

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
  
  const paginationMessage = `Showing ${start} - ${start + PAGE_SIZE} routes of total ${currentRoutes.length} routes`
  const nextPage = () => {
    if (start === (currentRoutes.length - PAGE_SIZE)) return
    setStart(start + PAGE_SIZE)
  }
  const prevPage = () => {
    if (start === 0) return
    setStart(start - PAGE_SIZE)
  }

  const options = airlines.map(airline => airline.name)

  const changeHandler = (event) => {
  const airline = event.target.value
  if (airline === 'All Airlines') {
    setCurrentRoutes(routes)
    return
  }
  const airlineId = airlines.find(n => n.name === airline).id
  const selection = routes.filter(route => route.airline === airlineId)
  setCurrentRoutes(selection)
  }

  const bodyRows = currentRoutes.map(route => {
    return createRow(route)
  }).slice(start, start + PAGE_SIZE)
  
  return (
    <div>
      Show routes on <Select options={options}
                             valueKey='id'
                             titleKey='name'
                             allTitle='All Airlines'
                             value=''
                             onSelect={changeHandler}
                      /> fly in or out of 

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