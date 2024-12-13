import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userName: string = '';
  email: string = '';
  clave: string = '';
  clave3='';

  viajesCreados: any[] = []; 
  viajesAceptados: any[] = [];

  icono="oscuro"

  constructor(private anim: AnimationController,
    private toast: ToastController,
    private http: HttpClient,
    private router: Router) {}

  ngOnInit() {
    // Cargar los viajes del local storage
    // this.viajesCreados = JSON.parse(localStorage.getItem('viajesPorUsuarios[this.email]') || '[]');
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



  checkUser () {
    const usuarioStored = JSON.parse(localStorage.getItem('usuarioLogueado') || 'null');
    if (usuarioStored) {
        this.userName = usuarioStored.nombre; // Asignar el nombre del usuario
        this.email = usuarioStored.email;
        this.clave = usuarioStored.clave;
        this.obtenerViajesPorUsuario(usuarioStored.email); // Llamar a la función para obtener los viajes creados
        console.log('Viajes creados:', this.viajesCreados); // Verifica si se están cargando los viajes
    }
}



obtenerViajesPorUsuario(llave: string) {
  const viajesPorUsuario = JSON.parse(localStorage.getItem('viajesPorUsuario') || '{}');
  const viajesGuardados = viajesPorUsuario[llave] ? viajesPorUsuario[llave] : []; // Asegúrate de que esto sea un array
  this.viajesCreados = viajesGuardados; // Asignar los viajes creados a la propiedad
  return viajesGuardados; // Devuelve los viajes guardados
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

  borrarSecion(){
    //clear en caso de problemas con el local storage
    //pasa mas de lo que se cree durante el proceso
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


  async cambiarContra(){
    const usuarioStored = JSON.parse(localStorage.getItem('usuarioLogueado') || 'null');
    

        
        let nueva = this.clave3
        console.log(`Su nueva clave es ${nueva} !!!.`)
        usuarioStored.clave = nueva

        const usuario = {
          email: usuarioStored.email,
          nombre: usuarioStored.nombre,
          apellido: usuarioStored.apellido,
          clave: nueva // Aquí puedes aplicar algún hash si es necesario
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));
        let body = {
          "nombre": usuarioStored.nombre,
          "app": "TeLlevoApp",
          "clave": usuarioStored.clave,
          "email": usuarioStored.email
      }
        this.http.post("https://myths.cl/api/reset_password.php",body)
        .subscribe((data)=>{
          console.log(data) 
        })
        
        return


  }



  

}
