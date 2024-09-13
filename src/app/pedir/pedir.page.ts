import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.page.html',
  styleUrls: ['./pedir.page.scss'],
})
export class PedirPage implements OnInit {


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
      document.documentElement.style.setProperty("--textos", "#848C9F");

      this.icono = "claro"
    }else{
      document.documentElement.style.setProperty("--fondo", "#00ffd9");
      document.documentElement.style.setProperty("--fondo-input", "#00ffd9");
      document.documentElement.style.setProperty("--texto-input", "#1b1b1b");
      document.documentElement.style.setProperty("--textos", "#1b1b1b");

      this.icono = "oscuro"
    }
  }

  ngOnInit(){
    this.anim.create()
    .addElement(document.querySelector("#iconVehicle")!)
    .duration(2000)
    .iterations(Infinity)
    .direction("alternate")
    .fromTo("color", "#0010f5", "#36029e")
    .fromTo("transform", 'translateX(100px)', 'translateX(-100px)')
    .play()
    
  }

}
