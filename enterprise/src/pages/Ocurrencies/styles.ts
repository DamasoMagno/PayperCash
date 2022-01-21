import styled, { css } from "styled-components";
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

export const Ocurrency = styled.div<{ otherTechncian?: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  .scheduleCall {
    display: flex;
    align-items: center;

    svg {
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
    position: relative;
    cursor: pointer;
    margin-left: 1rem;
    padding: 1.15rem;
    border-radius: 0.4rem;
    background: #f5f5f5;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.2s all;

    p {
      color: #000;
      word-break: break-all;
      margin-right: 2rem;
    }

    &::after {
      content: "";
      width: 5px;
      border-radius: 0 0.25rem 0.25rem 0;
      border: 0;
      height: 100%;
      position: absolute;
      right: 0;
      background: red;
      transition: all .2s;
    }

    &:hover::after {
      width: 10px;
    }
  }
`;
