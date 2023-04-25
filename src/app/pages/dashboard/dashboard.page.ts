import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class DashboardPage implements OnInit {

  @Input() title: string;
  nameTitle: string
  constructor(

    private router: ActivatedRoute,
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService,
    
  ) { }
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      const email = params['email'];
      const name = params['name'];
      this.nameTitle = name;
    });
  }

 async logout(){
    await this.firebaseSvc.logout();
    this.utilsSvc.presentLoading({message: `Cerrando sesión de ${this.nameTitle}...`, duration: 500});
    
    setTimeout(()=>{
      this.utilsSvc.routerLink('/login');
    }, 1000);
    
    this.utilsSvc.dismissLoading();
    
    this.utilsSvc.presentToast({
      message: `Sesión cerrrada `,
      duration: 1500,
      color: 'warning',
      icon: 'person-outline'
    })

  }

}
