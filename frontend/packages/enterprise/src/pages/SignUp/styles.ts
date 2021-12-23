import styled from "styled-components";

import backgroundImage from "../../assets/background.png";

export const Container = styled.div`
  background: #333333;
  height: 100vh;
  display: flex;
`;

export const Form = styled.div`
  width: 60%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > a {
    margin-top: 1rem;
    color: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

export const InputsForm = styled.form`
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    text-transform: uppercase;
    color: #ffffff;
  }

  input {
    font-size: 1.25rem;
    padding: 1rem;
    border: 0;
    border-radius: 0.25rem;
    background: #232129;
    color: #ffffff;
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
