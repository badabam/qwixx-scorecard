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
          New Game
        </Button>
      ) : (
        <Button onClick={finish} color="crimson">
          End game
        </Button>
      )}
      {history && (
        <Button onClick={undo} color="orange">
          Undo
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
