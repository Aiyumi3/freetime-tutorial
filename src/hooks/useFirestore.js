import { useState, useEffect } from 'react'; //Імпортується два модулі
import { projectFirestore } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
//Отримує дані з Firestore та надає їх у компонент
const useFirestore = (collectionName) => { // ця функція - кастомний React-hook
//отримує аргумент collection, який вказує на колекцію Firestore

    const [docs, setDocs] = useState([]); //Деструктуруюче присвоєння станів як порожній масив
    useEffect(() => {
        const q = query(collection(projectFirestore, collectionName), orderBy('createdAt', 'desc'));

         //метод слідкує за змінами в колекції, onSnapshot возвращает функцию для отписки от слежения, и это асинхронная операция
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const documents = [];      //виконує додання даних в кінець створеного масиву один раз для кожного елемента з колекції бд
            snapshot.forEach((doc) => {
                documents.push({ ...doc.data(), id: doc.id });
            });
            setDocs(documents);
            //передається оновлений масив documents до стану docs
        });

        return () => unsubscribe();//функ очищення щоб уникнути зайвих запитів до Firestore після розміщення компонента
    }, [collectionName]);
    return { docs }; //Повертається об'єкт зі станом docs для відображення даних з Firestore
}
export default useFirestore;