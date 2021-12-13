import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import React from 'react';

const Details: React.FC = () => { 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
            <h1>Hello Details</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Details;
