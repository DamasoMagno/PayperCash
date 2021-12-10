import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  & + div {
    margin-top: 1rem;
  }

  label {
    display: block;
    margin-bottom: .25rem;
    font-size: .85rem;
  }

  div {
    p {
      padding: .5rem;
      background-color: #eee;
      color: #333;
      font-size: 1rem;
      font-weight: bold;
    }

    span {
      display: block;
      height: 1px;
      background-color: rgba(0, 0, 0, .25);
    }
  }
`;