import styled from "styled-components";

export const Container = styled.aside`
  max-width: 15rem;
  width: 100%;
  min-height: 100vh;
  background: var(--primary-background);
  padding-right: 1rem;
  padding-top: 1rem;

  nav {
    margin-top: 2rem;
  }

  @media(max-width: 720px) {
    min-height: 100%;
    max-width: 100%;
    border: 1px solid red;

    div.profile {
      display: none;
    }

    nav {
      display: none;
    }
  }
`;

export const User = styled.div`
  padding-left: 1rem;

  div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: transparent;
      border: 0;

      svg {
        transition: 0.2s opacity;

        &:hover {
          opacity: 0.85;
        }
      }
    }
  }

  div.profile {
    margin-top: 1.5rem;

    p {
      font-size: 1.25rem;
      color: #fff;
    }

    span {
      color: rgba(255, 255, 255, 0.85);
    }
  }
`;
