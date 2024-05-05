import { JsonPipe, NgIf } from '@angular/common';
import { Component, DoCheck, Input, OnInit, input } from '@angular/core';
// import { AdminService } from '../admin.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf,JsonPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  //providers:[AdminService]
})
export class NavbarComponent {
  isAdmin:boolean=true;
  
  // ngDoCheck(): void {
  //   console.log(this.isAdmin)
  // }

  logout(){
    
    // this.isAdmin=Boolean(this.adminService.isAdmin$)
  }
}
