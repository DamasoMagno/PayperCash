import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h3 {
    text-align: center;
    color: red;
  }

  p {
    margin: 1rem 0 2rem;
    line-height: 1.5rem;
    color: rgba(0, 0,  0, .5);
  }

  div.alertMessage {
    display: flex;
    align-items: center;
    align-self: center;

    svg {
      margin-right: .25rem;
    }
  }

  div.buttons {
    width: 80%;
    display: flex;

    button {
      color: red;
      border: 1px solid red;
      background-color: transparent;
      border-radius: 0.25rem;
      flex: 1;
      height: 2.5rem;

      &.remove {
        background: red;
        color: var(--primary-color);
      }

      & + button {
        margin-left: .25rem;
      }
    }
  }
`;