const ascendingRow = Array(11)
  .fill()
  .map((_, i) => String(i + 2))

const descendingRow = Array(11)
  .fill()
  .map((_, i, a) => String(a.length + 1 - i))

export default [
  {
    name: 'red',
    color: 'crimson',
    boxes: [
      ...ascendingRow.map(value => ({
        value,
      })),
    ],
  },
  {
    name: 'yellow',
    color: 'goldenrod',
    boxes: [
      ...ascendingRow.map(value => ({
        value,
      })),
    ],
  },
  {
    name: 'green',
    color: 'green',
    boxes: [
      ...descendingRow.map(value => ({
        value,
      })),
    ],
  },
  {
    name: 'blue',
    color: 'cornflowerblue',
    boxes: [
      ...descendingRow.map(value => ({
        value,
      })),
    ],
  },
]
