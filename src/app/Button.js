import styled from 'styled-components/macro'

export default styled.div`
  cursor: default;
  padding: 0 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 2px solid ${p => p.color};
  color: ${p => p.color};
`
