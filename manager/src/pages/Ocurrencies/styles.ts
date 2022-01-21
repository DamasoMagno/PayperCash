import styled from "styled-components";

export const Buttons = styled.div`
  display: flex;
  justify-content: end;
  padding-top: 1rem;

  button, a {
    border-radius: 999999px;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.2s;

    svg, img {
      margin-right: 0.5rem;
      height: 20px;
    }
  }

  button {
    background: transparent;
    margin-right: 1rem;
  }
`;

export const Content = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const CallHistory = styled.div`
  div.period {
    > p {
      font-weight: 600;
      padding-bottom: 1rem;
      color: #333;
      border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    }

    & + div.period {
      margin-top: 3rem;
    }
  }
`;

export const Ocurrency = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  position: relative;

  div.scheduleCall {
    display: flex;
    align-items: center;
    opacity: 0.7;

    svg {
      margin-right: .25rem;
    }

    span {
      font-weight: 600;
      width: 40px;
    }
  }

  a.titleCall {
    cursor: pointer;
    margin-left: 1rem;
    padding: 1rem;
    border-radius: 0.4rem;
    background: var(--secondary-background);
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      color: #333;
      word-break: break-all;
      font-size: 1.25rem;
      margin-right: 0.5rem;
    }
  }

  @media (max-width: 720px) {
    margin-top: .85rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    a.titleCall {
      margin: 0.5rem 0 0.5rem;
    }
  }
`;

export const RecentCall = styled.div`
  background: #eee;
  color: #333;
  border-radius: 0.25rem;
  margin: -3rem 0 3rem;
  padding: 1rem;

  header {
    p {
      font-weight: 600;
      color: rgba(0,0, 0, .5);
      font-size: 1rem;
    }
  }

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    strong {
      margin-top: 0.25rem;
      line-height: 2.5rem;
      font-size: 1.25rem;
      font-weight: 700;
      color: #333;
    }
  }
`;
