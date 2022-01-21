import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  & + div {
    margin-top: .85rem;
  }

  label {
    font-size: .85rem;
  }

  div {
    display: flex;
    align-items: center;
    background: var(--secondary-background);
    border-radius: 0.25rem;
    padding: .5rem .5rem;

    p {
      color: #333;
      font-weight: 500;
      font-size: 1rem;
      width: 100%;
      word-break: break-word;
    }

    button {
      background: transparent;
      padding: 0 0.25rem;
    }
  }
`;
