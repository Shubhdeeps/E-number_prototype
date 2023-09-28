import CameraComponent from "./components/Camera";
import ResultComponent from "./components/Result";
import { useState } from "react";
import { storeImageToDatabaseAndGetURL } from "./service/storeImageToDatabase";
import { callBackendApiAndGetEnumbers } from "./service/callBackEndApiAndGetEnumbers";

function App() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noNumbers, setNoNumbers] = useState(true);
  //function convert image file to string url and then call backend function to extract text
  async function setImageToDBAndCallBackend(imageFile) {
    setNoNumbers(false);
    setIsLoading(true);
    const imageURL = await storeImageToDatabaseAndGetURL(imageFile);
    const _result = await callBackendApiAndGetEnumbers(imageURL);
    setResult(_result);
    setIsLoading(false);
    if (!_result.length) {
      // if length of result is zero
      setNoNumbers(true);
    }
  }

  function handleClear(setImage) {
    setResult([]);
    setImage();
    setNoNumbers(false);
  }

  return (
    <div className="App">
      <h4>SCAN BARCODE PROTOTYPE</h4>
      <CameraComponent
        handleClear={handleClear}
        handleSetImage={(imageFile) => setImageToDBAndCallBackend(imageFile)}
      />

      {/* Only render when we have result */}
      <div className="result_box">
        {isLoading && <div className="loading_spinner"></div>}
        {!isLoading && noNumbers && (
          <span>No E-Codes found in the ingredients</span>
        )}
        {result && !!result.length && <ResultComponent enumbers={result} />}
      </div>
    </div>
  );
}

export default App;
