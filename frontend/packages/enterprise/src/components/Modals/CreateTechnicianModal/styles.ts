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

  input {
    border: 1px solid rgba(0, 0, 0, .25);
    margin-bottom: 1rem;
    padding: .85rem .5rem;  
    font-size: 1rem;
    border-radius: .25rem;
  }

  div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    
    button {
      background: #eee;
      border-radius: .25rem;
      padding: 1rem;
      font-size: 1rem;

      &.create {
        color: var(--primary-color);
        background: var(--primary-button);
      }
    }
  }
`;