import React from 'react'
import styled, { keyframes } from 'styled-components/macro'

export default function Field({
  children,
  color,
  onClick,
  isDisabled,
  isChecked,
  isHighlighted,
}) {
  const handleClick = () => isDisabled || (onClick && onClick(children))

  return (
    <Square
      color={color}
      isDisabled={isDisabled}
      onClick={handleClick}
      isChecked={isChecked}
    >
      {isChecked && <Cross />}
      <Num doWobble={isHighlighted}>{children}</Num>
    </Square>
  )
}

const wobble = keyframes`
  from {
    transform: scale(1)
  }

  to {
    transform: scale(1.2)
  }
`

const Num = styled.span`
  position: relative;
  z-index: 20;
  animation-name: ${({ doWobble }) => (doWobble ? wobble : 'none')};
  filter: ${({ doWobble }) =>
    doWobble ? 'drop-shadow(0 0 3px white);' : 'none'};
  animation-duration: 0.8s;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  animation-iteration-count: ${({ doWobble }) => (doWobble ? 'infinite' : '0')};
`

const pop = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`

const Cross = styled.div.attrs({ children: '✗' })`
  color: black;
  font-weight: 700;
  font-size: 3em;
  margin-top: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  width: 100%;
  top: 0;
  height: 100%;
  z-index: 10;
  animation: ${pop} 0.2s ease-out forwards;
`

const Square = styled.div`
  display: flex;
  cursor: default;
  opacity: ${({ isDisabled, isChecked }) => (isDisabled && !isChecked ? 1 : 1)};
  justify-content: center;
  align-items: center;
  color: ${({ isDisabled, isChecked }) =>
    isDisabled && !isChecked ? '#fff8' : 'white'};
  background: ${({ color }) => color};
  position: relative;

  &::before {
    content: '';
    display: block;
    /* padding-bottom: 100%; */
  }
`
