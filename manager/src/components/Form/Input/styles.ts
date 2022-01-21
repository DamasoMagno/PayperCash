import styled, { css } from "styled-components";

export const Container = styled.div<{ notValid: boolean }>`
  background: var(--secondary-background);
  padding: 0.25rem 1rem;
  position: relative;
  border-radius: .3rem;
  height: 3.75rem;
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.notValid ? "#FF0000" : "var(--primary-color)"};
  transition: border 0.2s;

  & + div {
    margin-top: ${(props) => props.notValid ? "1.125rem" : ".85rem"};
  }

  svg {
    margin-right: .125rem;
  }

  input {
    background-color: transparent;
    font-size: 1rem;
    color: #333;
    flex: 1;
    margin-left: .25rem;
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
    font-size: .85rem;
    transform: translate(-5%, 100%);
    bottom: 0;
    left: 0;
    padding: 0 .25rem;
    border-radius: .25rem;
  }
`;
