import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;

  p {
    margin: 1rem auto 2rem;
    max-width: 300px;
    line-height: 1.5rem;
    color: rgba(0, 0, 0, 0.5);
  }

  div.alertMessage {
    display: flex;
    align-items: center;
    align-self: center;

    h3 {
      text-align: center;
      color: red;
    }

    svg {
      margin-right: 0.25rem;
    }
  }

  div.buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;

    button {
      color: red;
      border: 1px solid red;
      background-color: transparent;
      border-radius: 0.25rem;
      padding: 0.85rem 0rem;

      &.remove {
        background: red;
        color: var(--primary-color);
      }
    }
  }
`;
