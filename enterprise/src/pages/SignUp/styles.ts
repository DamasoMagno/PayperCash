import styled from "styled-components";

import backgroundImage from "../../assets/background.png";

export const Container = styled.div`
  height: 100vh;
  display: flex;
`;

export const Content = styled.div`
  width: 60%;
  max-width: 720px;
  display: flex;  
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > a {
    margin-top: 1rem;
    color: var(--secondary-color);
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

export const Form = styled.form`
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    text-transform: uppercase;
    color: var(--secondary-color);
  }

  input {
    font-size: 1.25rem;
    padding: 1rem;
    border: 0;
    border-radius: 0.25rem;
    color: #333;
    outline: 0;

    & + input {
      margin-top: 0.5rem;
    }
  }
`;

export const Background = styled.section`
  flex: 1;
  background: url(${backgroundImage}) no-repeat;
  background-size: cover;
`;
