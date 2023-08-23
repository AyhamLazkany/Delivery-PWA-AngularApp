import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Restaurant } from '../1.Shared/restaurant';
import { Dish } from '../1.Shared/dish';
import { owlJquery } from '../1.Shared/owl-carousel-jquery';
import { RestaurantService } from '../2.Services/restaurant.service';
import { DishService } from '../2.Services/dish.service';
import { CategoryService } from '../2.Services/category.service';
import { ChangeValueService } from '../2.Services/change-value.service';
import { ImgUploadService } from '../2.Services/img-upload.service';
import { HeaderComponent } from '../header/header.component';
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
  dish: Dish = { _id: '', category: '', description: '', img: '', name: '', resId: '', resname: '', rate: 0, plugins: [], price: 0 };
  restaurants!: Restaurant[];
  categories!: any[];
  categErrMssg!: string;
  admin: boolean = false;
  logged: boolean = false;
  @ViewChild('dishDetail') dishDetail: any;

  constructor(@Inject('BaseURL') public baseURL: any,
    private resSrv: RestaurantService,
    private dishSrv: DishService,
    private catSrv: CategoryService,
    private CVSrv: ChangeValueService,
    private imgSrv: ImgUploadService,
    public fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      avatar: [null]
    });
  }

  ngOnInit() {
    this.CVSrv.currentIsAdmin.subscribe((admin) => {
      this.admin = admin;
      this.CVSrv.currentLogged.subscribe((logged) => {
        this.logged = logged;
        this.imgSrv.getImages().subscribe((imgs) => {
          this.sliderImages = imgs;
          this.resSrv.getRestaurants().subscribe((res) => {
            this.restaurants = res;
            this.catSrv.getCategories().subscribe((categories) => {
              this.categories = categories;
              this.dishSrv.getDishes().subscribe((dishes) => {
                this.featuredDishes = dishes;
                owlJquery();
              })
            }, err => this.categErrMssg = err);
          });
        });
      });
    });
  }

  selectDish(dish: Dish) {
    this.dish = { _id: '', category: '', description: '', img: '', name: '', resId: '', resname: '', rate: 0, plugins: [], price: 0 };
    let plugins: string[] = [];
    for (let i = 0; i < dish.plugins.length; i++) {
      if (dish.plugins[i].split(',')[0] == 'خبز') plugins[0] = dish.plugins[i];
      if (dish.plugins[i].split(',')[0] == 'صمون') plugins[1] = dish.plugins[i];
    };
    if (plugins.length > 1) {
      for (let i = 0; i < dish.plugins.length; i++) {
        if (dish.plugins[i].split(',')[0] !== 'خبز' && dish.plugins[i].split(',')[0] !== 'صمون') plugins.push(dish.plugins[i]);
      };
      dish.plugins = plugins;
    }
    this.dish = dish;
    this.dishDetail.ishasBread(dish);
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
    this.imgSrv.deleteImg(img, 'slider').subscribe(() => {
      this.sliderImages.splice(this.sliderImages.indexOf(img), 1);
    });
  }

  deleteCategroy(category: { _id: string, img: string, name: string }) {
    this.imgSrv.deleteImg(category.img.split('/')[category.img.split('/').length - 1], 'categories').subscribe(() => {
      this.catSrv.deleteCategory(category._id).subscribe(() => {
        this.categories.splice(this.categories.findIndex((cat) => cat._id == category._id), 1);
      });
    });
  }
}
