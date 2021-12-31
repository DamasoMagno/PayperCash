import styled from "styled-components";

import backgroundImage from "../../assets/background.png";

export const Container = styled.div`
  background: var(--heading);
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
      color: #fff;
      margin-bottom: 2.25rem;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 2rem;
    }

    input {
      width: 100%;
      font-size: 1.25rem;
      padding: 1rem;
      border: 0;
      border-radius: 0.25rem;
      font-weight: 700;

      & + input {
        margin-top: 1rem;
      }
    }

    input {
      background: #232129;
      color: #fff;
    }
  }

  > a {
    margin-top: 2rem;
    color: #fff;

    display: flex;
    align-items: center;

    img {
      margin-right: 0.5rem;
    }
  }
`;

export const Background = styled.section`
  flex: 1;
  background: url(${backgroundImage}) no-repeat;
  background-size: cover;
`;
