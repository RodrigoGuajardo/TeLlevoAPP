import { getLocaleDirection } from '@angular/common';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
declare var google: any;


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage  {

  constructor(private platform: Platform, private zone: NgZone) { }

  direccion:any[]= []
  direccions= this.direccion

  destino=""
  
  input = ""
  
  autocompleteItems!: any[];
  
  distancia = ""
  
  duracion = ""
  
  @ViewChild('map') mapElement: ElementRef | undefined;
  
  public map: any;
  
  public start: any = "Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile";
  
  public end: any = this.destino;
  
  public directionsService: any;
  
  public directionsDisplay: any;
  
  
  
    ionViewDidEnter() {
      this.destino = (localStorage.getItem("direccion")!)
      console.log(this.destino)
      this.platform.ready().then(() => {
        this.initMap()
       })
  
    }
  
    initMap() {
  
      this.directionsService = new google.maps.DirectionsService;
     
      this.directionsDisplay = new google.maps.DirectionsRenderer;
     
      // let latLng = new google.maps.LatLng(this.latitude, this.longitude);
     
      let mapOptions = {
     
       // center: latLng,
     
       zoom: 5,
     
       zoomControl: true,
     
       scaleControl: false,
     
       mapTypeControl: false,
     
       streetViewControl: false,
     
       fullscreenControl: true,
     
       mapTypeId: google.maps.MapTypeId.ROADMAP,
     
      };
     
      this.map = new google.maps.Map(this.mapElement!.nativeElement, mapOptions);
     
      let infoWindow = new google.maps.InfoWindow();
     
     
     
      // Try HTML5 geolocation.
     
      if (navigator.geolocation) {
     
       navigator.geolocation.getCurrentPosition(
     
        (position: GeolocationPosition) => {
     
         const pos = {
     
          lat: position.coords.latitude,
     
          lng: position.coords.longitude,
     
         };
     
         // new google.maps.Marker({
     
         //  position: pos,
     
         //  map: this.map,
     
         // });
     
         infoWindow.setPosition(pos);
     
         infoWindow.setContent("Estas aquí.");
     
         infoWindow.open(this.map);
     
         this.map.setCenter(pos);
     
        }
     
       );
     
      }
     
     
     
     
     
      this.directionsDisplay.setMap(this.map);
     
      this.calculateAndDisplayRoute();
     
     }
     
     
     
     
     
     
     
     calculateAndDisplayRoute() {
     
      this.directionsService.route({
     
       origin: this.start,
     
       destination: this.end,
     
       travelMode: 'DRIVING'
     
      }, (response: any, status: string) => {
     
       if (status === 'OK') {
     
        this.directionsDisplay.setDirections(response);
     
        const route = response.routes[0];
     
        const leg = route.legs[0];
     
        // Distancia total
     
        const distanceInKilometers = (leg.distance.value / 1000).toFixed(2);
     
        console.log(`Distancia: ${distanceInKilometers} km`);
     
        this.distancia = `${distanceInKilometers} km`;
     
        // Tiempo de viaje
     
        const durationInSeconds = leg.duration.value;
     
        const minutes = Math.floor(durationInSeconds / 60); // minutos
     
        const seconds = durationInSeconds % 60; // segundos
     
        const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
     
        console.log(`Duración: ${formattedDuration} (mm:ss)`);
     
        this.duracion = `${formattedDuration}`;
     
        // Información sobre origen y destino
     
        console.log(`Inicio: ${leg.start_address}`);
     
        console.log(`Destino: ${leg.end_address}`);
     
     
     
        // Tiempo de viaje en tráfico
     
        if (leg.duration_in_traffic) {
     
         const durationInTraffic = leg.duration_in_traffic.value / 60;
     
         console.log(`Tiempo de viaje en tráfico: ${durationInTraffic} minutos`);
     
        }
     
     
     
        // Detalles de los pasos
     
        leg.steps.forEach((step: any, index: number) => {
     
         const stepDistance = step.distance.value / 1000; // en km
     
         const stepDuration = step.duration.value / 60; // en minutos
     
     
     
         console.log(`Paso ${index + 1}: ${step.instructions}, Distancia: ${stepDistance} km, Tiempo: ${stepDuration} minutos`);
     
        });
     
     
     
       } else {
     
        window.alert('Directions request failed due to ' + status);
     
       }
     
      });
     
     }
     
     
     
     updateSearchResults() {
     
      let GoogleAutocomplete = new google.maps.places.AutocompleteService();
     
      if (this.end == '') {
     
       this.autocompleteItems = [];
     
       return;
     
      }
     
      GoogleAutocomplete!.getPlacePredictions({ input: this.end },
     
       (predictions: any, status: any) => {
     
        this.autocompleteItems = [];
     
        this.zone.run(() => {
     
         predictions.forEach((prediction: any) => {
     
          this.autocompleteItems!.push(prediction);
     
         });
     
        });
     
       });
     
     }
     
     selectSearchResult(item: any) {
     
      this.end = item.description
     
      this.autocompleteItems = []
     
      this.initMap()
     
     }
  
  
  }
  