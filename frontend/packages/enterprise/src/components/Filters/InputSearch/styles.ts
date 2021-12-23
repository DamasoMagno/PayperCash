import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.4rem;
  width: 400px;
  align-self: flex-end;

  input {
    outline: 0;
    flex: 1;
    border: 0;
  }

  svg {
    margin-left: 0.25rem;
  }
`;
