import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;

  div {
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    span:nth-child(2) {
      background: #312E38;
      padding: .5rem;
      border-radius: 1rem;
      color: #FFF;
      font-size: 1.25rem;
    }
  }
`;
