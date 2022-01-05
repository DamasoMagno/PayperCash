import styled, { css, keyframes } from "styled-components";


export const Container = styled.div<{ notValid: boolean }>`
  background: #232129;
  padding: 0.25rem 1rem;
  position: relative;
  border: 1px solid #232129;
  transition: border .2s;
  ${({notValid}) => {
    return notValid && css`
      border: 1px solid red;;
    `;
  }}
  border-radius: 0.4rem;
  height: 3.75rem;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 1.25rem;
  }

  svg {
    margin-right: 0.1rem;
  }

  input {
    background-color: transparent;
    font-size: 1rem;
    color: #ffffff;
    flex: 1;
    height: 100%;
    border: 0;
    outline: 0;
  }

  button {
    background: transparent;
    border: 0;
  }

  p {
    position: absolute;
    color: rgba(255, 0, 0, 1);
    bottom: 0;
    transform: translateY(100%);
    left: 0;
  }
`;