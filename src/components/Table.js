import React, { useState } from 'react'

const Table = (props) => {
  const format = props.format
  const cols = props.columns
  const routes = props.rows
  const [start, setStart] = useState(0)
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
  
  let message = `Showing ${start} - ${start + PAGE_SIZE} routes of total ${routes.length} routes`
  const nextPage = () => {
    if (start === (routes.length - PAGE_SIZE)) return
    setStart(start + PAGE_SIZE)
  }
  
  const prevPage = () => {
    if (start === 0) return
    setStart(start - PAGE_SIZE)
  }


  const bodyRows = routes.map(route => {
    return createRow(route)
  }).slice(start, start + PAGE_SIZE)
  
  return (
    <div>
      <table>
        <thead>
          <tr>{headerCells}</tr>
        </thead>
        <tbody>
          {bodyRows}
        </tbody>
      </table>
      <button onClick={() => prevPage()}>Previous Page</button>
      {message}
      <button onClick={() => nextPage()}>Next Page</button>
    </div>
  )
}

export default Table