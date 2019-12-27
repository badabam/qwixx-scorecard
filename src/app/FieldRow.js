import React from 'react'
import Lock from './Lock'
import styled from 'styled-components/macro'
import Field from './Field'

export default function FieldRow({ row, rowIndex, onFieldClick }) {
  return (
    <FieldRowGrid key={row.name}>
      {row.boxes.map((box, boxIndex) => {
        const highestIndex = row.boxes.reduce(
          (acc, box, index) => (box.checked ? index : acc),
          0
        )

        const isDisabled = row.isLocked || boxIndex < highestIndex
        return (
          <Field
            key={row.name + boxIndex}
            color={row.color}
            onClick={() => onFieldClick(rowIndex, boxIndex)}
            isDisabled={isDisabled}
            isChecked={box.checked}
          >
            {box.value === 'lock' ? (
              <Lock isLocked={row.isLocked} />
            ) : (
              box.value
            )}
          </Field>
        )
      })}
    </FieldRowGrid>
  )
}

export const FieldRowGrid = styled.section`
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 1fr;
`
