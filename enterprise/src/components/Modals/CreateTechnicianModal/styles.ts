import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 90%;
  margin: 0 auto;
  padding: 1rem;

  h2 {
    margin-bottom: 1rem;
  }

  div.buttons {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    button {
      border-radius: 0.25rem;
      padding: 1rem;
      font-size: 1rem;
      font-weight: 500;

      &.cancel {
        background: transparent;
        color: var(--secondary-color);
        border: 1px solid var(--secondary-color);
      }

      &.create {
        color: var(--primary-color);
        background: var(--primary-background);
      }
    }
  }
`;
