// import { Location } from '../models/Location';
import { IonChip, IonLabel } from '@ionic/react';
import React, { useEffect, useRef } from 'react';

interface MapProps {
  locations: any
  mapCenter: any
}

const Map: React.FC<MapProps> = ({ mapCenter, locations }) => {
  const mapEle = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map>();

  useEffect(() => {

    map.current = new google.maps.Map(mapEle.current, {
      center: {
        lat: mapCenter.lat,
        lng: mapCenter.lng
      },
      zoom: 17
    });

    addMarkers();

    google.maps.event.addListenerOnce(map.current, 'idle', () => {
      if (mapEle.current) {
        mapEle.current.classList.add('show-map');
      }
    });

    function addMarkers() {
      locations.forEach((markerData: any) => {
        let items = `<p>Items Required</p>`;
        markerData.requiredItems.map((i: any) => {
          items += `<p>${i.item_name}: ${i.item_quantity} </p>`
        })
        //let navigate = <IonChip><IonLabel><a href={markerData.navigation_url}>Navigate-></a></IonLabel></IonChip>
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5><h5>${markerData.contact}</h5><h5>${markerData.address}</h5>${items}
          <div style="background: #1A73E8; text-align: center; border-radius: 10px; font-weight:400;"><a style="font-size:17px; text-decoration: none; color: white; " href=${markerData.navigation_url}>Navigate</a></div>`
        });

        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(markerData.lat, markerData.lng),
          map: map.current!,
          icon: '/assets/img/marker.png',
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map.current!, marker);
        });
      });
    }

  }, [mapCenter, locations]);

  return (
    <div ref={mapEle} className="map-canvas"></div>
  );
}

export default Map;