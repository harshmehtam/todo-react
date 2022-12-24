import { useState, memo } from "react";
import { createPortal } from "react-dom";

const ModalPortal = memo(({ children }) => {
  const modalEle = document.getElementById("modal");
  if (!modalEle) return null;
  const modalBg = <div className="modal-background"></div>;

  return createPortal(
    <div className="modal is-active">
      {modalBg}
      {children}
    </div>,
    modalEle
  );
});

const useModal = () => {
  const [isActive, setIsActive] = useState(false);

  const show = () => setIsActive(true);
  const hide = () => setIsActive(false);

  const Modal = ({ children }) => (
    <>{isActive && <ModalPortal>{children}</ModalPortal>}</>
  );

  return {
    show,
    hide,
    Modal,
  };
};
export default useModal;
