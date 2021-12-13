import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;

  > div.cards {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
`;

export const Card = styled.div`
  width: 225px;
  background: #333333;
  border-radius: 0.25rem;
  color: #FFF;
  box-shadow: 0 0 2.5px rgba(0, 0, 0, .5);
  border-radius: .4rem;
  cursor: pointer;

  img {
    width: 100%;
    height: 110px;
  }

  > div {
    padding: .5rem .3rem 1rem;

    h3 {
      font-size: 1.4rem;
      font-weight: 600;
    }

    div {
      margin-top: .25rem;
      display: flex;
      align-items: center;

      p {
        margin-left: .25rem;
        font-size: .85rem;
        color: rgba(255, 255, 255, .5);
     }
    }
  }
`;

