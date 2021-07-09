import { AuthService } from "src/app/servicios/auth.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogout(){
    this.authService.logout();
  }
}
