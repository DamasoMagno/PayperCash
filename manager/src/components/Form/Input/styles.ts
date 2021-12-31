import styled from "styled-components";

export const Container = styled.div`
  background: #232129;
  padding: 0.25rem 1rem;
  border-radius: 0.4rem;
  height: 3.75rem;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 0.5rem;
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
`;
