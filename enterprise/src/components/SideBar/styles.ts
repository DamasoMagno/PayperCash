import styled from "styled-components";

export const Container = styled.aside`
  max-width: 15rem;
  width: 100%;
  min-height: 100vh;
  background: var(--background);
  padding-right: 1rem;
  padding-top: 1rem;

  nav {
    margin-top: 2rem;
  }
`;

export const User = styled.div`
  padding-left: 1rem;

  > a {
    svg {
      opacity: 0.5;
      transition: 0.2s opacity;

      &:hover {
        opacity: 0.85;
      }
    }
  }

  div.profile {
    margin-top: 1.5rem; 

    p {
      font-size: 1.25rem;
      color: #FFF;
    }

    span {
      color: rgba(255, 255, 255, .85);
    }
  }
`;
