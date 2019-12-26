import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components/macro'
import { produce } from 'immer'
import { startRows, startMissed } from './startData'
import Row, { RowGrid } from './Row'
import { save, load } from './localStorage'
import Result from './Result'
import Missed from './Missed'

export default function App() {
  const [history, setHistory] = useState(load('qwixx-history') || null)
  const [rows, setRows] = useState(load('qwixx-rows') || startRows)
  const [missed, setMissed] = useState(load('qwixx-missed') || startMissed)
  const [forceGameOver, setForceGameOver] = useState(
    load('qwixx-gameover') || false
  )

  const isGameOver = useMemo(
    () =>
      forceGameOver ||
      missed.every(field => field.checked) ||
      rows.reduce((acc, row) => (row.isLocked ? acc + 1 : acc), 0) === 2,
    [rows, missed, forceGameOver]
  )

  useEffect(() => {
    save('qwixx-history', history)
    save('qwixx-rows', rows)
    save('qwixx-missed', missed)
    save('qwixx-gameover', forceGameOver)
  }, [history, rows, missed, forceGameOver])

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
        <RowGrid>
          <div css="display: flex; grid-column: span 8; align-items: center">
            {isGameOver && <Result rows={rows} missed={missed} />}
          </div>
          <div css="grid-column: span 4;">
            <Missed missed={missed} onMissed={handleMissed} />
          </div>
        </RowGrid>
      </Rows>
      <Nav>
        {isGameOver ? (
          <Button onClick={reset} color="gray">
            Neues Spiel
          </Button>
        ) : (
          <Button onClick={finish} color="crimson">
            Spiel beenden
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

  function finish() {
    if (window.confirm('Das Spiel beenden?')) {
      setForceGameOver(true)
      setHistory(null)
    }
  }

  function reset() {
    if (window.confirm('Wirklich ein neues Spiel anfangen?')) {
      setHistory(null)
      setRows(startRows)
      setMissed(startMissed)
      setForceGameOver(false)
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
    if (isGameOver || forceGameOver) {
      return
    }

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
  height: 100%;
`
