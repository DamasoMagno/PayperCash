import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-background);
`;

export const ResetPasswordForm = styled.form`
  background: var(--primary-color);
  border-radius: .4rem;
  width: 35%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: .25rem;

  button {
    width: 50%;
  }
`;