import { Component, OnInit } from '@angular/core';
import { AnimationController, LoadingController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  icono   = "oscuro"
  isModalOpen = false;
  usuario = ""
  clave   = ""



  usuarios = [
    {
      nombre : "Juan Nuñez",
      email: "ju.nunezm@duocuc.cl",
      clave: "clavegod123"
    },
    {
      nombre : "Rodrigo Guajardo",
      email : "ror.guajardo@duocuc.cl",
      clave : "clavegod123"
    },
    ]

  constructor(
    private anim:AnimationController,
    private http: HttpClient,
    private loadingCtrl: LoadingController

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

  login(){

    for(let u of this.usuarios){
      if(u.email == this.usuario && u.clave == this.clave){
        console.log(`Bienvenido ${u.nombre}!!!.`)
        return
      }

       
      if(this.usuario != u.email && this.clave != u.clave){
        this.animarError(0)
        this.animarError(1)
        console.log("Datos Incorrecto(s), le queda(n) 1 intento(s) antes de borrar la cuenta!.")
      }
     
    }
    }

    async cambiarContra(){
      for(let u of this.usuarios){
        if(u.email == this.usuario){
          const loading = await this.loadingCtrl.create({
            message: 'Cargando...',
            
          });
          loading.present()
          let nueva = Math.random().toString(36).slice(-8)
          console.log(`Su nueva clave es ${nueva} !!!.`)
          u.clave = nueva
          let body = {
            "nombre": u.nombre,
            "app": "TeLlevoApp",
            "clave": u.clave,
            "email": u.email
        }
          this.http.post("https://myths.cl/api/reset_password.php",body)
          .subscribe((data)=>{
            console.log(data)
            loading.dismiss()  
          })
          
          return
  
        }
  
      }
      console.log("Usuario No Encontrado!!!.")
    }



    setOpen(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }

}
