import styled from "styled-components";

export const Container = styled.button`
  width: 100%;
  font-size: 1.25rem;
  padding: 1rem;
  border: 0;
  border-radius: 0.25rem;
  font-weight: 600;
  margin-top: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    filter: brightness(0.9);
  }
`;
