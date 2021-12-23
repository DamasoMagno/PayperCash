import styled from "styled-components";

export const Container = styled.form`
  max-width: 90%;
  margin: 0 auto;
  padding: 1rem 0;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }
`;

export const Resolution = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.25);
  position: relative;
  border-radius: 0.25rem;

  label {
    left: 10px;
    top: -10px;
    border-radius: 1rem;
    padding: 0 0.5rem;
    position: absolute;
    font-size: 0.85rem;
    background: #fff;
  }

  input {
    padding: 1rem 1rem;
    background: transparent;
    font-size: 1rem;
  }

  textarea {
    resize: none;
    height: 5rem;
    padding: 0.5rem;
  }
`;

export const Buttons = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  button {
    height: 2rem;
    border-radius: 0.25rem;

    &.finish {
      background: #333;
      color: #fff;
    }
  }
`;
