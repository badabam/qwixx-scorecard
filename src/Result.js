import React from 'react'

export default function Result({ numChecked, missed }) {
  const [red, yellow, green, blue] = numChecked.map(n => factorial(n))
  const totalMissed = missed.reduce((a, c) => (c.checked ? a + c.value : a), 0)
  return (
    <div>
      {red} {yellow} {green} {blue}
      {totalMissed}
      Gesamt: {red + yellow + green + blue + totalMissed}
    </div>
  )
}

function factorial(num) {
  if (num === 0) return 0
  return num + factorial(num - 1)
}
