const ascendingRow = Array(11)
  .fill()
  .map((_, i) => ({ value: i + 2 }))

const descendingRow = Array(11)
  .fill()
  .map((_, i, a) => ({ value: a.length + 1 - i }))

export const startRows = [
  {
    name: 'red',
    color: 'crimson',
    boxes: [...ascendingRow.slice(), { value: 'lock' }],
  },
  {
    name: 'yellow',
    color: '#d6a400',
    boxes: [...ascendingRow.slice(), { value: 'lock' }],
  },
  {
    name: 'green',
    color: '#038946',
    boxes: [...descendingRow.slice(), { value: 'lock' }],
  },
  {
    name: 'blue',
    color: '#444fbf',
    boxes: [...descendingRow.slice(), { value: 'lock' }],
  },
]

export const startMissed = [
  { checked: false, value: -5 },
  { checked: false, value: -5 },
  { checked: false, value: -5 },
  { checked: false, value: -5 },
]
