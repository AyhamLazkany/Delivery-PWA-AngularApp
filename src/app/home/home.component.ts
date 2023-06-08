import { Component, OnInit, Inject } from '@angular/core';
import { Restaurant } from '../1.Shared/restaurant';
import { Dish } from '../1.Shared/dish';
import { owlJquery } from '../1.Shared/owl-carousel-jquery';
import { RestaurantService } from '../2.Services/restaurant.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { ImgUploadService } from '../2.Services/img-upload.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  uploadForm!: FormGroup;
  sliderImages!: string[];
  featuredDishes!: Dish[];
  restaurants!: Restaurant[];
  categories!: string[];
  admin: boolean | undefined;
  subscription!: Subscription;

  constructor(@Inject('BaseURL') public baseURL: any,
    private resSrv: RestaurantService,
    private CVSrv: ChangeValueService,
    private imgSrv: ImgUploadService,
    public fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      avatar: [null]
    });
  }

  ngOnInit() {
    this.subscription = this.CVSrv.currentIsAdmin.subscribe((admin) => this.admin = admin);
    this.imgSrv.getImages().subscribe((imgs) => {
      this.sliderImages = imgs
    });
    this.resSrv.getRestaurants().subscribe((res) => {
      this.restaurants = res;
      owlJquery();
    })
  }

  addSliderImg(event: any) {
    const file = (event.target as HTMLInputElement | any).files[0];
    this.uploadForm.patchValue({ avatar: file });
    this.uploadForm.get('avatar')?.updateValueAndValidity();
    if (this.uploadForm.value.avatar !== null) {
      this.imgSrv.upload(this.uploadForm.value.avatar, 'slider')
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.Response:
              console.log('restaurant image successfully uploaded!', event.body);
              this.sliderImages.push(event.body.filename);
          }
        })
    }
  }

  deleteImg(img: string) {
    this.imgSrv.deleteImg(img).subscribe(() => {
      this.sliderImages.splice(this.sliderImages.indexOf(img), 1);
    });
  }

  close(id: string) {
    this.resSrv.putRestaurant(id, { openned: false }).subscribe((res) => {
      const index = this.restaurants.findIndex((rest) => rest._id == id);
      this.restaurants[index].openned = res.openned;
    });
  }
  open(id: string) {
    this.resSrv.putRestaurant(id, { openned: true }).subscribe((res) => {
      const index = this.restaurants.findIndex((rest) => rest._id == id);
      this.restaurants[index].openned = res.openned;
    });
  }



}
