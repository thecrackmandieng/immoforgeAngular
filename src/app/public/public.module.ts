import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from '../home/home-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HomeRoutingModule

  ]
})
export class PublicModule { }
