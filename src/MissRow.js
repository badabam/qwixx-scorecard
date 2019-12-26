import React from 'react'
import Field from './Field'
import styled from 'styled-components/macro'

export default function MissRow({ missed, onMissed }) {
  return (
    <Wrapper>
      {missed.map((field, index) => (
        <Field
          isChecked={field.checked}
          key={index}
          color="slategray"
          onClick={() => onMissed(index)}
        >
          {field.value}
        </Field>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  width: calc(4 / 12 * 100%);
  margin-left: auto;
  gap: 2px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
`
