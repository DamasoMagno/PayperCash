import styled from "styled-components";

export const Container = styled.aside`
  max-width: 15rem;
  width: 100%;
  min-height: 100vh;
  background: var(--background);
  padding-right: 1rem;
  padding-top: 1rem;

  nav {
    margin-top: 3rem;
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
    margin-top: 1rem;
    display: flex;
    align-items: center;

    img {
      width: 64px;
      border-radius: 50%;
      margin-right: 0.5rem;
      cursor: pointer;
      transition: filter 0.5s;

      &:hover {
        filter: brightness(0.8);
      }
    }

    span {
      color: #fff;
      font-size: 1.25rem;
    }
  }
`;
