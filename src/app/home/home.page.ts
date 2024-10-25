import { Component, OnInit,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';

import {  } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userName: string = '';

  icono   = "oscuro"
  usuario = ""
  clave   = ""

  constructor(
    private anim:AnimationController,
    private toast: ToastController,
    private http: HttpClient,
    private router: Router
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
    localStorage.removeItem('usuario'); // Eliminar el usuario del localStorage
    this.userName = ''; // Limpiar el nombre del usuario
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

  cambiarTema(){
    if(this.icono == "oscuro"){
      document.documentElement.style.setProperty("--fondo", "#212121");
      document.documentElement.style.setProperty("--fondo-input", "#1d2b2f");
      document.documentElement.style.setProperty("--texto-input", "#ffffff");
      document.documentElement.style.setProperty("--textos", "#ffffff");
      this.icono = "claro"
    }else{
      document.documentElement.style.setProperty("--fondo", "#00ffd9");
      document.documentElement.style.setProperty("--fondo-input", "#00ffd9");
      document.documentElement.style.setProperty("--texto-input", "#1b1b1b");

      this.icono = "oscuro"
    }
  }

  ngOnInit(){
    document.documentElement.style.setProperty("--fondo", "#212121");
    document.documentElement.style.setProperty("--fondo-input", "#1d2b2f");
    document.documentElement.style.setProperty("--texto-input", "#ffffff");
    document.documentElement.style.setProperty("--textos", "#ffffff");
    this.icono = "claro"
    
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

