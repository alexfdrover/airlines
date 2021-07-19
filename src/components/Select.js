import React from 'react'

const Select = ({ options, allTitle, onSelect, filterType, filterValue }) => {
  const displayOptions = options.map(option => {
    let disabled;
    if (filterType === 'airline') {
      if (option.key !== filterValue && filterValue !== 'all') disabled = true
    } else if (filterType === 'airport') {
      if (option.key !== filterValue && filterValue !== 'all') disabled = true
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