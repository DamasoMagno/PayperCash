import styled from "styled-components";

export const Container = styled.form`
  margin: -3rem auto;
  background: #e5e5e5;
  max-width: 450px;
  padding: .5rem 1rem 1rem;
  border-radius: .25rem;
  display: flex;
  flex-direction: column;

  div.buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      display: flex;
      align-items: center;

      svg {
        margin-right: 0.25rem;
      }
    }

    button {
      background: transparent;
      border: 0;
    }
  }

  h2 {
    color: #333;
    text-align: center;
    margin-bottom: 1.25rem;
  }

  .confirmChanges {
    margin-top: 1rem;
    border-radius: .25rem;
    height: 2.5rem;
    color: var(--primary-color);
    background: #6320ee;
    border: 0;
    padding: 0 1rem;
    font-weight: 600;
    font-size: 1rem;
    align-self: flex-end;
    transition: filter .2s;

    &:hover {
      filter: brightness(.9);
    }
  }
`;
