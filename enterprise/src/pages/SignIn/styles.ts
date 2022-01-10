import styled from "styled-components";

import backgroundImage from "../../assets/background.png";

export const Container = styled.div`
  background: var(--background);
  height: 100vh;
  display: flex;
`;

export const Form = styled.div`
  width: 100%;
  max-width: 720px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > a {
    margin-top: 1rem;
    color: #fff;

    display: flex;
    align-items: center;

    img {
      margin-right: 0.5rem;
    }
  }
`;

export const InputsForm = styled.form`
  width: 60%;

  h2 {
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const TypeAccount = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

export const Type = styled.button<{ selecioned: boolean }>`
  padding: 0.5rem 1rem;
  color: #000;
  height: 3.5rem;
  border-radius: 0.25rem;
  background: ${({ selecioned }) =>
    selecioned ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)"};
  border: 1px solid #fff;
  font-size: 1.25rem;
`;

export const Background = styled.section`
  flex: 1;
  background: url(${backgroundImage}) no-repeat;
  background-size: cover;
`;
