import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  max-width: 800px;
  padding: 0.5rem 1rem 0;
  width: 90%;
  margin: 0 auto;

  button.action {
    margin: 0.5rem 0;
    background: var(--primary-button);
    color: var(--primary-color);
    padding: 0.5rem;
    font-size: 1rem;
    float: right;
    border-radius: 0.25rem;
  }

  div.locale {
    display: flex;
    align-items: flex-end;

    div {
      width: 100%;
    }

    a {
      margin-left: .5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      border-radius: .25rem;
      background: var(--primary-background);
      color: var(--primary-color);
      padding: .55rem .25rem;
      
      svg {
        margin-right: .2rem;
      }
    }
  }

  button {
    border: 1px solid red;
    border-radius: .25rem;
    padding: .5rem 1rem;
    background: #fff;
    color: red;
    margin: 1rem 0;
  }
`;

export const OcurrencyResume = styled.div`
  background: #eee;
  color: #333;
  border-radius: 0.25rem;
  margin: -4rem 0 2rem;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;

  header {
    small {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.5);
      font-size: 1rem;
    }
  }

  strong {
    margin-top: .25rem;
    line-height: 2rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: #333;
  }

  div.status {
    position: absolute;
    right: -5%;
    top: 50%;
    transform: translateY(-90%);
    color: #FFF;
    background: var(--primary-background);
    padding: .4rem .5rem;
    border-radius: 16px;
    border: 0;
  }
`;
