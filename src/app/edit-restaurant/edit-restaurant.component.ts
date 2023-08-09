import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantService } from '../2.Services/restaurant.service';
import { CategoryService } from '../2.Services/category.service';
import { ImgUploadService } from '../2.Services/img-upload.service';
import { Restaurant } from '../1.Shared/restaurant';
import { ActivatedRoute } from '@angular/router';

interface Category { name: string, img: string };

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {

  @ViewChild('btnSuccess') btnSuccess: any;
  restaurant: Restaurant = { _id: '', name: '', img: '', phone: [], location: '', type: '', categories: [], plugins: [], openned: false, closetime: '', opentime: '' };
  uploadForm!: FormGroup;
  resSrcImg: string = '';
  Categories!: Category[];
  uploadErrMssg!: string;
  success: boolean = false;

  constructor(@Inject('BaseURL') public baseURL: any,
    private route: ActivatedRoute,
    private resSrv: RestaurantService,
    private catSrv: CategoryService,
    private uploadSrv: ImgUploadService,
    public fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      avatar: [null]
    });
  }

  async ngOnInit() {
    this.route.params.subscribe((param) => {
      this.resSrv.getRestaurant(param['id']).subscribe((res) => {
        this.restaurant = res;
        this.resSrcImg = this.baseURL + res.img;
      });
    });
    this.catSrv.getCategories().subscribe((categories) => this.Categories = categories);
  }

  addcateg(categ: string) {
    this.restaurant.categories.push(categ);
  }

  delcateg(categ: string) {
    let i = this.restaurant.categories.indexOf(categ);
    this.restaurant.categories.splice(i, 1);
  }

  addplugin(name: string, price: string) {
    this.restaurant.plugins.push(name + ',' + price);
  }

  delplugin(plugin: string) {
    let i = this.restaurant.plugins.indexOf(plugin);
    this.restaurant.plugins.splice(i, 1);
  }

  selectStoreImg(event: any): void {
    const file = (event.target as HTMLInputElement | any).files[0];
    this.uploadForm.patchValue({ avatar: file });
    this.uploadForm.get('avatar')?.updateValueAndValidity();
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.resSrcImg = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  async UploadUserImg(): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      if (this.uploadForm.value.avatar !== null) {
        this.uploadSrv.upload(this.uploadForm.value.avatar, 'restaurants')
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
                this.restaurant.img = `assets/img/dishes/${event.body.filename}`;
                resolve(true);
            }
          }, err => reject(false));
      } else reject(false);
    })
  }

  async onSubmit() {
    if (this.resSrcImg !== this.baseURL + this.restaurant.img) this.success = await this.UploadUserImg();
    else this.success = true;
    if (this.success == true) {
      this.resSrv.putRestaurant(this.restaurant._id, this.restaurant).subscribe(() => {
        this.btnSuccess.nativeElement.click();
      });
    }
  }
  reset() {
    this.resSrv.getRestaurant(this.restaurant._id).subscribe((res) => {
      this.restaurant = res;
      this.resSrcImg = this.baseURL + res.img;
    });
  }


}
