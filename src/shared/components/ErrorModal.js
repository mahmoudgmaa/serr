import React, { useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useSpring, animated } from "react-spring";

const Button = styled.button`
  background: #e65252;
  color: white;
  /* font-weight: 300; */
  /* width: 10px;
  height: 2rem; */
  border: 1px solid #e65252;
  border-radius: 5px;
  transition: 0.2s ease-in-out;
  margin-left: 5px;
  padding: 8px 16px;
  margin-top: 10px;
  font-size: 1.5rem;
  &:hover {
    background: white;
    transition: 0.2s ease-in-out;
    color: black;
  }
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  --webkit-backdrop-filter: blur(10px);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 200px;
  background: #fff;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  display: grid;
  position: relative;
  border-radius: 25px;
  z-index: 10000;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr;
`;

const ModalTitle = styled.div`
  width: 100%;
  color: white;
  justify-content: start;
  align-items: left;
  background: #e65252;
  padding: 16px 32px;

  h3 {
    color: white;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100;
  background: white;
  padding: 10px;
`;

const ModalCancel = ({
  showModal,
  setShowModal,
  header,
  body,
  buttonText,
  oncancel,
}) => {
  const animation = useSpring({
    config: {
      duration: 100,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const ModalRef = useRef(null);
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal((prev) => false);
      }
    },
    [setShowModal, showModal]
  );

  const handleClick = (e) => {
    if (ModalRef.current === e.target) {
      setShowModal((prev) => false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, []);

  const handleClickButton = () => {
    setShowModal(false);
    oncancel();
  };
  return (
    <>
      {showModal ? (
        <Background ref={ModalRef} onClick={handleClick}>
          <animated.div style={animation}>
            <ModalWrapper>
              <ModalTitle>
                <h3>{header}</h3>
                <CloseModalButton
                  onClick={() => setShowModal((prev) => !prev)}
                />
              </ModalTitle>
              <ModalContent>
                <p
                  style={{
                    fontSize: "2.1rem",
                  }}
                >
                  {body}
                </p>
                <Button onClick={handleClickButton}>{buttonText}</Button>
              </ModalContent>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
export default ModalCancel;
