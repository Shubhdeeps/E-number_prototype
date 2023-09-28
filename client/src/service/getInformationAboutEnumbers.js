import { database } from "../firebase/firebaseConfig";

export async function getInfoAboutENumbers(enumbers) {
  const dbRef = database.ref("e_numbers");
  const enumbersPromise = [];
  enumbers.forEach((en) => {
    enumbersPromise.push(dbRef.child(en).get());
  });

  const ens = await Promise.all(enumbersPromise);
  const values = ens.map((dataSnapshot) => {
    return dataSnapshot.val();
  });
  return values.filter((val) => !!val);
}
