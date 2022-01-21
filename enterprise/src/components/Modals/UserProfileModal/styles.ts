import styled from "styled-components";

export const Container = styled.form`
  max-width: 90%;
  text-align: center;
  margin: 0 auto;

  h2 {
    margin: 1rem 0 1.5rem;
  }

  div.buttons {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    button {
      padding: 1rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 1rem;
      font-weight: 500;

      &.edit {
        background-color: var(--primary-background);
        color: var(--primary-color);
      }
    }
  }
`;
