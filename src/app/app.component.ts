import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import 'bootstrap/dist/js/bootstrap.js';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'immoforgefrontend';
}
