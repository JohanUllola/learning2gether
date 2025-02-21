import { collection, query, getDocs, where } from 'firebase/firestore';
import {defineStore} from 'pinia';
import { db,auth } from '../firebaseConfig';

export const useDatabaseStore= defineStore('database', {
    state: ()=>({
        documents:[]
    }),
    actions:{
       async getPerfil(){
            try {
                const q = query(collection(db,"Perfil")//, 
                //where("usuario", "==", auth.currentUser.uid)
            );
                const querySnapShot= await getDocs(q);
                querySnapShot.forEach(doc =>{
                    console.log(doc.id, doc.data());
                    this.documents.push({
                        id: doc.id,
                        ...doc.data()
                    });
                })
            } catch (error) {
                console.log(error);
            }finally{

            }

  }
}

});