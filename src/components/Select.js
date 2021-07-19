import React from 'react'

const Select = ({ options, valueKey, titleKey, allTitle, value, onSelect }) => {
  const displayOptions = options.map(option => {
    return <option key={option}>{option}</option>
  })

  return (
    <select onChange={onSelect}>
      <option>{allTitle}</option>
      {displayOptions}
    </select>
  )
}

export default Select