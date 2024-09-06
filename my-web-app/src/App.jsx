import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import expoLogo from "./assets/expo.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const goHome = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: "GO_HOME",
        payload: {
          data: "Its for test.",
        },
      }),
      "*"
    );
  };

  useEffect(() => {
    const eventFunc = (event) => {
      if (event.data) {
        let data;
        try {
          data = JSON.parse(event.data);
        } catch (error) {
          console.log(error);
        }

        if (data?.type === "INCREMENT") {
          setCount((count) => count + 1);
        }
      }
    };

    window.addEventListener("message", eventFunc);

    return () => {
      window.removeEventListener("message", eventFunc);
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://expo.dev/" target="_blank">
          <img src={expoLogo} className="logo react" alt="Expo logo" />
        </a>
      </div>
      <h1>Vite + React + Expo</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button
          style={{ marginTop: "1rem", borderColor: "red" }}
          onClick={() => {
            goHome();
          }}
        >
          Go Home Stack From Webview
        </button>
      </div>
    </>
  );
}

export default App;
