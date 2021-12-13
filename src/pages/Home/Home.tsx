import React, { useEffect } from 'react';
import {
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonContent, 
  IonHeader,  
  IonLoading,  
  IonPage, 
  IonSkeletonText, 
  IonTitle, 
  IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Home.css';
import axios from 'axios';

const Home: React.FC = () => {
  const [isLoading, setLoader] = useState<any>(true);
  const [listItems, setListItems] = useState<any>();
  function getData() {
    let url: string = 'https://swapi.dev/api/people/?format=json'
    axios.get(url).then(async res=>{
      console.log(res.data.results)
      setLoader(false)
      setListItems(res.data.results)
    })
  }
  function navigateToDetails(url: string) {
    console.log("url--->", url)
    window.localStorage['urlForDetails'] = url;
    window.location.href = '/details'
    
  }
  useEffect(()=>{
    getData();
    console.log(items)
  },[])
  const items = (listItems || []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>STARWARS</IonTitle>
        </IonToolbar>
      </IonHeader>
      {
        isLoading? (
          <IonContent>
            <IonLoading isOpen={isLoading}></IonLoading>
          </IonContent>
        ):
        (
          <IonContent>
            {
              items.map((obj: any)=>{
                return (
                  <IonCard onClick={()=> navigateToDetails(obj.url)}>
                    <IonCardHeader>
                      <IonCardTitle>{obj.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      Born in {obj.birth_year}, having hair color {obj.hair_color} and eye color {obj.eye_color}
                      . Height of {obj.name} is {obj.height} cm and mass is {obj.mass}Kg, with skin color {obj.skin_color}.
                    </IonCardContent>
                  </IonCard>      
                )
              })
            }
          </IonContent>
        )
      }
      
    </IonPage>
  );
};

export default Home;
