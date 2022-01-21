import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

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

  > a {
    margin-top: 1rem;
    color: var(--secondary-color);

    display: flex;
    align-items: center;

    img {
      margin-right: 0.5rem;
    }
  }
`;

export const Form = styled.form`
  width: 60%;

  h2 {
    color: var(--secondary-color);
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
  font-size: 1.25rem;

  ${({ selecioned }) => {
    if (!selecioned) {
      return css`
        background: transparent;
        border: 1px solid var(--primary-background);
        color: var(--secondary-color);
      `;
    } else {
      return css`
        background: var(--primary-background);
        border: 0;
        color: var(--primary-color);
      `;
    }
  }}
`;

export const Background = styled.section`
  flex: 1;
  background: url(${backgroundImage}) no-repeat;
  background-size: cover;
`;

export const Navigation = styled(Link)<{ active: boolean }>`
  visibility: ${({ active }) => active ? "visible" : "hidden"};
  color: var(--secondary-color);
`;