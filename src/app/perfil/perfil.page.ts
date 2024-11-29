import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userName: string = '';
  email: string = '';
  clave: string = '';

  viajesCreados: any[] = [];
  viajesAceptados: any[] = [];

  icono="oscuro"

  constructor() {}

  ngOnInit() {
    // Cargar el nombre del usuario
    this.userName = localStorage.getItem('userName') || 'Usuario';
    this.email = localStorage.getItem('usuario')||'email';

    // Cargar los viajes del local storage
    this.viajesCreados = JSON.parse(localStorage.getItem('viajesCreados') || '[]');
    this.viajesAceptados = JSON.parse(localStorage.getItem('viajesAceptados') || '[]');


    

    document.documentElement.style.setProperty("--fondo", "#212121");
    document.documentElement.style.setProperty("--fondo-input", "#1d2b2f");
    document.documentElement.style.setProperty("--texto-input", "#ffffff");
    document.documentElement.style.setProperty("--textos", "#ffffff");
    this.icono = "claro"
  }

  ionViewWillEnter() {
    this.checkUser();
  }

  checkUser() {
    const usuarioStored = JSON.parse(localStorage.getItem('usuario') || 'null');
    if (usuarioStored) {
      this.userName = usuarioStored.nombre; // Asignar el nombre del usuario
      this.email = usuarioStored.email;
      this.clave = usuarioStored.clave;
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('usuario') !== null;
  }

  logout() {
    localStorage.removeItem('usuario'); // Eliminar el usuario del localStorage
    this.userName = ''; // Limpiar el nombre del usuario
  }

  borrarSecion(){
    localStorage.clear();
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


  

}
