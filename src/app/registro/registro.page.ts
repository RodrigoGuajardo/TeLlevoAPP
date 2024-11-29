import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Haptics } from '@capacitor/haptics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  icono = "oscuro";
  users: any[] = JSON.parse(localStorage.getItem('users') || '[]');
  email = "";
  nombre = "";
  apellido = "";
  clave1 = "";
  clave2 = "";
  usuario:string = "";
  usuarios: string = localStorage.getItem('usuario')||'[]';


  constructor(private anim: AnimationController,
    private router: Router
  ) { }

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
    document.documentElement.style.setProperty("--fondo", "#212121");
    document.documentElement.style.setProperty("--fondo-input", "#1d2b2f");
    document.documentElement.style.setProperty("--texto-input", "#ffffff");
    document.documentElement.style.setProperty("--textos", "#ffffff");
    this.icono = "claro";
    this.anim.create()
    .addElement(document.querySelector("#logo")!)
    .duration(5000)
    .iterations(Infinity)
    .direction("alternate")
    .fromTo("color", "#000000", "#ffffff")
    .fromTo("transform", "scale(1) rotate(-10deg)", "scale(1.5) rotate(10deg)")
    .play();
  }

  async animarError(index: number) {
    await Haptics.vibrate();
    this.anim.create()
      .addElement(document.querySelectorAll("input")[index]!)
      .duration(100)
      .iterations(3)
      .keyframes([
        { offset: 0, transform: "translateX(0px)", border: "1px transparent solid" },
        { offset: 0.25, transform: "translateX(-5px)", border: "1px red solid" },
        { offset: 0.5, transform: "translateX(0px)", border: "1px transparent solid" },
        { offset: 0.75, transform: "translateX(5px)", border: "1px red solid" },
        { offset: 1, transform: "translateX(0px)", border: "1px transparent solid" },
      ]).play();
  }

  registro() {
    let valid = true;

    if (this.email == "" || this.email.length < 8) {
      this.animarError(0);
      valid = false;
    }
    if (this.nombre.length < 3) {
      this.animarError(1);
      valid = false;
    }
    if (this.clave1 == "" || this.clave1.length < 8 || this.clave1 !== this.clave2) {
      this.animarError(2);
      valid = false;
    }
    if (this.clave2 == "") {
      this.animarError(3);
      valid = false;
    }

    if (valid) {
      // Guardar los datos en localStorage
      const usuario = {
        email: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
        clave: this.clave1 // Aquí puedes aplicar algún hash si es necesario
      };
      localStorage.setItem('usuario', JSON.stringify(usuario));
      console.log('Usuario registrado:', usuario);
      this.router.navigate(['/login']);

      // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
    }
  }
}
