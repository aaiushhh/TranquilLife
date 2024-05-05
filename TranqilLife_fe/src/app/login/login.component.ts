import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { UserComponent } from '../user/user.component';
// import { AdminComponent } from '../admin/admin.component';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent implements OnInit {
  login: boolean = true;
  admin: boolean = false;
  user: boolean = false;
  Error = ''
  username: any = ''
  password = ''
  email = ''
  verificationSuccess = false;
  userid = ''

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.http.get<any>('http://localhost:9992/whoLogged/fetch').subscribe((resultdata) => {
      if (resultdata.status) {
        console.log("yes whoLogged" + resultdata.data)
        this.login = false;
        this.admin = false;
        this.username = resultdata.data;
        this.http.get<any>("http://localhost:9992/login/email/" + this.username).subscribe((resultdata) => {
          if (resultdata.status) {
            console.log("yes" + resultdata.data._id)
            this.email = resultdata.data.email;
            this.userid = resultdata.data._id;
            console.log("yes email")
          }
          else {
            console.log("no email")
          }
        });
      }
      console.log("no whoLogged" + resultdata.message)

    });

  }
  // @Output() updateUsername: EventEmitter<string> = new EventEmitter<string>();


  validateform() {
    this.Error = '';
    if (this.username.trim() == 'admin' && this.password.trim() == 'admin') {
      this.admin = true;
      this.login = false;

      return;
    }

    // Check for empty username
    if (!this.username.trim()) {
      this.Error = 'Username is required.' + this.username;
      console.log(this.username)
      return;
    }
    // Username validation
    if (this.username.length < 4 || this.username.length > 10) {
      this.Error = 'Username must be between 4 and 10 characters.';
      return; // Exit validation if username length is invalid
    } else if (!/^[a-zA-Z0-9_.]+$/.test(this.username)) {
      this.Error = 'Username can only contain letters, numbers, ".", and "_".';
      return;
    }


    // Check for empty password
    if (!this.password.trim()) {
      this.Error = 'Password is required.';
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    if (this.password.length < 8 || this.password.length > 12) {
      this.Error = 'Password must be between 8 and 12 characters.';
      return;
    } else if (!passwordRegex.test(this.password)) {
      this.Error = 'Password must have at least one lowercase, one uppercase, one number, and one special character.';
      return;
    }

    this.register();

  }

  redirectToDesignatedLink(a: string) {

    window.location.href = a;
  }

  register() {
    let bodydata = {
      // "email":this.email,
      "password": this.password,
      "username": this.username
    };
    this.http.post('http://localhost:9992/login/login', bodydata).subscribe((resultdata: any) => {
      console.log(resultdata.status);
      console.log(this.password + "? " + resultdata.message)
      if (resultdata.status) {

        console.log(this.password + "? " + resultdata.message)

        this.http.post("http://localhost:9992/whoLogged/create", { "username": this.username }).subscribe((resultdata: any) => {
          if (resultdata.status) {
            console.log("whoLogged Updated")
          }
        })
        this.login = false;
        this.http.get<any>("http://localhost:9992/login/email/" + this.username).subscribe((resultdata) => {
          if (resultdata.status) {
            console.log("yes" + resultdata.data._id)
            this.email = resultdata.data.email;
            this.userid = resultdata.data._id;
          }
          else {
            console.log("no")
          }
        });
        console.log("DONE");
      }


    })

  }

  userList: any[] = [];
  fetchDetails() {
    this.http.get<any>('http://localhost:9992/login/users').subscribe({
      next: (resultData: any) => {
        // Assuming the response contains data property with user array
        if (resultData.status && resultData.data && Array.isArray(resultData.data)) {
          this.userList = resultData.data; // Update usersList with fetched data
        } else {
          console.error('Invalid response format');
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }



  deluser(userId: string) {
    this.http.delete<any>('http://localhost:9992/login/users/' + userId).subscribe({
      next: (resultData: any) => {
        if (resultData.status) {
          console.log('User deleted successfully');
          // Remove deleted user from userList
          this.userList = this.userList.filter(user => user._id !== userId);

        } else {
          console.error('Error deleting user:', resultData.message);
        }
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }


  delUser() {
    this.http.delete<any>('http://localhost:9992/login/users/' + this.userid).subscribe({
      next: (resultData: any) => {
        if (resultData.status) {
          console.log('User deleted successfully');
          this.http.delete("http://localhost:9992/whoLogged/del").subscribe((resultdata) => {
            console.log(resultdata)
          })
          this.redirectToDesignatedLink("login")
          // Remove deleted user from userList
          // this.userList = this.userList.filter(user => user._id !== userId);
          this.redirectToDesignatedLink('login')
        } else {
          console.error('Error deleting user:', resultData.message);
        }
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }

  logout() {
    this.http.delete("http://localhost:9992/whoLogged/del").subscribe((resultdata) => {
      console.log(resultdata)
    })
    this.redirectToDesignatedLink("login")
  }

  clearError() {
    this.Error = '';
  }
}