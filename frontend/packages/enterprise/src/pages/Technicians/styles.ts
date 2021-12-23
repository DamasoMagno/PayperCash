import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  flex-direction: column;
  display: flex;
  margin: 1rem auto;
  width: 800px;

  button {
      background: var(--background);
      padding: 0 1rem;
      color: #FFF;
      border-radius: .25rem;
      font-weight: 500;
      height: 2.5rem;
      transition: filter .2s;

      &:hover {
        filter: ${darken(.9, "#333")};
      }
    }
`;
