import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled(Link)`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
  align-items: center;
  background: var(--background);
  color: #fff;
  transition: 0.2s filter;

  & + a {
    margin-top: .5rem;
  }

  &:hover {
    filter: brightness(0.9);
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p {
      font-size: .85rem;
      margin-top: .25rem;
    }
  }
`;