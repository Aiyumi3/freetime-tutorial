import {projectFirestore, projectStorage} from '../firebase/config';
import {useState} from "react";
import {collection, getDocs, query, where, deleteDoc, getDocs as getSubcollectionDocs, doc} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

const useDeleteAllInfo = (history) => {
    const [nameColl, setNameColl] = useState('');
    const handleDeleteAll = async (nameT) => {
        const collections = ['hairstyles', 'dishes', 'knitting-crochet', 'makeup'];

        for (const collectionName of collections) {
            const parentDocRef = collection(projectFirestore, collectionName);
            const q = query(parentDocRef, where('title', '==', nameT));
            const parentDocSnapshot = await getDocs(q);

            if (!parentDocSnapshot.empty) {
                setNameColl(collectionName);

                const parentDocRef = doc(projectFirestore, collectionName, nameT);
                const subcollectionRef = collection(parentDocRef, 'steps');
                const subcollectionQuerySnapshot = await getSubcollectionDocs(subcollectionRef);

                // Deleting documents in the sub-collection
                for (const doc of subcollectionQuerySnapshot.docs) {
                    const { url } = doc.data();
                    const storageRef = ref(projectStorage, url);

                    // Deleting the image from Firebase Storage
                    await deleteObject(storageRef).then(() => {
                        console.log('Picture/video successfully deleted from storage');
                    }).catch((error) => {
                        console.error('Error deleting picture/video from storage:', error);
                    });

                    // Deleting the document from the sub-collection
                    await deleteDoc(doc.ref).then(() => {
                        console.log('Info successfully deleted from subcollection');
                    }).catch((error) => {
                        console.error('Error deleting info from subcollection:', error);
                    });
                }

                // Deleting the parent document
                await deleteDoc(parentDocRef).then(() => {
                    console.log('Title successfully deleted');
                    alert('Title with all info successfully deleted');
                    history.push(`/tutorial/${nameColl}`);
                }).catch((error) => {
                    console.error('Error deleting title:', error);
                });
            }else{
                setNameColl('');
            }
        }

        if (nameColl === '') {
            console.log('No collection with info specified to delete');
            alert('Title deleted');
            history.push(`/tutorial/${nameColl}`);
        }
    };
    return { handleDeleteAll };
};
export default useDeleteAllInfo;