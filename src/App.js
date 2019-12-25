import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { produce } from 'immer'
import startData from './startData'
import Row from './Row'
import { save, load } from './localStorage'

export default function App() {
  const [rows, setRows] = useState(startData)
  const [history, setHistory] = useState(null)

  useEffect(() => {
    setRows(load('qwixx-rows'))
  }, [])

  useEffect(() => {
    save('qwixx-rows', rows)
  }, [rows])

  return (
    <Grid>
      {rows.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          onFieldClick={onFieldClick}
        />
      ))}
      <nav>{history && <button onClick={undo}>Rückgängig</button>}</nav>
    </Grid>
  )

  function undo() {
    setHistory(null)
    setRows(history)
  }

  function lockRow(rowIndex) {
    setHistory(rows)
    setRows(
      produce(rows, rowsDraft => {
        rowsDraft[rowIndex].isLocked = true
      })
    )
  }

  function onFieldClick(rowIndex, boxIndex) {
    const isLock = boxIndex === 11
    if (isLock) {
      return lockRow(rowIndex)
    }

    const is12AndAllowed =
      boxIndex === 10 &&
      rows[rowIndex].boxes.reduce(
        (acc, box) => (box.checked ? acc + 1 : acc),
        0
      ) >= 5

    setHistory(rows)

    is12AndAllowed
      ? setRows(
          produce(rows, rowsDraft => {
            const row = rowsDraft[rowIndex]
            row.isLocked = true
            const boxes = row.boxes
            boxes[boxIndex].checked = true
          })
        )
      : setRows(
          boxIndex === 10
            ? rows
            : produce(rows, rowsDraft => {
                const boxes = rowsDraft[rowIndex].boxes
                boxes[boxIndex].checked = true
              })
        )
  }
}

const Grid = styled.div`
  display: grid;
  gap: 2px;
`
