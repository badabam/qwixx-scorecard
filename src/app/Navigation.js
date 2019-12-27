import React from 'react'
import Button from './Button'
import styled from 'styled-components/macro'

export default function Navigation({
  isGameOver,
  history,
  reset,
  finish,
  undo,
}) {
  return (
    <Wrapper>
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
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`
