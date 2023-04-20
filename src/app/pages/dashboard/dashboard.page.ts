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

    private route: ActivatedRoute,
    private router: UtilsService,
    private firebaseSvc: FirebaseService,
    
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const name = params['name'];
      this.nameTitle = name;
    });
  }

  logout(){
    this.firebaseSvc.logout();
    this.router.presentLoading({message: `Cerrando sesión de ${this.nameTitle}...`,duration: 500});
    this.router.dismissLoading();
    setTimeout(()=>{
      this.router.routerLink('/login');
    }, 1000);
    
    this.router.presentToast({
      message: `Sesión cerrrada `,
      duration: 1500,
      color: 'warning',
      icon: 'person-outline'
    })

  }

}
