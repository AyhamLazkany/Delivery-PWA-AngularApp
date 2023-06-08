import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'AngularApp';
  @ViewChild('header') header: any;

  openDialog() {
    this.header.clickProfilebtn();
  }
}
