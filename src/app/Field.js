import React from 'react'
import styled from 'styled-components/macro'

export default function Field({
  children,
  color,
  onClick,
  isDisabled,
  isChecked,
}) {
  const handleClick = () => isDisabled || (onClick && onClick(children))

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

const Square = styled.div`
  display: flex;
  cursor: default;
  opacity: ${({ isDisabled, isChecked }) =>
    isDisabled && !isChecked ? 0.5 : 1};
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
