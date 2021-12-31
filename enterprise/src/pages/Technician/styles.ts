import styled, { css } from "styled-components";

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

export const Status = styled.div`
  display: flex;
  border-radius: 15px;
  padding: 0rem 0.5rem;
  align-items: center;
  font-size: .85rem;

  & + div {
    margin-left : .5rem;
  }

  &.pendents {
    border: 1px solid rgba(255, 0, 0, .5);
    color: rgba(255, 0, 0, .5);
    
    span {
      background: rgba(255, 0, 0, .5);
    }
  }

  &.finished {
    border: 1px solid rgba(0, 255, 0, .5);
    color: rgba(0, 255, 0, .5);

    span {
      background: rgba(0, 255, 0, .5);
    }
  }

  span {
    height: 50%;
    width: 2px;
    border-radius: 999px;
    margin: 0 8px;
  }
`;