import styled from "styled-components";

export const Container = styled.div`
  background: #232129;
  padding: .25rem 1rem;
  border-radius: .4rem;
  height: 3.75rem;
  display: flex;
  align-items: center;

  & + div {
    margin-top: .5rem;
  }

  svg {
    margin-right: .1rem;
  }

  input {
    background-color: transparent;
    font-size: 1rem;
    color: #FFFFFF;
    flex:  1;
    height: 100%;
    border: 0;
    outline: 0;
  }

  button {
    background: transparent;
    border: 0;
  } 
`;