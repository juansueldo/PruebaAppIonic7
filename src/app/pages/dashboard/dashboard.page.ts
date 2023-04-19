import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {

  @Input() title: string;
  nameTitle: string
  constructor(

    private route: ActivatedRoute,
    private router: UtilsService,
    private firebaseSvc: FirebaseService
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const name = params['name'];
      console.log(email, name);
      this.nameTitle = name;
    });
  }

  logut(){
    this.firebaseSvc.logout().then(()=>
    this.router.routerLink('/login'))
  }

}
