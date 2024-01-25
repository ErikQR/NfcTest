import { useState } from "react";

function Nfc() {
  const [nfcData, setNFCData] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleNFCScan = async () => {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        console.log(message);
        console.log(serialNumber);
        setNFCData({ message, serialNumber });
      })

      ndef.addEventListener("error", ({ message, serialNumber }) => {
        console.log(message);
        console.log(serialNumber);
        setErrors({ message, serialNumber });
      });

    } catch (error) {
        setErrors(error);
      console.error("Error scanning NFC:", error);
    }
  };

  return (
    <div>
      <button onClick={handleNFCScan}>Scan NFC</button>
      {nfcData && <p>NFC Data: {JSON.stringify(nfcData)}</p>}
      {errors && <p>Error: {JSON.stringify(errors)}</p>}
    </div>
  );
}

export default Nfc;