import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DishService } from '../2.Services/dish.service';
import { Restaurant } from '../1.Shared/restaurant';
import { RestaurantService } from '../2.Services/restaurant.service';
import { ImgUploadService } from '../2.Services/img-upload.service';
import { Dish } from '../1.Shared/dish';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {

  restaurant: Restaurant = { _id: '', name: '', img: '', type: '', phone: [], location: '', plugins: [], categories: [], openned: false, opentime: '', closetime: '' };
  @ViewChild('btnSuccess') btnSuccess: any;
  dish: Dish = { _id: '', img: '', name: '', resname: '', resId: '', category: '', plugins: [], description: '', price: 0, rate: 0 };
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
      this.dishSrv.getDish(param['id']).subscribe((dish) => {
        this.dish = dish;
        this.dishSrcImg = this.baseURL + dish.img;
        this.resSrv.getRestaurant(dish.resId).subscribe((res) => {
          this.restaurant = res;
        });
      });
    });
  }

  addplugin(plugin: string) {
    this.dish.plugins.push(plugin);
  }

  deleteplugin(plugin: string) {
    let i = this.dish.plugins.indexOf(plugin);
    this.dish.plugins.splice(i, 1);
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
                this.uploadSrv.deleteImg(this.dish.img.split('/')[this.dish.img.split('/').length -1], 'dishes').subscribe(() => {
                  this.dish.img = `assets/img/dishes/${event.body.filename}`;
                  resolve(true);
                });
            }
          }, err => reject(false));
      } else reject(false);
    })
  }

  async onSubmit() {
    if (this.dishSrcImg !== this.baseURL + this.dish.img) this.success = await this.UploadDishImg();
    else this.success = true;
    if (this.dish.category == '')
      this.dish.category = this.restaurant.categories[0];
    if (this.success == true) {
      this.dishSrv.putDish(this.dish._id, this.dish).subscribe(() => {
        this.btnSuccess.nativeElement.click();
      });
    }
  }
  reset() {

  }


}
