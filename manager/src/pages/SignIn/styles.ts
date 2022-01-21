import styled from "styled-components";

import backgroundImage from "../../assets/background.png";

export const Container = styled.div`
  height: 100vh;
  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 720px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
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
  width: 60%;

  @media(max-width: 720px){
    width: 70%;
  }

  h2 {
    color: var(--secondary-color);
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const Background = styled.section`
  flex: 1;
  background: url(${backgroundImage}) no-repeat;
  background-size: cover;
`;
