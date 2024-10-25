import { Component, OnInit } from '@angular/core';
import { AnimationController, LoadingController } from '@ionic/angular';
import { Haptics } from '@capacitor/haptics';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  icono = "oscuro";
  isModalOpen = false;
  usuario = "";
  clave = "";

  constructor(
    private anim: AnimationController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  cambiarTema() {
    if (this.icono == "oscuro") {
      document.documentElement.style.setProperty("--fondo", "#212121");
      document.documentElement.style.setProperty("--fondo-input", "#1d2b2f");
      document.documentElement.style.setProperty("--texto-input", "#ffffff");
      document.documentElement.style.setProperty("--textos", "#ffffff");
      this.icono = "claro";
    } else {
      document.documentElement.style.setProperty("--fondo", "#3c3f50");
      document.documentElement.style.setProperty("--fondo-input", "#3c3f50");
      document.documentElement.style.setProperty("--texto-input", "#1d2b2f");
      this.icono = "oscuro";
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
      .duration(2000)
      .iterations(Infinity)
      .direction("alternate")
      .fromTo("color", "#1500ff", "#6f00ff")
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

  login() {
    const usuarioStored = JSON.parse(localStorage.getItem('usuario') || 'null');

    if (usuarioStored) {
      if (usuarioStored.email === this.usuario && usuarioStored.clave === this.clave) {
        console.log(`Bienvenido ${usuarioStored.nombre}!!!.`);
        this.router.navigate(['/home']);
        // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
        return;
      }
    }

    // Si las credenciales no coinciden
    this.animarError(0);
    this.animarError(1);
    console.log("Datos Incorrecto(s), le queda(n) 1 intento(s) antes de borrar la cuenta!.");
  }

  async cambiarContra() {
    const usuarioStored = JSON.parse(localStorage.getItem('usuario') || 'null');

    if (usuarioStored && usuarioStored.email === this.usuario) {
      const loading = await this.loadingCtrl.create({
        message: 'Cargando...',
      });
      loading.present();
      let nueva = Math.random().toString(36).slice(-8);
      console.log(`Su nueva clave es ${nueva} !!!.`);
      usuarioStored.clave = nueva; // Actualizamos la clave en el objeto
      localStorage.setItem('usuario', JSON.stringify(usuarioStored)); // Guardamos de nuevo en localStorage

      let body = {
        "nombre": usuarioStored.nombre,
        "app": "TeLlevoApp",
        "clave": usuarioStored.clave,
        "email": usuarioStored.email
      };
      this.http.post("https://myths.cl/api/reset_password.php", body)
        .subscribe((data) => {
          console.log(data);
          loading.dismiss();
        });

      return;
    }

    console.log("Usuario No Encontrado!!!.");
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
