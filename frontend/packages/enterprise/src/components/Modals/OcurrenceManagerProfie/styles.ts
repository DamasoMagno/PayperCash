import styled from "styled-components";

export const Container = styled.form`
  max-width: 50%;
  padding: 1rem 0;
  margin: 0 auto;
  text-align: center;

  img {
    width: 100%;
    border-radius: 10px;
    border: 3px solid rgba(85, 85, 85, 1);
    margin-bottom: 1rem;
  }

  div.contact {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    button {
      padding: 1rem;
      font-size: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      border-radius: .25rem;

      &.whatsapp {
        background: green;
        color: #FFF;
      }
    }
  }
`;
