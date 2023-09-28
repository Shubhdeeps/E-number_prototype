import axios from "axios";

const hostName = window.location.hostname || "localhost";

const API_ENDPOINT = `http://${hostName}:9090/extract_enums/`;

/**
 *
 * @param imageURL imageUrl of image to request from the backend
 * @returns array of Enumbers present in the image
 */
export async function callBackendApiAndGetEnumbers(imageURL) {
  const data = {
    image: await imageURL,
    type: "Image",
  };
  const responseArray = [];
  await axios
    .post(API_ENDPOINT, data)
    .then((res) => {
      responseArray.push(...res.data);
    })
    .catch((e) => {
      console.log(e);
    });
  return responseArray;
}
