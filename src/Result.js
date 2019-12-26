import React, { useMemo } from 'react'
import styled from 'styled-components/macro'

export default function Result({ rows, missed }) {
  const results = useMemo(
    () =>
      rows.map(row => ({
        color: row.color,
        total: factorial(
          row.boxes.reduce((a, b) => (b.checked ? a + 1 : a), 0)
        ),
      })),
    [rows]
  )
  // const [red, yellow, green, blue] = numChecked.map(n => factorial(n))
  const totalMissed = missed.reduce((a, c) => (c.checked ? a + c.value : a), 0)
  return (
    <Wrapper>
      <span>Ergebnis: </span>
      {results.map(({ color, total }) => (
        <span key={color} css={{ color }}>
          {total}
        </span>
      ))}
      <span css={{ color: 'gray' }}>{totalMissed}</span>
      <strong css="display: grid; grid-auto-flow: column;">
        <span css={{ color: 'black' }}>
          Gesamt: {results.reduce((a, c) => a + c.total, 0) + totalMissed}
        </span>
      </strong>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 8px;
  grid-auto-flow: column;
  align-items: center;
  grid-auto-rows: 1fr;
`

function factorial(num) {
  if (num === 0) return 0
  return num + factorial(num - 1)
}
