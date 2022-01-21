import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  flex-direction: column;
  display: flex;
  margin: 1rem auto;
  width: 800px;

  main {
    margin-top: 1rem;

    div.new{
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        background: var(--primary-background);
        padding: 0 2rem;
        color: var(--primary-color);
        border-radius: 0.25rem;
        font-weight: 500;
        height: 2.5rem;
        transition: filter 0.2s;
      }
    }
  }
`;
