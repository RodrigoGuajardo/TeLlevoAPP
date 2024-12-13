import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  globe,
} from 'ionicons/icons';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userName: string = '';
  userLog: string = '';
  activeUser:any ;
  icono = "oscuro"
  usuario = ""
  clave = ""
  constructor(
    private anim: AnimationController,
    private toast: ToastController,
    private http: HttpClient,
    private router: Router
  ) {
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, globe });
  }

  ionViewWillEnter() {
    this.checkUser();
  }

  checkUser() {
    const usuarioStored = JSON.parse(localStorage.getItem('usuarioLogueado') || 'null');
    if (usuarioStored) {
      this.userLog = usuarioStored.nombre; // Asignar el nombre del usuario
    }
  }

  isLoggedIn(): boolean {
    // return localStorage.getItem('usuarioLogueado') !== null;
    


    if ( localStorage.getItem('usuarioLogueado')!== null ) {
      const usuarioStored = JSON.parse(localStorage.getItem('usuarioLogueado') || 'null');
      if( usuarioStored.email !== '' ) {
        return true;

      }else{
        return false;
      }

  }else{
    return false;
  }
  }
  logout() {
    // Eliminar el usuario activo para dejarlo como usuario pasivo

    const usuarioLogueado = {
      email: '',
      nombre: '',
      apellido: '',
      clave: '' 
    };
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
    this.router.navigate(['/home']);
  }

  navigateToPedir() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/pedir']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  navigateToLlevar() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/llevar']);
    } else {
      this.router.navigate(['/login']);
    }
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

  ngOnInit() {

    this.activeUser = JSON.parse(localStorage.getItem('activeUser') || '{}');

    document.documentElement.style.setProperty("--fondo", "#212121");
    document.documentElement.style.setProperty("--fondo-input", "#1d2b2f");
    document.documentElement.style.setProperty("--texto-input", "#ffffff");
    document.documentElement.style.setProperty("--textos", "#ffffff");
    this.icono = "claro"
  }


  borrarSecion(){
    localStorage.clear();
  }

  async showToast(texto: string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 3000,
      positionAnchor: 'footer',
      cssClass: 'rounded-toast'
    });
    await toast.present();
  }
}





