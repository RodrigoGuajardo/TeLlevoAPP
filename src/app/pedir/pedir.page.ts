import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.page.html',
  styleUrls: ['./pedir.page.scss'],
})
export class PedirPage implements OnInit {

  userName: string = '';
  userLog: string ='';
  email: string = '';
  destino = ""
  nombre = ""
  destinos: any[] = []
  icono = "oscuro"
  usuario = ""
  clave = ""

  constructor(
    private anim: AnimationController,
    private toast: ToastController,
    private http: HttpClient,
    private router: Router
  ) {
    

   }

  ionViewWillEnter() {
    this.checkUser();
    this.userName = localStorage.getItem('username') || 'Usuario Invitado';  // Valor predeterminado
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



  crearViaje(nombre: string, destino: string) {
    const emailUsuario = JSON.parse(localStorage.getItem('usuarioLogueado') || 'null').email;
    
    // Obtener los viajes guardados en localStorage
    const viajesPorUsuario = JSON.parse(localStorage.getItem('viajesPorUsuario') || '{}');
    
    // Si no existe un array para el usuario, inicialízalo
    if (!viajesPorUsuario[emailUsuario]) {
      viajesPorUsuario[emailUsuario] = [];
    }
  
    // Crear el nuevo viaje
    const nuevoViaje = { nombre, destino, fecha: new Date().toISOString() };
  
    // Agregar el nuevo viaje al array del usuario
    viajesPorUsuario[emailUsuario].push(nuevoViaje);
  
    // Guardar de nuevo en localStorage
    localStorage.setItem('viajesPorUsuario', JSON.stringify(viajesPorUsuario));
  
    console.log('Viaje creado:', nuevoViaje);
  
    this.showToast(`Hola ${nombre}, su viaje a ${destino} está en espera!`);
  }

  crearViajesLlevar(nombre: string, destino: string) {
    const viajes = JSON.parse(localStorage.getItem('viajes') || '[]');
    // Aquí agregamos el nombre y el destino al nuevo viaje

    nombre : { this.userName };
    const nuevoViaje = { nombre, destino, fecha: new Date().toISOString() };

    viajes.push(nuevoViaje);
    localStorage.setItem('viajes', JSON.stringify(viajes));

    console.log('Viaje creado:', nuevoViaje);

  }



  obtenerViajesPorUsuario(email: string) {
    const viajesPorUsuario = JSON.parse(localStorage.getItem('viajesPorUsuario') || '{}');
    return viajesPorUsuario[email] || []; // Devuelve un array vacío si no hay viajes
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

  borrarSecion(){
    localStorage.clear();
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

    
  }

  
}
