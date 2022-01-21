import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;

  @media(max-width: 720px){
    flex-direction: column;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  margin: 1rem auto;

  h1 {
    text-align: center;
  }

  section.user {
    margin-top: 1rem;
  }

  section.historicall {
    margin-top: 2rem;

    div.divisor {
      display: flex;
      align-items: center;

      span {
        height: 2px;
        width: 100%;
        background: rgba(0, 0, 0, 0.25);
        margin-left: 0.5rem;
        border-radius: 10px;
      }
    }

    div.resume {
      margin-top: .5rem;
      display: flex;
      justify-content: space-between;

      div:last-child {
        display: flex;  
      }
    }
  }
`;

export const Delete = styled.button`
  border: 1px solid #FF0000;
  background: transparent;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .4rem 1rem;
  border-radius: .25rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  transition: all .5s;

  svg {
    margin-right: .25rem;
  }

  &:hover {
    background: #FF0000;
    color: #FFF;

    svg {
      color: #FFF;
    }
  }
`;