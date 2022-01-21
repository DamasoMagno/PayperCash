import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled(Link)`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
  align-items: center;
  background: var(--secondary-background);
  color: #fff;
  transition: 0.2s filter;

  & + a {
    margin-top: 0.5rem;
  }

  &:hover {
    filter: brightness(0.9);
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h3 {
      color: var(--secondary-color);
    }

    > div.subtitle {
      margin-top: 0.3rem;
      display: flex;
      align-items: center;

      p {
        color: #545454;
        font-size: 0.85rem;
        margin-left: .25rem;
      }
    }
  }
`;
