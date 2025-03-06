import React from "react";

interface MicrophoneControllerProps {
  microphoneActive: boolean;
  toggleMicrophone: () => void;
  resetCandles: () => void;
}

const MicrophoneController: React.FC<MicrophoneControllerProps> = ({
  microphoneActive,
  toggleMicrophone,
  resetCandles,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={toggleMicrophone}>
        {microphoneActive ? "หยุดการเป่า" : "เริ่มเป่า"}
      </button>
      <button onClick={resetCandles}>เริ่มเป่าใหม่</button>
    </div>
  );
};

export default MicrophoneController;
