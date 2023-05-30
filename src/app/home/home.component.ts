import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  i: number = Number(localStorage.getItem('i'));

  ngOnInit(): void {
    if(this.i == 0) { this.i = this.i + 1; localStorage.setItem('i', '1'); console.log('i = ', this.i) }
    else { localStorage.setItem('i', '0'); location.reload(); }
  }

}
