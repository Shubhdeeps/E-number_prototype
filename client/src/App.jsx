import CameraComponent from "./components/Camera";
import ResultComponent from "./components/Result";
import { useState } from "react";
import { storeImageToDatabaseAndGetURL } from "./service/storeImageToDatabase";
import { callBackendApiAndGetEnumbers } from "./service/callBackEndApiAndGetEnumbers";
import DetailedInfo from "./components/DetailedInfo";
import { getInfoAboutENumbers } from "./service/getInformationAboutEnumbers";

function App() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [detailedInfo, setDetailedInfo] = useState([]);
  const [noNumbers, setNoNumbers] = useState(false);
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

  async function getEnumbersDetails() {
    const detailsOfEnumbers = await getInfoAboutENumbers(result);
    setDetailedInfo(detailsOfEnumbers);
  }

  const isResultAvailable = result && !!result.length;
  // const isResultAvailable = true;
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
        {isResultAvailable && <ResultComponent enumbers={result} />}
      </div>
      {isResultAvailable && (
        <>
          <button onClick={getEnumbersDetails}>Show details</button>

          <DetailedInfo infomation={detailedInfo} />
        </>
      )}
    </div>
  );
}

export default App;
