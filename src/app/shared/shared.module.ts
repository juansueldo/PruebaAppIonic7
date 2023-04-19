import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {AngularFireModule} from '@angular/fire/compat';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgIf,
    AngularFireModule,
    AngularFireAuthModule

  ]
})
export class SharedModule { }
