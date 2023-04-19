import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { CustomInputComponent } from 'src/app/shared/components/custom-input/custom-input.component';
import { User } from 'src/app/home/models/user.model';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CustomInputComponent, HeaderComponent,ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })
      
    constructor(
      private firebaseSvc: FirebaseService,
      private utilsSvc: UtilsService,
      private route: Router
    ) { }
  
    ngOnInit() {
    }
  
    submit() {
      if (this.form.valid) {
        //console.log(this.form.value);
        this.utilsSvc.presentLoading({message: 'Autenticando...'})
        this.firebaseSvc.login(this.form.value as User).then(async res =>{
          let user: User={
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email
          }
          this.utilsSvc.setElementInLocalstorage('user',user)
          this.utilsSvc.routerLink('/dashboard')
          this.route.navigate(['/dashboard'], { queryParams: user });
          
          
          this.utilsSvc.dismissLoading();
          this.utilsSvc.presentToast({
            message: `Te damos la bienvenida ${user.name}`,
            duration: 3500,
            color: 'warning',
            icon: 'person-outline'
          })
  
          this.form.reset();
        }, error =>{
          this.utilsSvc.presentToast({
            message: 'Usuario y/o contraseña inválida',
            duration: 5500,
            color: 'alert',
            icon: 'alert-circle-outline'
          })
          this.utilsSvc.dismissLoading();
        })
      }
    }
  }