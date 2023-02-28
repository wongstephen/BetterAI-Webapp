import { useRef, useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const inputRef = useRef("");
  const [images, setImages] = useState([]);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const fetchImg = async () => {
    const res = await openai.createImage({
      prompt: inputRef.current.value,
      n: 1,
      size: "256x256",
    });
    const image_url = res.data.data[0].url;
    setImages((prev) => [...prev, image_url]);
  };

  return (
    <div className="App">
      <img className="app-logo" src="/assets/better-ai-logo.png"></img>
      <form>
        <textarea placeholder="Your prompt" ref={inputRef} rows="5"></textarea>{" "}
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            fetchImg();
          }}
        >
          Generate
        </button>
      </form>
      <div className="image-container">
        {images.length > 0 &&
          images.map((url) => {
            return <img src={url} key={url} />;
          })}
      </div>
    </div>
  );
}

export default App;
