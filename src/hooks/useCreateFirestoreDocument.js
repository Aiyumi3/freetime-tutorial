import { projectFirestore } from '../firebase/config';
import { collection, getDocs, where, query, doc, setDoc } from 'firebase/firestore';

//Створює документ у Firestore у вказаній колекції
const useCreateFirestoreDocument = (collectionName) => {
    const createDocument = async (data, title) => {
        const parentDocRef = collection(projectFirestore, collectionName);
        const q = query(parentDocRef, where('title', '==', title));
        const parentDocSnapshot = await getDocs(q);

        if (parentDocSnapshot.empty) {
            try {
                const docRef = doc(projectFirestore, collectionName, title);
                await setDoc(docRef, data);

                console.log("Document successfully added with ID:", title);
                return { updated: true };
            } catch (error) {
                console.error("Error adding document:", error);
                return { error: error.message };
            }
        }else{
            const err = 'Title Already Exist!!! ERROR';
            console.log(err);
            return {errMs: err};
        }
    };
    return { createDocument };
};
export default useCreateFirestoreDocument;
