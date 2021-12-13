import React, { useEffect } from 'react';
import { 
  IonBackButton, 
  IonButtons, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonCol, 
  IonContent, 
  IonGrid, 
  IonHeader, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonListHeader, 
  IonNote, 
  IonPage, IonRow, 
  IonSegment, 
  IonSegmentButton, 
  IonTitle, 
  IonToolbar } from '@ionic/react';
import { useState } from 'react';
import axios from 'axios';

const Details: React.FC = () => { 
    const [detailStatus, setDetailStatus] = useState<boolean>(true)
    const [detailsOfHero, setDetails] = useState<any>();

    const [filmStatus, setfilmStatus] = useState<boolean>(false)
    const [listOfFilms, setlistOfFilms] = useState<any>([]);
    
    const [listOfShips, setlistOfShips] = useState<any>([]);


    let filmD: any = []; //to store film Details
    let shipD: any = []; //to store ship Details

    function getDetails(url: string){
      axios.get(url).then(res =>{
        console.log(res.data);
        setDetails(res.data);
      })
    }
    async function getFilms(filmUrl: string) {
      await axios.get(filmUrl).then(async (res)=>{
        filmD = [...filmD, res.data]
        setlistOfFilms(filmD);
      })
    }
    async function getShips(shipUrl: string) {
      await axios.get(shipUrl).then(async (res)=>{
        shipD = [...shipD, res.data]
        setlistOfShips(shipD);
      })
    }
    function changeSegment(value: any, list: any) {
      if (value == '0'){
        setDetailStatus(true)
        setfilmStatus(false)
      }
      if (value == '1'){
        for (let i = 0 ;  i < list.films.length; i++){
          getFilms(list.films[i]);
        }
        setDetailStatus(false)
        setfilmStatus(true)
      }
      if (value == '2'){
        for (let i = 0 ;  i < list.starships.length; i++){
          getShips(list.starships[i]);
        }
        setDetailStatus(false)
        setfilmStatus(false)
      }
    }
    useEffect(()=>{
      console.log("inside details")
        getDetails(window.localStorage['urlForDetails']);
        // url = window.localStorage['urlForDetails'];
      },[])
    const list = detailsOfHero || {};
    const filmlist = listOfFilms || {};
    const shiplist = listOfShips || {};


    
  return (
    <IonPage>
      <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton  defaultHref='/'  />
        </IonButtons>
        <IonTitle>{list.name}</IonTitle>
      </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegment  onIonChange={e => {changeSegment(e.detail.value, list)}}>
        <IonSegmentButton value='0'>
            <IonLabel>Details</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value='1'>
            <IonLabel>Movies</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value='2'>
            <IonLabel>Star Ships</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonContent>
          {
            detailStatus ? (
              <IonList id='basicDetails'>
                <IonListHeader>Basic Information</IonListHeader>
                <IonItem lines='none'>
                  <IonLabel>Name</IonLabel>
                  <IonNote slot='end'>{list.name}</IonNote>
                </IonItem>
                <IonItem lines='none'>
                  <IonLabel>Gender</IonLabel>
                  <IonNote slot='end'>{list.gender}</IonNote>
                </IonItem>
                <IonItem lines='none'>
                  <IonLabel>Birth Year</IonLabel>
                  <IonNote slot='end'>{list.birth_year}</IonNote>
                </IonItem>
                <IonItem lines='none'>
                  <IonLabel>Hair Color</IonLabel>
                  <IonNote slot='end'>{list.hair_color}</IonNote>
                </IonItem>
                <IonItem lines='none'>
                  <IonLabel>Height</IonLabel>
                  <IonNote slot='end'>{list.height} cm</IonNote>
                </IonItem>
                <IonItem lines='none'>
                  <IonLabel>Mass</IonLabel>
                  <IonNote slot='end'>{list.mass} Kg</IonNote>
                </IonItem>
              </IonList>
            ): filmStatus ? (            
                filmlist.map((obj: any)=>{
                  return (
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle>{obj.title}</IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                  )
                })
            ): (
              shiplist.map((obj: any)=>{
                return (
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{obj.name}</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                )
              })
            )
          }
        </IonContent>
      </IonContent>

      {/* <IonContent>
        <IonList>
          <IonListHeader>Basic Information</IonListHeader>
          <IonItem lines='none'>
            <IonLabel>Name</IonLabel>
            <IonNote slot='end'>{list.name}</IonNote>
          </IonItem>
          <IonItem lines='none'>
            <IonLabel>Gender</IonLabel>
            <IonNote slot='end'>{list.gender}</IonNote>
          </IonItem>
          <IonItem lines='none'>
            <IonLabel>Birth Year</IonLabel>
            <IonNote slot='end'>{list.birth_year}</IonNote>
          </IonItem>
          <IonItem lines='none'>
            <IonLabel>Hair Color</IonLabel>
            <IonNote slot='end'>{list.hair_color}</IonNote>
          </IonItem>
          <IonItem lines='none'>
            <IonLabel>Height</IonLabel>
            <IonNote slot='end'>{list.height} cm</IonNote>
          </IonItem>
          <IonItem lines='none'>
            <IonLabel>Mass</IonLabel>
            <IonNote slot='end'>{list.mass} Kg</IonNote>
          </IonItem>
        </IonList>
      </IonContent>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol class='col-6'>
              <IonButton expand='block' onClick={()=>{openFilmModal(list.films)}}>Show Films</IonButton>
            </IonCol>
            <IonCol class='col-6'>
              <IonButton expand='block' onClick={openStarShipModal}>Show StarShips</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonModal isOpen={showFilmModal} cssClass='my-custom-class ion-padding' swipeToClose={true}>
          <IonHeader translucent>
            <IonToolbar>
              <IonTitle>Films</IonTitle>
              <IonButtons slot='end'>
                <IonButton onClick={()=>{setFilmModal(false)}}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          {
              filmlist.map((obj: any)=>{
                return (
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{obj.title}</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                )
              })
            }
          </IonContent>
        </IonModal>
        <IonModal isOpen={showStarShipsModal} cssClass='my-custom-class ion-padding' swipeToClose={true}>
          <IonHeader translucent>
            <IonToolbar>
              <IonTitle>StarShips</IonTitle>
              <IonButtons slot='end'>
                <IonButton onClick={()=>{setStarShipsModal(false)}}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        </IonModal>
      </IonContent> */}
    </IonPage>
  );
};

export default Details;
