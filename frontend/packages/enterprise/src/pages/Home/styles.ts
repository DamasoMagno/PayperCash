import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
 display: flex;
`;

export const Content = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 1rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .filter {
    border-radius: .4rem;
    border: 1px solid rgba(0, 0, 0, .15);
    padding: .5rem;
    display: flex;
    align-items: center;

    select {
      width: 100%;
      outline: 0;
      -webkit-appearance: none;
      cursor: pointer;
    }
  }
`;

export const Period = styled.div`
  margin-top: 2rem;

  & + div {
    margin-top: 1.5rem;
  }

  h3 {  
    color: rgba(51, 51, 51, 0.8);
    font-weight: 800;
    padding-bottom: .5rem;
    border-bottom: 1px solid rgba(0, 0, 0, .10); 
  }
`;

export const Ocurrency = styled.div`
  display: flex;
  align-items: center;
  margin-top: .5rem;

  .scheduleCall {
    display: flex;
    align-items: center;

    img {
      margin-right: .5rem;
      opacity: .5;
    }
    
    span {
      font-weight: 600;
      color: rgba(0, 0, 0, .5);
      width: 40px;
    }
  }

  .title {
    cursor: pointer;
    margin-left: 1rem;
    padding: 1.15rem;
    border-radius: .4rem;
    background: #3E3B47;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    transition: .2s all;
    
    &:hover {
      background: ${darken(.05, "#3E3B47")};
      box-shadow: 0 0 1px rgba(0, 0, 0, .5);
    }

    p {
      color: #FFF;
      word-break: break-all;
      margin-right: 2rem;
    }
  }
`;