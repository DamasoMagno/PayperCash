import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  width: 800px;
  margin: 1rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
`;

export const Period = styled.div`
  margin-top: 2rem;

  & + div {
    margin-top: 1.5rem;
  }

  h3 {
    color: rgba(51, 51, 51, 0.8);
    font-weight: 800;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const Ocurrency = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  .scheduleCall {
    display: flex;
    align-items: center;

    img {
      margin-right: 0.5rem;
      opacity: 0.5;
    }

    span {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.5);
      width: 2rem;
    }
  }

  &.otherTechnician .title {
    opacity: 0.85;
  }

  .title {
    cursor: pointer;
    margin-left: 1rem;
    padding: 1.15rem;
    border-radius: 0.4rem;
    background: var(--background);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.2s all;

    &:hover {
      background: ${darken(0.05, "#3E3B47")};
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
    }

    p {
      color: #fff;
      word-break: break-all;
      margin-right: 2rem;
    }
  }
`;
