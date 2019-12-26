import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components/macro'
import { produce } from 'immer'
import { startRows, startMissed } from './startData'
import Row from './Row'
import { save, load } from './localStorage'
import Result from './Result'
import MissRow from './MissRow'

export default function App() {
  const [rows, setRows] = useState(load('qwixx-rows') || startRows)
  const [history, setHistory] = useState(null)
  const [missed, setMissed] = useState(load('qwixx-missed') || startMissed)

  const numChecked = useMemo(
    () =>
      rows.map(row => row.boxes.reduce((a, b) => (b.checked ? a + 1 : a), 0)),
    [rows]
  )

  const isGameOver = useMemo(
    () =>
      missed.every(field => field.checked) ||
      rows.reduce((acc, row) => (row.isLocked ? acc + 1 : acc), 0) === 2,
    [rows, missed]
  )

  useEffect(() => {
    save('qwixx-rows', rows)
    save('qwixx-missed', missed)
  }, [rows, missed])

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
        <MissRow missed={missed} onMissed={handleMissed} />
      </Rows>
      {isGameOver && <Result numChecked={numChecked} missed={missed} />}
      <Nav>
        {isGameOver && (
          <Button onClick={reset} color="gray">
            Neues Spiel
          </Button>
        )}
        {history && (
          <Button onClick={undo} color="orange">
            Rückgängig
          </Button>
        )}
      </Nav>
    </Wrapper>
  )

  function handleMissed(index) {
    setHistory({ rows, missed })
    setMissed(
      produce(missed, draft => {
        draft[index].checked = true
      })
    )
  }

  function reset() {
    if (window.confirm('Wirklich ein neues Spiel anfangen?')) {
      setHistory(null)
      setRows(startRows)
      setMissed(startMissed)
    }
  }

  function undo() {
    setRows(history.rows)
    setMissed(history.missed)
    setHistory(null)
  }

  function lockRow(rowIndex) {
    setHistory({ rows, missed })
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

    setHistory({ rows, missed })

    is12AndAllowed
      ? setRows(
          produce(rows, rowsDraft => {
            const row = rowsDraft[rowIndex]
            row.isLocked = true
            const boxes = row.boxes
            boxes[boxIndex].checked = true
            boxes[boxIndex + 1].checked = true
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
