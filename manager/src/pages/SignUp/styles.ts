import styled from "styled-components";

import backgroundImage from "../../assets/background.png";

export const Container = styled.div`
  background: #333333;
  height: 100vh;
  display: flex;
`;

export const Form = styled.div`
  width: 100%;
  max-width: 720px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    text-align: center;
    width: 60%;

    h2 {
      margin-bottom: 2rem;
      font-size: 2rem;
      text-transform: uppercase;
      color: #ffffff;
    }

    input {
      width: 100%;
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
  }

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

export const Background = styled.section`
  flex: 1;
  background: url(${backgroundImage}) no-repeat;
  background-size: cover;
`;
