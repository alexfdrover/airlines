import React from 'react'

const Table = (props) => {
  const format = props.format
  const cols = props.columns
  const routes = props.rows

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

  const bodyRows = routes.map(route => {
    return createRow(route)
  })
  
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
    </div>
  )
}

export default Table