import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DishService } from '../2.Services/dish.service';
import { Restaurant } from '../1.Shared/restaurant';
import { RestaurantService } from '../2.Services/restaurant.service';
import { ImgUploadService } from '../2.Services/img-upload.service';

@Component({
  selector: 'app-creat-dish',
  templateUrl: './creat-dish.component.html',
  styleUrls: ['./creat-dish.component.css']
})
export class CreatDishComponent implements OnInit {

  restaurant: Restaurant = { _id: '', name: '', img: 'assets/img/user.jpg', type: '', phone: [0, 0], location: '', plugins: [], categories: [], openned: false, opentime: '', closetime: '' };
  @ViewChild('btnSuccess') btnSuccess: any;
  createdDish: any = { img: 'assets/img/user.jpg', name: '', resname: '', resId: '', category: '', plugins: [], description: '' };
  uploadForm!: FormGroup;
  dishSrcImg: string = 'assets/img/user.jpg';
  uploadErrMssg!: string;
  success: boolean = false;

  constructor(@Inject('BaseURL') public baseURL: any,
    private route: ActivatedRoute,
    private resSrv: RestaurantService,
    private dishSrv: DishService,
    private uploadSrv: ImgUploadService,
    public fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      avatar: [null]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.resSrv.getRestaurant(param['id']).subscribe((res) => {
        this.restaurant = res;
        this.createdDish.category = this.restaurant.categories[0];
      });
    });
  }

  addplugin(plugin: string) {
    this.createdDish.plugins.push(plugin);
  }

  deleteplugin(plugin: string) {
    let i = this.createdDish.plugins.indexOf(plugin);
    this.createdDish.plugins.splice(i, 1);
  }

  selectDishImg(event: any): void {
    const file = (event.target as HTMLInputElement | any).files[0];
    this.uploadForm.patchValue({ avatar: file });
    this.uploadForm.get('avatar')?.updateValueAndValidity();
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.dishSrcImg = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  async UploadDishImg(): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      if (this.uploadForm.value.avatar !== null) {
        this.uploadSrv.upload(this.uploadForm.value.avatar, 'dishes')
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
                this.createdDish.img = `assets/img/dishes/${event.body.filename}`;
                resolve(true);
            }
          }, err => reject(false));
      } else reject(false);
    })
  }

  async onSubmit() {
    this.success = await this.UploadDishImg();
    this.createdDish.resname = this.restaurant.name;
    this.createdDish.resId = this.restaurant._id;
    if (this.createdDish.category == '')
      this.createdDish.category = this.restaurant.categories[0];
    if (this.success == true) {
      this.dishSrv.postDishes(this.createdDish).subscribe(() => {
        this.btnSuccess.nativeElement.click();
      });
    }
  }
  reset() {
    this.createdDish = { img: 'assets/img/user.jpg', name: '', resname: '', resId: '', category: '', plugins: [], description: '' };
  }


}
