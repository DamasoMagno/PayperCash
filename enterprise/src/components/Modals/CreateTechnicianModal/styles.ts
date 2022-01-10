import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 90%;
  margin: auto;
  padding: 1rem;

  h2 {
    margin-bottom: 1rem;
  }

  div.input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: .5rem;

    input {
      border: 1px solid rgba(0, 0, 0, 0.25);
      padding: 0.85rem 0.5rem;
      font-size: 1rem;
      display: flex;
      align-self: stretch;
      border-radius: 0.25rem;
    }

    p {
      font-size: .85rem;
    }
  }

  div.buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    button {
      background: #eee;
      border-radius: 0.25rem;
      padding: 1rem;
      font-size: 1rem;

      &.create {
        color: var(--primary-color);
        background: var(--primary-button);
      }
    }
  }
`;
