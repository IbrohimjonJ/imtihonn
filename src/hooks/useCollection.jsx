import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useCollection = (collectionName, whereData, orderData) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let q = collection(db, collectionName);

        if (whereData && whereData.length === 3) {
          q = query(q, where(...whereData));
        }

        if (orderData && orderData.length === 2) {
          q = query(q, orderBy(...orderData));
        }

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedData = [];
          querySnapshot.forEach((doc) => {
            fetchedData.push({ id: doc.id, ...doc.data() });
          });
          setData(fetchedData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [collectionName, whereData, orderData]);

  return { data };
};




// import { useEffect, useState } from "react";
// import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
// import { db } from "../firebase/firebaseConfig";

// export const useCollection = (collectionName, whereData, orderData) => {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     if (whereData[2]) {
//       const q = query(collection(db, collectionName), where(...whereData), orderBy(...orderData));
//       onSnapshot(q, (querySnapshot) => {
//         const data = [];
//         querySnapshot.forEach((doc) => {
//           data.push({ id: doc.id, ...doc.data() });
//         });
//         setData(data);
//       });
//     }
//   }, [collectionName, whereData[2]]);
//   return { data };
// };