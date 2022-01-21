import styled from "styled-components";

export const Container = styled.button`
  width: 100%;
  font-size: 1.25rem;
  padding: 1rem;
  border: 0;
  border-radius: .3rem;
  font-weight: 600;
  margin-top: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-background);
  color: var(--primary-color);

  &:hover {
    filter: brightness(0.9);
  }
`;
