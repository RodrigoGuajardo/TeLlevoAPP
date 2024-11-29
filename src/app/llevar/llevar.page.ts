import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnimationController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-llevar',
  templateUrl: './llevar.page.html',
  styleUrls: ['./llevar.page.scss'],
})
export class LlevarPage implements OnInit {

  
  userName: string = '';
  direccion:any[]= []
  viajes:any[]= []
  destino=""
  direccions=""
  icono   = "oscuro"
  destinos: any[]= [];

  constructor(
    private anim:AnimationController,
    private toast: ToastController,
    private http: HttpClient,
    private router: Router
  ) { }

  ionViewWillEnter(){
    this.destinos = JSON.parse(localStorage.getItem("destinos")!)
    this.checkUser();
    

  }
  cargarViajes() {
    const viajes = JSON.parse(localStorage.getItem('viajes') || '[]');
    this.destinos = viajes; // Asignar los viajes a la propiedad destinos
  }
  


  checkUser() {
    const usuarioStored = JSON.parse(localStorage.getItem('usuario') || 'null');
    if (usuarioStored) {
      this.userName = usuarioStored.nombre; // Asignar el nombre del usuario
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('usuario') !== null;
  }

  logout() {
    localStorage.removeItem('usuario'); // Eliminar el usuario del localStorage
    this.userName = ''; // Limpiar el nombre del usuario
  }


  cambiarTema() {
    if (this.icono == "oscuro") {
      // Usando el objeto document global
      document.documentElement.style.setProperty("--fondo", "#212121");
      document.documentElement.style.setProperty("--fondo-input", "#1d2b2f");
      document.documentElement.style.setProperty("--texto-input", "#ffffff");
      document.documentElement.style.setProperty("--textos", "#ffffff");
      this.icono = "claro"
    } else {
      document.documentElement.style.setProperty("--fondo", "#666666");
      document.documentElement.style.setProperty("--fondo-input", "#00ffd9");
      document.documentElement.style.setProperty("--texto-input", "#000000");

      this.icono = "oscuro"
    }
  }

  ngOnInit(){
    this.viajes=JSON.parse(localStorage.getItem('viajes') || '[]');

    this.cargarViajes();
    const storedItems = localStorage.getItem('destinos');
    document.documentElement.style.setProperty("--fondo", "#212121");
    document.documentElement.style.setProperty("--fondo-input", "#1d2b2f");
    document.documentElement.style.setProperty("--texto-input", "#ffffff");
    document.documentElement.style.setProperty("--textos", "#ffffff");
    this.icono = "claro"
    this.anim.create()
    .addElement(document.querySelector("#iconVehicle")!)
    .duration(2000)
    .iterations(Infinity)
    .direction("alternate")
    .fromTo("color", "#0010f5", "#36029e")
    .fromTo("transform", 'translateX(100px)', 'translateX(-100px)')
    .play()
    
  }


  cargarViaje(destino: string) {
    const viajes = JSON.parse(localStorage.getItem('viajes') || '[]');
    
    const nuevoViaje = { nombre: "Nombre de Usuario", destino };
    
    viajes.push(nuevoViaje);
    localStorage.setItem('viajes', JSON.stringify(viajes));

    this.showToast(`Viaje a ${destino} agendado!`);
  }

  async showToast(texto: string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }

  aceptarViaje(destino: string) {
    const viajeAceptado = {
      destino: destino,
      estado: 'Aceptado'
    };
  
    let viajesAceptados = JSON.parse(localStorage.getItem('viajesAceptados') || '[]');
    viajesAceptados.push(viajeAceptado);
    console.log(`guardado en perfil`);
    localStorage.setItem('viajesAceptados', JSON.stringify(viajesAceptados));
  }
  
  borrarSecion(){
    localStorage.clear();
  }



  irAMapa(destino: string) {

    console.log(`Navegando al mapa con destino: ${destino}`);
    this.direccion.push(destino)
    
    localStorage.setItem("direccion", JSON.stringify(this.direccion))
  }

}
