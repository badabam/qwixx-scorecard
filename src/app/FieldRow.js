import React from 'react'
import Lock from './Lock'
import styled from 'styled-components/macro'
import Field from './Field'

export default function FieldRow({ row, rowIndex, onFieldClick }) {
  return (
    <FieldRowGrid key={row.name}>
      {row.boxes.map((box, boxIndex) => {
        const { highestIndex, totalChecked } = row.boxes.reduce(
          (acc, box, index) =>
            box.checked
              ? { highestIndex: index, totalChecked: acc.totalChecked + 1 }
              : acc,
          { highestIndex: 0, totalChecked: 0 }
        )

        const isDisabled = row.isLocked || boxIndex < highestIndex
        const isHighlighted =
          totalChecked >= 5 && !isDisabled && boxIndex === row.boxes.length - 2
        return (
          <Field
            key={row.name + boxIndex}
            color={row.color}
            onClick={() => onFieldClick(rowIndex, boxIndex)}
            isDisabled={isDisabled}
            isChecked={box.checked}
            isHighlighted={isHighlighted}
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
