import React from "react";
import KuromiImg from "../kuromi-removebg-preview.png";

interface BirthdayModalProps {
  onClose: () => void;
}

const BirthdayModal: React.FC<BirthdayModalProps> = () => {
  return (
    <div className="modal">
      <div
        className="modal-content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          background: "#fff",
          borderRadius: "5px",
        }}
      >
        <h2>❤️ สุขสันต์วันเกิดน้า ❤️</h2>
        <img
          style={{
            width: "300px",
            height: "100%",
            objectFit: "cover",
            borderRadius: "5px",
          }}
          src={KuromiImg}
          alt="Kuromi Birthday"
        />
      </div>
    </div>
  );
};

export default BirthdayModal;
