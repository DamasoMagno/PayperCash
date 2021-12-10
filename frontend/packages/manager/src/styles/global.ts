import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --heading: #333333;
    --text: #333333;
  }

 * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    @media(max-width: 1024px){
      font-size: 95.7%;
    }

    @media(max-width: 720px){
      font-size: 87.5%;
    }
  }

  body {
    font-family: "Roboto", sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  button[disabled] {
    cursor: not-allowed;
    opacity: .7;
  }

  .modalOverlay {
    background: rgba(0, 0, 0, .5);
    
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;

  }

  .modalContent {
    background: rgb(255, 255, 255);
    max-width: 900px;
    width: 90%;
    margin: 0 auto;
    padding: 2rem;
    border-radius: .25rem;
  }
`;
