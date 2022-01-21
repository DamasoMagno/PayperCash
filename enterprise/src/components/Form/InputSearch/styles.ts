import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, .15);
  display: flex;
  align-items: center;
  padding: .65rem;
  border-radius: 1rem;
  width: 400px;
  align-self: flex-end;

  input {
    outline: 0;
    flex: 1;
    color: #A3A3A3;
    border: 0;
  }

  svg {
    margin-left: 0.25rem;
  }
`;
