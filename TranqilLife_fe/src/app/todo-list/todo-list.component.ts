import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { WhosLoggedInService } from '../whos-logged-in.service';
// import { AdminService } from '../admin.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  // providers:[ad]
  // providers:[WhosLoggedInService]
})
export class TodoListComponent {
  add = true
  title = 'To-Do List';
  taskInput: string = '';
  priority: string = 'Priority';
  username = '';
  constructor(private http: HttpClient) { }
  taskList: { task: string, priority: string, completed: boolean }[] = [];
  // constructor(private adminService: AdminService){
  //   console.log(Boolean(adminService.isAdmin$))
  // }


  addTask(): void {
    if (this.taskInput.trim() == '') {
      this.displayAdd()
    }
    else {
      this.taskList.push({ task: this.taskInput, priority: this.priority, completed: false });
      this.taskInput = '';
      this.sortTasksByPriority();
      this.add = !this.add;
    }
  }

  removeTask(index: number): void {
    this.taskList.splice(index, 1);
    this.sortTasksByPriority();
  }

  markCompleted(index: number): void {
    this.taskList[index].completed = true;
  }


  sortTasksByPriority(): void {
    this.taskList.sort((a: any, b: any) => {
      const priorityOrder: any = { 'High': 1, 'Medium': 2, 'Low': 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  displayAdd() {
    this.add = !this.add;
  }

  saveToDB() {
    this.http.get<any>('http://localhost:9992/whoLogged/fetch').subscribe((resultdata) => {
      if (resultdata.status) {
        const username = resultdata.data[0] ? resultdata.data[0].username : 'default'; // Extract username from the response
  
        const tasksAsString = this.taskList.map(task => task.task).join(', ');
        const payload = { 
          "username": username, 
          "category":"Task",
          "data": tasksAsString 
        };
  
        this.http.post<any>('http://localhost:9992/productivity/addTodoList', payload).subscribe((response) => {
          if (response.status) {
            console.log('Tasks saved to DB successfully');
            // Optionally, clear the task list or perform any other actions
          } else {
            console.error('Error saving tasks to DB:', response.message);
          }
        });
      }
      else{
        const username =  'default'; // Extract username from the response
  
        const tasksAsString = this.taskList.map(task => task.task).join(', ');
        const payload = { 
          "username": username, 
          "category":"Task",
          "data": tasksAsString 
        };
  
        this.http.post<any>('http://localhost:9992/productivity/addTodoList', payload).subscribe((response) => {
          if (response.status) {
            console.log('Tasks saved to DB successfully');
            // Optionally, clear the task list or perform any other actions
          } else {
            console.error('Error saving tasks to DB:', response.message);
          }
        });
      }
    });
  }
  
}
