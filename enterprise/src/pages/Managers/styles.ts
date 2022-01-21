import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;

  > div.cards {
    margin-top: 1rem;
  }
`;

export const Card = styled(Link)`
  width: 225px;
  background: var(--primary-background);
  border-radius: 0.25rem;
  color: #fff;
  border-radius: 0.4rem;
  cursor: pointer;

  img {
    width: 100%;
    border-radius: 0.25rem;
  }

  > div {
    padding: 0.5rem 0.3rem 1rem;

    h3 {
      font-size: 1.4rem;
      font-weight: 600;
    }

    div {
      margin-top: 0.25rem;
      display: flex;
      align-items: center;

      p {
        margin-left: 0.25rem;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.85);
      }
    }
  }
`;
