import { Component, Inject, ViewChild } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../2.Services/category.service';
import { ImgUploadService } from '../2.Services/img-upload.service';

@Component({
  selector: 'app-creat-category',
  templateUrl: './creat-category.component.html',
  styleUrls: ['./creat-category.component.css']
})
export class CreatCategoryComponent {

  restaurant: any = { name: '', img: 'assets/img/user.jpg' };
  @ViewChild('btnSuccess') btnSuccess: any;
  createdCategory: any = { img: 'assets/img/user.jpg', name: '' };
  uploadForm!: FormGroup;
  categorySrcImg: string = 'assets/img/user.jpg';
  uploadErrMssg!: string;
  success: boolean = false;

  constructor(@Inject('BaseURL') public baseURL: any,
  private uploadSrv: ImgUploadService,
  private catSrv: CategoryService,
  public fb: FormBuilder) {
  this.uploadForm = this.fb.group({
    avatar: [null]
  });
}

  selectCategoryImg(event: any): void {
    const file = (event.target as HTMLInputElement | any).files[0];
    this.uploadForm.patchValue({ avatar: file });
    this.uploadForm.get('avatar')?.updateValueAndValidity();
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.categorySrcImg = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  async UploadCategoryImg(): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      if (this.uploadForm.value.avatar !== null) {
        this.uploadSrv.upload(this.uploadForm.value.avatar, 'categories')
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
                this.createdCategory.img = `assets/img/categories/${event.body.filename}`;
                resolve(true);
            }
          }, err => reject(false));
      } else reject(false);
    })
  }

  async onSubmit() {
    this.success = await this.UploadCategoryImg();
    if (this.success == true) {
      this.catSrv.postCategories(this.createdCategory).subscribe(() => {
        this.btnSuccess.nativeElement.click();
      });
    }
  }
}
