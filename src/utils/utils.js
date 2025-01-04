import React from "react";
import "./utils.css";


export function Button({ label, onClick, variant = "primary", style }) {
  const className = `button button-${variant}`;

  return (
    <button className={className} style={style} onClick={onClick}>
      {label}
    </button>
  );
}


export function Modal({ isOpen, onClose, title ,children}) {
  if (!isOpen) return null;
  return (
    <>
      <div className="modal-main" onClick={onClose}></div>
      <div className="modal">
        {/* <h2>{title}</h2> */}
        <div>{children}</div>
        {/* <Button
          label="Close"
          onClick={onClose}
          variant="secondary"
          style={{ marginTop: "20px" }}
        />
        <Button
          label="Confirm"
          onClick={onClose}
          variant="secondary"
          style={{ marginTop: "20px" }}
        /> */}
      </div>
    </>
  );
}

export function ViewModal({ isOpen, onClose, title ,children}) {
  if (!isOpen) return null;
  return (
    <>
      <div className="modal-main" onClick={onClose}></div>
      <div className="modal">
        <h2>{title}</h2>
        <div>{children}</div>
        {/* <Button
          label="Close"
          onClick={onClose}
          variant="secondary"
          style={{ marginTop: "20px" }}
        />
        <Button
          label="Confirm"
          onClick={onClose}
          variant="secondary"
          style={{ marginTop: "20px" }}
        /> */}
      </div>
    </>
  );
}
