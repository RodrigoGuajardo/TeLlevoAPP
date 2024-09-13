import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  icono   = "oscuro"
  usuario = ""
  nombre = ""
  apellido = ""
  clave1   = ""
  clave2   = ""

  constructor(
    private anim:AnimationController
  ) { }

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

  ngOnInit() {
    document.documentElement.style.setProperty("--fondo", "#212121");
    document.documentElement.style.setProperty("--fondo-input", "#1d2b2f");
    document.documentElement.style.setProperty("--texto-input", "#ffffff");
    document.documentElement.style.setProperty("--textos", "#ffffff");
    this.icono = "claro"
    this.anim.create()
    .addElement(document.querySelector("#logo")!)
    .duration(2000)
    .iterations(Infinity)
    .direction("alternate")
    .fromTo("color", "#1500ff", "#6f00ff")
    .fromTo("transform", "scale(1) rotate(-10deg)", "scale(1.5) rotate(10deg)")
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

  registro(){
    if(this.usuario == "" ){
      this.animarError(0)
    }else{
      if(this.usuario.length < 6 ){
        this.animarError(0)
      }
    }
    if(this.nombre == ""){
      this.animarError(1)
    }
    if(this.apellido == ""){
      this.animarError(2)
    }
    if(this.clave1 == ""){
      this.animarError(3)
    }else{
      if(this.clave2 != this.clave1){
        this.animarError(3)
      }else{
        if(this.clave1.length < 8 ){
          this.animarError(3)
        }
      }

    }
    
    if(this.clave2 == ""){
      
      this.animarError(4)

    }else{
      if(this.clave1 != this.clave2){
        this.animarError(4)
      }else{
        if(this.clave1.length < 8 ){
          this.animarError(4)
        }
      }

    }
  }

}
