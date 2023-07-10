import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RestaurantService } from './2.Services/restaurant.service';
import { ChangeValueService } from './2.Services/change-value.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  subscription!: Subscription;
  admin!: boolean | undefined;
  title = 'AngularApp';
  @ViewChild('header') header: any;

  constructor(public datepipe: DatePipe,
    private resSrv: RestaurantService,
    private CVSrv: ChangeValueService) { }

  async ngOnInit() {
    this.subscription = await this.CVSrv.currentIsAdmin.subscribe((admin) => this.admin = admin);
    if (this.admin == true) {
      this.updateTime();
      setInterval(this.updateTime, 60000);
    }
  }

  convertTimeToNumber(time: string): number {
    let hour: number = parseInt(time.split(' ')[0].split(':')[0]);
    if (time.split(' ')[1] == ('AM' || 'am') && hour == 12)
      hour = 0;
    if (time.split(' ')[1] == ('PM' || 'pm') && hour !== 12)
      hour = hour + 12;
    hour = hour + parseInt(time.split(' ')[0].split(':')[1]) / 60;
    return hour;
  }

  updateTime = () => {
    let currentTime = this.datepipe.transform((new Date), 'h:mm a');
    if (currentTime) {
      let time = this.convertTimeToNumber(currentTime);
      this.resSrv.getRestaurants().subscribe((restaurants) => {
        for (let i = 0; i < restaurants.length; i++) {
          let opentime: any = restaurants[i].opentime;
          let closetime: any = restaurants[i].closetime;
          if (opentime && closetime) {
            opentime = this.convertTimeToNumber(opentime);
            closetime = this.convertTimeToNumber(closetime);
            if (opentime && closetime && opentime > closetime) {
              if ((time >= closetime && time < opentime) && restaurants[i].openned == true)
                this.resSrv.putRestaurant(restaurants[i]._id, { openned: false }).subscribe();
              if ((time < closetime || time >= opentime) && restaurants[i].openned == false)
                this.resSrv.putRestaurant(restaurants[i]._id, { openned: true }).subscribe();
            }
            if (opentime && closetime && opentime < closetime) {
              if ((time >= closetime || time < opentime) && restaurants[i].openned == true)
                this.resSrv.putRestaurant(restaurants[i]._id, { openned: false }).subscribe();
              if ((time < closetime && time >= opentime) && restaurants[i].openned == false)
                this.resSrv.putRestaurant(restaurants[i]._id, { openned: true }).subscribe();
            }
          }
        }
      });
    }
  }

  openDialog() {
    this.header.clickProfilebtn();
  }
}
