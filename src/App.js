import React, { useState } from 'react'
import Lock from './Lock'
import styled from 'styled-components/macro'
import { produce } from 'immer'

function App() {
  const ascendingRow = Array(11)
    .fill()
    .map((_, i) => String(i + 2))

  const descendingRow = Array(11)
    .fill()
    .map((_, i, a) => String(a.length + 1 - i))

  const [rows, setRows] = useState([
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
  ])

  return (
    <Grid>
      {rows.map((row, rowIndex) => (
        <Row key={row.name}>
          {row.boxes.map((box, boxIndex) => {
            const highestIndex = row.boxes.reduce(
              (acc, box, index) => (box.checked ? index : acc),
              0
            )

            const isDisabled = row.isLocked || boxIndex < highestIndex
            return (
              <Box
                key={row.name + boxIndex}
                color={row.color}
                onClick={() => onBoxClick(rowIndex, boxIndex)}
                isDisabled={isDisabled}
                isChecked={box.checked}
              >
                {box.value}
              </Box>
            )
          })}
          <Box
            color={row.color}
            onClick={() => onBoxClick(rowIndex, 11)}
            isChecked={row.boxes[10].checked}
          >
            <Lock isLocked={row.isLocked} />
          </Box>
        </Row>
      ))}
    </Grid>
  )

  function lockRow(rowIndex) {
    setRows(
      produce(rows, rowsDraft => {
        rowsDraft[rowIndex].isLocked = true
      })
    )
  }

  function onBoxClick(rowIndex, boxIndex) {
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

function Box({ children, color, onClick, isDisabled, isChecked }) {
  const handleClick = () => isDisabled || onClick(children)

  return (
    <Square
      color={color}
      isDisabled={isDisabled}
      onClick={handleClick}
      isChecked={isChecked}
    >
      {children}
    </Square>
  )
}

const Grid = styled.div`
  display: grid;
  gap: 2px;
`

const Row = styled.section`
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 1fr;
`

const Square = styled.div`
  display: flex;
  cursor: default;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  justify-content: center;
  align-items: center;
  color: white;
  background: ${({ color }) => color};
  position: relative;

  &::after {
    content: '';
    display: ${({ isChecked }) => (isChecked ? 'block' : 'none')};
    background: linear-gradient(
        45deg,
        transparent 48%,
        white 48%,
        white 52%,
        transparent 52%
      ),
      linear-gradient(
        135deg,
        transparent 48%,
        white 48%,
        white 52%,
        transparent 52%
      );
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    height: 100%;
  }

  &::before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`

export default App
