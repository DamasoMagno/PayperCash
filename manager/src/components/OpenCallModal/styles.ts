import styled from "styled-components";

export const Container = styled.form`
  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  div.resume {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: baseline;
    gap: .5rem;

    @media(max-width: 720px){
      gap: 0;
      grid-template-columns: 1fr;
    }

    div {
      width: 100%;
    }
  }

  div.buttons {
    display: flex;
    gap: 1rem;

    button {
      height: 3rem;
      border: 0;
      width: 100%;
      font-size: 1rem;
      font-weight: bold;
      border-radius: .4rem;

      &.cancel {
        border: 1px solid rgba(51, 51, 51, 1); 
        background-color: transparent;
      }

      &.sendOrEdit {
        color: #FFF;
        background-color: rgba(51, 51, 51, 1);
      }
    }
  }
`;

export const Field = styled.div`
  position: relative;

  & + div {
    margin: 1.5rem 0 1rem;
  }

  label {
    padding: 0 .25rem;
    position: absolute;
    pointer-events: none;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.2s ease all;
  }

  input, select, textarea {
    height: 3rem;
    width: 100%; 
    padding: .5rem;
    font-size: 1rem;
    outline: 0;
    border: 1px solid rgba(51, 51, 51, .15);
    -webkit-appearance: none; //Removing arrow of select
    border-radius: .25rem;

    :focus ~ label,
    :not(:placeholder-shown) ~ label {
      font-size: .85rem;
      background: #FFF;
      padding: 0 5px;
      top: 0px;
      transform: translate(5%, -60%);
    }
  }

  textarea {
    resize: none;
    height: 10rem;
  }
`;
