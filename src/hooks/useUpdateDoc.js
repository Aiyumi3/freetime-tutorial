import {projectFirestore} from '../firebase/config';
import { collection, getDocs, where, query, setDoc, doc } from 'firebase/firestore';

const useUpdateDoc = () => {//searchTitle, newData
    const createSubcollectionDocument = async (nameT, newData) => {
        try {
            const collections = ['hairstyles', 'dishes', 'knitting-crochet', 'makeup'];

            for (const collectionName of collections) {
                const parentDocRef = collection(projectFirestore, collectionName);
                const q = query(parentDocRef, where('title', '==', nameT));
                const parentDocSnapshot = await getDocs(q);

                if (!parentDocSnapshot.empty) {
                    const parentDocRef = doc(projectFirestore, collectionName, nameT);
                    const subcollectionRef = collection(parentDocRef, 'steps');

                    await setDoc(doc(subcollectionRef), newData, { merge: true });// Update data

                    console.log(`Document successfully added to ${collectionName}`);
                    return { collection: collectionName, updated: true }; //об'єкт з  назвою оновленої колекції
                }
            }
            console.log(`Документ не знайдено`);
            return { collection: null, updated: false };
        } catch (error) {
            console.error("Помилка при занесенні документу-:", error);
            throw error;
        }
    };

    return { createSubcollectionDocument };
};
export default useUpdateDoc;