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

  input {
    font-size: 1.25rem;
    outline: 0;
    border: 0;
    margin: 0 .85rem;
    border-radius: 0.25rem;
    font-weight: 700;
    background: transparent;
    color: #fff;

    & + input {
      margin-top: 1rem;
    }
  }

  button {
    background: transparent;
    border: 0;
  }
`;
