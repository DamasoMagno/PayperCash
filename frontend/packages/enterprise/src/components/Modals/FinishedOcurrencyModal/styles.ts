import styled from 'styled-components';

export const Container = styled.form`
  max-width: 90%;
  margin: 0 auto;
  text-align: center;

  div {
    display: flex;
    flex-direction: column;
    background: #FFF;
    border: 1px solid rgba(0, 0, 0, .25);
    position: relative;
    border-radius: .25rem;

    & + div {
      margin-top: 1rem;
    }

    label {
      left: 10px;
      transform: translateY(-50%);
      border-radius: 1rem;
      padding: 0 .25rem;
      position: absolute;
      font-size: .85rem;
      background: #FFF;
    }

    input {
      padding: 1rem 1rem;
      background: transparent;
      font-size: 1rem;
    }

    &.buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }
  }
`;
