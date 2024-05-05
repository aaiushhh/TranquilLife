import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  quotes = '';
  ngOnInit(): void {
    this.fetchDetails();
  }
  constructor(private http: HttpClient) {

  }
  public fetchDetails() {
    let index = Math.round(Math.random() * 16)
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then( (data) => {
        this.quotes = data[index].text;
      });
  }
}
