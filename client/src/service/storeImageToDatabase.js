import uuid from "react-uuid";
import { storage } from "../firebase/firebaseConfig";

/**
 *
 * @param imageFile image file to extract data from. should be in File format
 * @returns imageUrl
 */
export async function storeImageToDatabaseAndGetURL(imageFile) {
  const extension = imageFile.name.split(".").pop();
  let imageURL = "";
  await storage
    .ref()
    .child(`ingredients/${uuid()}.${extension}`)
    .put(imageFile)
    .then((res) => {
      const url = res.ref.getDownloadURL();
      imageURL = url;
    })
    .catch((e) => {
      console.log("Storage error:", e);
    });

  return imageURL;
}
