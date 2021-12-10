import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 480px;
  padding: 0 1rem;

  .locale {
    margin-top: -4rem;
    margin-bottom: 2rem;

    img {
      width: 100%;
    }
  }

  .confirmChanges {
    margin-top: 1rem;
    border: 1px solid rgba(51, 51, 51, 1);
    width: 100%;
    border-radius: .6rem;
    height: 3.75rem;
    color: rgba(51, 51, 51, 1);
    background: transparent;
    font-weight: 700;
    font-size: 1.56rem;
  }
`;

export const Buttons = styled.div`  
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: #FFF;
    display: flex;
    align-items: center;

    svg {
      margin-right: .25rem;
    }
  }
`;