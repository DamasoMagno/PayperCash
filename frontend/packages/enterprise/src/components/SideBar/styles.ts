import styled from "styled-components";

export const Container = styled.aside`
  max-width: 15rem;
  width: 100%;
  min-height: 100vh;
  background: var(--background);
  padding-right: 1rem;
  padding-top: 1rem;

  nav {
    margin-top: 3rem;   

    li {
      list-style: none;
      cursor: pointer;
      padding: 1rem 1rem;
      margin: .25rem 0;
      transition: .2s background;
      
      &:hover, &.active {
        background: #eee;
        border-radius: .10rem;
        
        a {
          color: #333333;
        } 
      }

      a {
        color: #FFF;
        font-size: 1.15rem;
      }
    }
  }
`;

export const User = styled.div`
  padding-left: 1rem;

  > a {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      opacity: .5;
      transition: .2s opacity;

      &:hover {
       opacity: .85;
      }
    }
  }
  
  div.profile {
    margin-top: 1rem;
    display: flex;
    align-items: center;

    img {
      width: 64px;
      border-radius: 50%;
      margin-right: .5rem;
      cursor: pointer;
      transition: filter .5s;

      &:hover {
        filter: brightness(.8);
      }
    }

    span {
      color: #FFF;
      font-size: 1.25rem;
    }
  }
`;