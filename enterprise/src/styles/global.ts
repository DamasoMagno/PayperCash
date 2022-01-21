import { createGlobalStyle, keyframes } from "styled-components";

const openModal = keyframes`
  0% {
    top: 100%;
  }
  100% {
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default createGlobalStyle`
 * {
    border :0;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }

  :root {
    --primary-color: #fff;
    --secondary-color: #5800c7;
    --primary-background: #5800C7;
    --secondary-background: #F5F5F5;
  }

  html {
    @media(max-width: 1024px){
      font-size: 95.7%;
    }
    
    @media(max-width: 720px){
      font-size: 87.5%;
    }
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  button[disabled]{
    opacity: .7;
    cursor: not-allowed;
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
    max-width: 700px;
    width: 90%;
    padding: 2rem;
    border-radius: .25rem;
  }

  .removeCallModalContent {
    max-width: 400px;
    width: 90%;
    padding: 1.5rem;
  }
`;
