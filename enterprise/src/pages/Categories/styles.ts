import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  flex: 1;
  margin: 1rem auto;
`;

export const NewCategory = styled.div`
  margin-top: 0.5rem;

  div.input {
    display: flex;

    div {
      position: relative;
      flex: 1;

      label {
        position: absolute;
        top: -10px;
        left: 10px;
        transform: translateY(10%);
        background: #fff;
        padding: 0 0.5rem;
        font-size: 0.8rem;
      }

      input {
        border: 1px solid red;
        width: 100%;
        font-size: 1.15rem;
        border: 1px solid rgba(0, 0, 0, 0.25);
        padding: 0.9rem;
        height: 2.5rem;
        color: #000;
        border-radius: 0.25rem;

        &:focus ~ label {
          font-weight: bold;
        }
      }
    }
  }

  button {
    margin-left: 0.25rem;
    background: var(--background);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
    padding: 0 1rem;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const Historic = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;
