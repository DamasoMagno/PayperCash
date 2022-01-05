import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  & + div {
    margin-top: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.85rem;
  }

  > div {
    background-color: #eee;

    .contentInput {
      display: flex;

      p {
        padding: 0.5rem;
        color: #333;
        font-weight: 500;
        opacity: 1;
        font-size: 1rem;
        flex: 1;
      }

      button {
        background: transparent;
        padding: 0 .25rem;
      }
    }

    span {
      display: block;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
`;
