import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.page.html',
  styleUrls: ['./pedir.page.scss'],
})
export class PedirPage implements OnInit {


  destinos: any[] = []

  icono   = "oscuro"
  usuario = ""
  clave   = ""

  constructor(
    private anim:AnimationController,
    private toast: ToastController,
    private http: HttpClient
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
      document.documentElement.style.setProperty("--textos", "#1b1b1b");

      this.icono = "oscuro"
    }
  }

  ngOnInit(){
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

  guardarDestino(destino:any){
    this.destinos.push(destino)
    localStorage.setItem("destino", JSON.stringify(this.destinos))
    this.showToast(`Destino ${destino} guardado con Exito!.`)
  }

}
