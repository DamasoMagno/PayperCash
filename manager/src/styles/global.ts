import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --primary-color: #fff;
    --secondary-color: #5800c7;
    --primary-background: #5800C7;
    --secondary-background: #F5F5F5;
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

  .modalOverlay, .removeCallModalOverlay {
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

  .modalContent, .removeCallModalContent {
    background: rgb(255, 255, 255);
    max-width: 750px;
    width: 75%;
    margin: 0 auto;
    padding: 2rem;
    border-radius: .25rem;
  }

  .removeCallModalContent {
    max-width: 400px;
    width: 90%;
    padding: 1.5rem;
  }
`;
