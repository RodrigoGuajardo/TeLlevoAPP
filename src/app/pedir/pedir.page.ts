import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.page.html',
  styleUrls: ['./pedir.page.scss'],
})
export class PedirPage implements OnInit {

  userName: string = '';
  destino = ""
  nombre = ""
  destinos: any[] = []
  icono = "oscuro"
  usuario = ""
  clave = ""

  constructor(
    private anim: AnimationController,
    private toast: ToastController,
    private http: HttpClient
  ) { }

  ionViewWillEnter() {
    this.checkUser();
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
    // localStorage.removeItem('usuario'); // Eliminar el usuario del localStorage
    this.userName = ''; // Limpiar el nombre del usuario
  }

  crearViajePerfil(destino: string) {
    const viajeNuevo = {
      destino: destino,
      estado: 'Creado'
    };

    let viajesCreados = JSON.parse(localStorage.getItem('viajesCreados') || '[]');
    viajesCreados.push(viajeNuevo);
    localStorage.setItem('viajesCreados', JSON.stringify(viajesCreados));
  }


  crearViaje(nombre: string, destino: string) {
    const viajes = JSON.parse(localStorage.getItem('viajes') || '[]');

    // Aquí agregamos el nombre y el destino al nuevo viaje
    const nuevoViaje = { nombre, destino, fecha: new Date().toISOString() };

    viajes.push(nuevoViaje);
    localStorage.setItem('viajes', JSON.stringify(viajes));

    console.log('Viaje creado:', nuevoViaje);
    // Aquí puedes mostrar un toast o notificación de éxito
  }


  cambiarTema() {
    if (this.icono == "oscuro") {
      document.documentElement.style.setProperty("--fondo", "#212121");
      document.documentElement.style.setProperty("--fondo-input", "#1d2b2f");
      document.documentElement.style.setProperty("--texto-input", "#ffffff");
      document.documentElement.style.setProperty("--textos", "#ffffff");

      this.icono = "claro"
    } else {
      document.documentElement.style.setProperty("--fondo", "#00ffd9");
      document.documentElement.style.setProperty("--fondo-input", "#00ffd9");
      document.documentElement.style.setProperty("--texto-input", "#1b1b1b");
      document.documentElement.style.setProperty("--textos", "#1b1b1b");

      this.icono = "oscuro"
    }
  }

  ngOnInit() {
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


  async showToast(texto: string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 2500,
      positionAnchor: 'footer',
      cssClass: 'rounded-toast'
    });
    await toast.present();
  }

  guardarDestino(destino: any, nombre: any) {
    this.destinos.push(nombre, destino)

    localStorage.setItem("destinos", JSON.stringify(this.destinos))

    this.showToast(`Hola ${nombre} su viaje a ${destino} iniciara en breve!.`)
  }

}
