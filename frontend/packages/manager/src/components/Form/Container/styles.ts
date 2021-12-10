import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 720px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    text-align: center;
    width: 60%;
    
    h2 {
      color: #FFF;
      margin-bottom: 2.25rem;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 2rem;
    }
  }

  > a  {
    margin-top: 1rem;
    color: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;

    svg {
      margin-right: .5rem;
    }
  }   
`;