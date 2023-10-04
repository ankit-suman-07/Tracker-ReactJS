// dataService.js
import { collection, getDocs } from "firebase/firestore";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { addData } from "../redux/features/auth-slice";


const firestore = getFirestore(app);


export function writeExpenses(expense, amounts, categories, dates, total, userName) {


  const spendsDoc = doc(firestore, userName, "expenses");
  const docData = {
    spends: expense,
    cost: amounts,
    category: categories,
    date: dates,
    total: total,
  };


  setDoc(spendsDoc, { expenses: docData, total: total })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}


async function fetchDataFromFirestore(dispatch, userName) {

  const collectionRef = collection(firestore, userName);

  try {
    const querySnapshot = await getDocs(collectionRef);
    const data = [];

    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      }
    });
    dispatch(addData(data));
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

export { fetchDataFromFirestore };
