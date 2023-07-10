import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantService } from '../2.Services/restaurant.service';
import { CategoryService } from '../2.Services/category.service';
import { ImgUploadService } from '../2.Services/img-upload.service';

interface Category { name: string , img: string};

@Component({
  selector: 'app-creat-restaurant',
  templateUrl: './creat-restaurant.component.html',
  styleUrls: ['./creat-restaurant.component.css']
})
export class CreatRestaurantComponent implements OnInit {

  @ViewChild('btnSuccess') btnSuccess: any;
  createdRes!: any;
  uploadForm!: FormGroup;
  resSrcImg: string = 'assets/img/user.jpg';
  Categories!: Category[];
  uploadErrMssg!: string;
  success: boolean = false;

  constructor(@Inject('BaseURL') public baseURL: any,
    private resSrv: RestaurantService,
    private catSrv: CategoryService,
    private uploadSrv: ImgUploadService,
    public fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      avatar: [null]
    });
  }

  ngOnInit() {
    this.createdRes = { name: '', img: 'assets/img/user.jpg', type: '', phone: [], location: '', plugins: [], categories: [], openned: false };
    this.catSrv.getCategories().subscribe((categories) => this.Categories = categories);
  }

  addcateg(categ: string) {
    this.createdRes.categories.push(categ);
  }

  delcateg(categ: string) {
    let i = this.createdRes.categories.indexOf(categ);
    this.createdRes.categories.splice(i, 1);
  }

  addplugin(name: string, price: string) {
    this.createdRes.plugins.push(name + ',' + price);
  }
  delplugin(plugin: string) {
    let i = this.createdRes.plugins.indexOf(plugin);
    this.createdRes.plugins.splice(i, 1);
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
    return await new Promise((resolve,reject) => {
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
                this.createdRes.img = `assets/img/restaurants/${event.body.filename}`;
                resolve(true);
            }
          }, err => reject(false));
      } else reject(false);
    })
  }

  async onSubmit() {
    this.success = await this.UploadUserImg();
    if (this.success == true) {
      this.resSrv.postRestaurants(this.createdRes).subscribe(() => {
        this.btnSuccess.nativeElement.click();
      });
    }
  }
  reset() {
    this.createdRes = { name: '', img: '', type: '', phone: [], location: '', plugins: [], categories: [], openned: false };
  }


}
