import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 1rem auto;

  h1 {
    text-align: center;
  }

  .userAbout {
    margin-top: 1rem;
  }

  div.historico {
    margin-top: 2rem;

    div.divisor {
      display: flex;
      align-items: center;

      span {
        width: 100%;
        background: var(--background);
        opacity: 0.5;
        height: 2px;
        margin-left: 1rem;
        border-radius: 1rem;
      }
    }
  }
`;
