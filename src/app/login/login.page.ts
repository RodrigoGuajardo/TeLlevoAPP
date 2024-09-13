import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  icono   = "oscuro"
  usuario = ""
  clave   = ""

  constructor(
    private anim:AnimationController
  ) { }

  cambiarTema(){
    if(this.icono == "oscuro"){
      document.documentElement.style.setProperty("--fondo", "#212121");
      document.documentElement.style.setProperty("--fondo-input", "#1d2b2f");
      document.documentElement.style.setProperty("--texto-input", "#848C9F");

      this.icono = "claro"
    }else{
      document.documentElement.style.setProperty("--fondo", "#00ffd9");
      document.documentElement.style.setProperty("--fondo-input", "#00ffd9");
      document.documentElement.style.setProperty("--texto-input", "#1b1b1b");

      this.icono = "oscuro"
    }
  }

  ngOnInit() {
    this.anim.create()
    .addElement(document.querySelector("#logo")!)
    .duration(2000)
    .iterations(Infinity)
    .direction("alternate")
    .fromTo("color", "#1500ff", "#6f00ff")
    .fromTo("transform", "scale(1) rotate(-10deg)", "scale(1.5) rotate(10deg)")
    .play()


    this.anim.create()
    .addElement(document.querySelector("#tema")!)
    .duration(Infinity)
    .iterations(Infinity)
    .direction("normal")
    .fromTo("transform","rotate(20deg)", "rotate(20deg)")
    .play()
  }

  async animarError(index:number){
    await Haptics.vibrate();
    this.anim.create()
    .addElement(document.querySelectorAll("input")[index]!)
    .duration(100)
    .iterations(3)
    .keyframes([
      {offset: 0, transform: "translateX(0px)", border: "1px transparent solid"},
      {offset: 0.25, transform: "translateX(-5px)", border: "1px red solid"},
      {offset: 0.5, transform: "translateX(0px)", border: "1px transparent solid"},
      {offset: 0.75, transform: "translateX(5px)", border: "1px red solid"},
      {offset: 1, transform: "translateX(0px)", border: "1px transparent solid"},
    ]).play()
  }

  login(){
    if(this.usuario != "juanito"){
      this.animarError(0)
    }
    if(this.clave != "123456"){
      this.animarError(1)
    }
  }

}