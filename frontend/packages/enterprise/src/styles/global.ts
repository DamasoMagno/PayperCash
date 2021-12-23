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
    --background: #312E38;
    --button: #333333;  
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

  .modalOverlay {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modalContent {
    animation: 1s ${openModal} forwards;
    position: absolute;
    width: 600px;
    border-radius: .25rem;
    background-color: #FFF;
  }
`;
