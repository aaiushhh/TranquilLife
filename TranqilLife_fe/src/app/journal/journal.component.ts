import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [NgIf,FormsModule,NgFor],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})
export class JournalComponent {
  title="Journal";
  titleJournal=''
  journalData:string=''
  journal=false;
  date=new Date().toISOString().slice(0, 10); //update this by fetching current date
  constructor(private http:HttpClient){}
  
  displayAdd(){
    this.journal=!this.journal;
    
  }
  saveToDB() {
    this.http.get<any>('http://localhost:9992/whoLogged/fetch').subscribe((resultdata) => {
      if (resultdata.status) {
        const username = resultdata.data[0] ? resultdata.data[0].username : 'default'; // Extract username from the response
  

        const payload = { 
          "username": username, 
          "category":"journal",
          "data": this.titleJournal+":"+this.journalData 
        };
        // console.log(HabitAsString)
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
  

        const payload = { 
          "username": username, 
          "category":"journal",
          "data": this.titleJournal+":"+this.journalData 
        };
        // console.log(HabitAsString)
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
