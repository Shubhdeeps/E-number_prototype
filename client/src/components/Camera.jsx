import { useState } from "react";

export default function CameraComponent({ handleSetImage, handleClear }) {
  const [image, setImage] = useState();

  return (
    <div className="wrapper">
      {image ? <span>Image Scanned: {image.name}</span> : ""}
      {image ? (
        <img
          width={"200px"}
          height={200}
          alt="preview image"
          src={URL.createObjectURL(image)}
        />
      ) : (
        <>
          <input
            className="scanner_camera"
            onChange={(e) => {
              setImage(e.target.files[0]);
              handleSetImage(e.target.files[0]);
            }}
            type="file"
            name="scanner"
            accept="image/*"
            capture
          />
          <label htmlFor="scanner">Scan the ingredients</label>
        </>
      )}

      <br />
      <button onClick={() => handleClear(setImage)}>Clear</button>
    </div>
  );
}
