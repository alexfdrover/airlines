import React from 'react'
import DATA from '../data'
const routes = DATA.routes

const Select = ({ options, allTitle, onSelect, filterType, filterValue }) => {
  const validRoutes = routes.filter(({ airline, src, dest }) => {
    return (airline === filterValue || src === filterValue || dest === filterValue || filterValue === 'all');
  })

  const validCodes = []
  validRoutes.forEach(route => {
    if (!validCodes.includes(route.src)) validCodes.push(route.src)
    if (!validCodes.includes(route.dest)) validCodes.push(route.dest)
  })

  const displayOptions = options.map(option => {
    let disabled;
    if (filterType === 'airline') {
      if (option.key !== filterValue && filterValue !== 'all') disabled = true
    } else if (filterType === 'airport') {
      if (!validCodes.includes(option.key)) disabled = true
    }
    return <option key={option.key} disabled={disabled} >{option.name}</option>
  })

  return (
    <select onChange={onSelect}>
      <option>{allTitle}</option>
      {displayOptions}
    </select>
  )
}

export default Select