import React, { useReducer, useEffect } from "react";
import styled, { css } from "styled-components";
import { validate } from "../../utils/validators";

const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid
    ${({ isValid, isTouched }) => (!isValid && isTouched ? `#e65252` : `#eee`)};
  margin: 0.5rem;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  font-size: 14px;
  border-radius: 1rem;

  ${sharedStyles};
`;

const TextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 150px;
  resize: none;
  ${sharedStyles};
`;

const Error = styled.div`
  color: #e65252;
  font-weight: 700;
  margin: 0 0 10px 5px;
`;

const inputReducer = (state, action) => {
  switch (action.type) {
    case "change":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "touch":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispach] = useReducer(inputReducer, {
    value: props.value || "",
    isValid: props.valid || false,
    isTouched: false,
  });
  const changeHandler = (e) => {
    dispach({
      type: "change",
      val: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispach({
      type: "touch",
    });
  };
  const element =
    props.element === "input" ? (
      <StyledInput
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        isValid={inputState.isValid}
        onBlur={touchHandler}
        isTouched={inputState.isTouched}
      />
    ) : (
      <TextArea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={props.value}
        onBlur={touchHandler}
        isTouched={inputState.isTouched}
        isValid={inputState.isValid}
        placeholder={props.placeholder}
      />
    );

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <Error>
          <p>{props.errorText}</p>
        </Error>
      )}
    </>
  );
};
export default Input;
