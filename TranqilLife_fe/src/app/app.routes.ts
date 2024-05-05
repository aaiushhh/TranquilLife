import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { JournalComponent } from './journal/journal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HabittrackerComponent } from './habittracker/habittracker.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
// import { LoginComponent } from './login/login.component';
export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"login",component:LoginComponent},
    {path:"signup",component:SignupComponent},
    {path:"toDoList",component:TodoListComponent},
    {path:"journal",component:JournalComponent},
    {path:"navbar",component:NavbarComponent},
    {path:"habit",component:HabittrackerComponent},
    {path:"contactUs",component:ContactUsComponent}
];
