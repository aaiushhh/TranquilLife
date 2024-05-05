import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habittracker',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './habittracker.component.html',
  styleUrl: './habittracker.component.css'
})
export class HabittrackerComponent {
  habitsToAdd: string[] = [];
  habitsSelected: { name: string, checked: boolean }[] = [];
  isAddingHabits: boolean = true;
  newHabitName: string = '';
  constructor(private http:HttpClient){
  }
  addHabit() {
    if (this.newHabitName.trim() !== '') {
      this.habitsToAdd.push(this.newHabitName);
      this.newHabitName = '';
    }
  }

  startTracking() {
    this.isAddingHabits = false;
    this.habitsSelected = this.habitsToAdd.map(habit => ({ name: habit, checked: false }));
  }

  toggleHabitCheckbox(habit: { name: string, checked: boolean }) {
    habit.checked = !habit.checked;
  }

  saveToDB() {
    this.http.get<any>('http://localhost:9992/whoLogged/fetch').subscribe((resultdata) => {
      if (resultdata.status) {
        const username = resultdata.data[0] ? resultdata.data[0].username : 'default'; // Extract username from the response
  
        const HabitAsString  = this.habitsToAdd.join(', ');
        const payload = { 
          "username": username, 
          "category":"habit",
          "data": HabitAsString 
        };
        console.log(HabitAsString)
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
        const username = 'default'; // Extract username from the response
  
        const HabitAsString  = this.habitsToAdd.join(', ');
        const payload = { 
          "username": username, 
          "category":"habit",
          "data": HabitAsString 
        };
        console.log(HabitAsString)
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
