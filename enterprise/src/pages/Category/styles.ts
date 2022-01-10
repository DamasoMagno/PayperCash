import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 1rem auto;
  border: 1px solid red;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: center;
  }
`;