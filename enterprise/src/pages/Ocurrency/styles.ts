import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  max-width: 800px;
  padding: 0.5rem 1rem 0;
  width: 90%;
  margin: 0 auto;

  header {
    small {
      display: block;
      color: rgba(51, 51, 51, 0.85);
      font-weight: bold;
      margin-bottom: 0.85rem;
    }

    strong {
      display: block;
      font-size: 1.25rem;
      margin-bottom: 0.4rem;
    }

    > p {
      color: rgba(51, 51, 51, 0.85);
      font-weight: bold;
    }
  }

  .locale {
    display: flex;
    align-items: flex-end;

    a {
      font-size: 1rem;
      display: flex;
      align-items: center;
      background-color: var(--primary-background);
      color: #ffffff;
      border-radius: 0.25rem;
      padding: .5rem .5rem;
      margin-left: .5rem;

      svg {
        margin-right: .25rem;
      }
    }
  }

  .action {
    background: var(--primary-background);
    color: var(--primary-color);
    border: 1px solid var(--primary-background);
    font-size: 1.25rem;
    transition: all .2s;
    margin-top: 1rem;
    padding: .25rem 1rem; 
    border-radius: .15rem;

    &:hover {
      background: transparent;
      color: var(--secondary-color);
    }
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;

  span {
    display: block;
    background-color: rgba(0, 0, 0, 0.15);
    height: 0.125rem;
    border-radius: 1rem;
    width: 100%;
  }

  div {
    margin-left: 0.85rem;
    border-radius: 1rem;
    padding: 0.25rem 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;

    &.pendent {
      border: 1px solid rgba(255, 0, 0, 0.5);
      color: red;
    }

    &.concluded {
      border: 1px solid rgba(0, 255, 0, 0.5);
      color: #19ff05;
    }
  }
`;
