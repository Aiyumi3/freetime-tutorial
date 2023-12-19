import {useState} from "react";
import {projectFirestore, projectStorage} from '../firebase/config';
import { collection, query, where, doc, deleteDoc, getDocs, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

const useDeleteInfo = () => {
    const [nameColl, setNameColl] = useState('');

    const handleDelete = async (nameT, docID) => {
        const collections = ['hairstyles', 'dishes', 'knitting-crochet', 'makeup'];

        for (const collectionName of collections) {
            const parentDocRef = collection(projectFirestore, collectionName);
            const q = query(parentDocRef, where('title', '==', nameT));
            const parentDocSnapshot = await getDocs(q);

            if (!parentDocSnapshot.empty) {
                setNameColl(collectionName);
                break;
            }else{
                setNameColl('');
            }
        }

        if (nameColl) {
            const parentDocRef = doc(projectFirestore, nameColl, nameT);
            const subcollectionRef = collection(parentDocRef, 'steps');
            const docRef = doc(subcollectionRef, docID);

            try {
                const docSnapshot = await getDoc(docRef);

                const data = docSnapshot.data();
                const {url} = data;
                const storageRef = ref(projectStorage, url);

                try {
                    await deleteObject(storageRef);
                    console.log('Picture/video successfully deleted from storage');
                } catch (error) {
                    console.error('Error deleting picture/video from storage:', error);
                }
                try {
                    await deleteDoc(docRef);
                    console.log('Info successfully deleted from subcollection');
                } catch (error) {
                    console.error('Error deleting info from subcollection:', error);
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        } else {
            console.log('Document not found in subcollection');
        }
    };
    return {handleDelete};
};
export default useDeleteInfo;