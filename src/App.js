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
    <Wrapper>
      <Rows>
        {rows.map((row, rowIndex) => (
          <Row
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            onFieldClick={onFieldClick}
          />
        ))}
      </Rows>
      <Nav>
        <Button onClick={reset} color="gray">
          Neues Spiel
        </Button>
        {history && (
          <Button onClick={undo} color="orange">
            Rückgängig
          </Button>
        )}
      </Nav>
    </Wrapper>
  )

  function reset() {
    if (window.confirm('Wirklich ein neues Spiel anfangenn?')) {
      setHistory(null)
      setRows(startData)
    }
  }

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

const Button = styled.div`
  cursor: default;
  margin-top: auto;
  height: 48px;
  padding: 0 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 2px solid ${p => p.color};
  color: ${p => p.color};
`

const Rows = styled.div`
  display: grid;
  gap: 2px;
`

const Nav = styled.footer`
  display: flex;
  justify-content: space-between;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
  height: 100%;
`
