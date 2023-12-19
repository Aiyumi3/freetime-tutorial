import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, onSnapshot, where, query, getDocs, orderBy } from 'firebase/firestore';

const useFirestore2 = (parentDocument) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const collections = ['hairstyles', 'dishes', 'knitting-crochet', 'makeup'];
        const fetchData = async () => {
            for (const collectionName of collections) {
                const parentDocRef = collection(projectFirestore, collectionName);
                const q = query(parentDocRef, where('title', '==', parentDocument));
                const parentDocSnapshot = await getDocs(q);

                if (!parentDocSnapshot.empty) {
                    console.log(`Документ в - ${collectionName}`);
                    const q = query(collection(projectFirestore, collectionName, parentDocument, 'steps'), orderBy('stepNumber', 'desc'));
                    const unsub = onSnapshot(q, (snap) => {
                        let documents = [];
                        snap.forEach((doc) => {
                            documents.push({ ...doc.data(), id: doc.id });
                        });
                        setDocs(documents);
                    });
                    return () => unsub();
                }else{ console.log(`Документ не знаходиться в ${collectionName}`);}
            }
        };

        fetchData().then(() => {
            // Обробка відповіді
            console.log('Дані отримані');
        }).catch(error => {
            // Обробка помилки
            console.error('Виникла помилка:', error);
        });
    }, [parentDocument]);

    return { docs };
};

export default useFirestore2;
