import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
// import { AdminService } from './admin.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,FormsModule,NavbarComponent,HomeComponent,HttpClientModule  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // providers:[AdminService]
})
export class AppComponent  {
  title = 'TranqilLife';
  // isAdmin: boolean = false;  
  whouser:string="msm"


  handleUsernameUpdate(event: any) {
    const username = event.username; // Adjust this according to your event structure
    console.log("in app"+event.username);
    this.whouser = username;}
  // constructor(private adminService: AdminService) {}

  // ngOnInit(): void {
  //   this.adminService.isAdmin$.subscribe((isAdmin: boolean) => {
  //     this.isAdmin = isAdmin;
  //   });
  // }
}
