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

    button.action {
      margin: 0.5rem 0;
      background: var(--primary-button);
      color: var(--primary-color);
      padding: 0.5rem;
      font-size: 1rem;
      float: right;
      border-radius: .25rem;
  }

  .locale {
    margin-top: 1rem;
    display: flex;
    align-items: center;

    img {
      margin-right: 1rem;
      height: 10rem;
    }

    div {
      width: 100%;
    }

    button {
      margin-top: 1rem;
      font-size: 1.15rem;
      height: 2rem;
      background-color: var(--button);
      color: #ffffff;
      border-radius: 0.25rem;
      padding: 0.25rem;
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
