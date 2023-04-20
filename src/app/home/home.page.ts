import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent],
})
export class HomePage {
  constructor(private route: Router,
    private platform: Platform) {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        navigator['app'].exitApp();
      });
    }
  

  redirectLogin(){
    this.route.navigate(['/login']);
  }
  redirectSignup(){
    this.route.navigate(['/signup']);
  }

}
