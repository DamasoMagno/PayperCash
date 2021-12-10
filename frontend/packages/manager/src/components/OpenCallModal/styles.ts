import styled from "styled-components";

export const Container = styled.form`
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  div.placeOcurrency {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    align-items: center;
    gap: 2rem;
  }

  div.buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    button {
      height: 3rem;
      border: 0;
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
