import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  max-width: 800px;
  padding: .5rem 1rem 0;
  width: 90%;
  margin: 0 auto;

  small {
    display: block;
    color: rgba(51, 51, 51, .85);
    font-weight: bold;
    margin-bottom: .85rem;
  }

  strong {
    display: block;
    font-size: 1.25rem;
    margin-bottom: .4rem;
  }

  > p {
    color: rgba(51, 51, 51, .85);
    font-weight: bold;
  }

  .locale {
    margin-top: 1rem;
    display: flex;

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
      border-radius: .25rem;
      padding: .25rem;
    }
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;

  span {
    display: block;
    background-color: rgba(0, 0, 0, .15);
    height: .125rem;
    border-radius: 1rem;
    width: 100%;
  }

  div {
    margin-left: .85rem;
    border-radius: 1rem;
    padding: .25rem .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;

    &.pendent {
      border: 1px solid rgba(255, 0, 0, .5);
      color: red;
    }

    &.concluded {
      border: 1px solid rgba(0, 255, 0, .5);
      color: #19FF05
    }
  }
`;

export const Buttons = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background-color : var(--button);
    color: #FFF;
    border-radius: 0.25rem;
    font-size: 1rem;
    padding: .5rem 1rem;
  }
`;