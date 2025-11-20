import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [messageFromRN, setMessageFromRN] = useState(null);

  useEffect(() => {
    const handleMessage = event => {
      let data = event.data;

      try {
        // Some RN WebViews send string directly
        const parsed = JSON.parse(data);
        setMessageFromRN(parsed);
        console.log("Parsed message:", parsed);
      } catch (e) {
        console.warn("Invalid JSON from RN:", data);
      }
    };

    window.addEventListener("message", handleMessage);
    document.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("message", handleMessage);
    };
  }, []);

  function sendToRN() {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "OPEN_RN",
        msg: "Hello from React JS!",
      }),
    );
  }

  return (
    <>
      <button onClick={sendToRN}>SEND TO RN</button>

      <h3>Message from React Native:</h3>

      <div
        style={{
          padding: "10px",
          borderRadius: "8px",
          marginTop: "10px",
          width: "fit-content",
        }}
      >
        {messageFromRN ? (
          <>
            From: {messageFromRN.from} <br />
            value: {messageFromRN.value}
          </>
        ) : (
          "No message yet"
        )}
      </div>
    </>
  );
}

export default App;
