import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ConstableService } from '../constable.service';
import { UserModel } from '../user-model'
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  userHeading: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  totalRecords: any;
  pageSize = 1;
  restaurentList: any = [];
  restaurentDetails: any = [];
  public currentPage = 0;
  public totalSize = 0;
  public dataSource: any;
  public dataList: any;
  public gridDate: any;
  userModelObj: UserModel = new UserModel();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  userList: any = [];
  userDetails: any = [];
  userAllDetails: any = [];
  images: any = '';
  constructor(private service: ConstableService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', [Validators.required]],
      image: ['', Validators.required],
    });
    this.getUserDetails();
  }
  postUserDetails() {
    this.userModelObj.fullName = this.userForm.value.fullName;
    this.userModelObj.email = this.userForm.value.email;
    this.userModelObj.mobileNo = this.userForm.value.mobileNo;
    this.userModelObj.address = this.userForm.value.address;
    this.userModelObj.image = this.userForm.value.image;

    this.service.postUsersDetails(this.userModelObj).subscribe(result => {
      this.getUserDetails();
      alert("User Record Added Successfully!");
      this.userForm.reset();
    }, (err) => {
      alert("Something Wrong in Saving User Details");
    });
  }
  getUserDetails() {
    this.service.getAllUserDetails().subscribe(result => {
      this.userList = result;
      this.totalRecords = this.userList.length;
      this.userDetails = this.userList['results'];
      this.totalSize = this.userDetails.length;
      this.userAllDetails = this.userList.results;
      this.dataSource = new MatTableDataSource<Element>(this.userAllDetails);
      this.dataList = this.dataSource['filteredData']
      this.dataSource.paginator = this.paginator;
      this.userAllDetails = this.userDetails;
      this.totalSize = this.totalSize;
      this.iterator();
    });
  }
  updateUserDetails() {
    this.userModelObj.fullName = this.userForm.value.fullName;
    this.userModelObj.email = this.userForm.value.email;
    this.userModelObj.mobileNo = this.userForm.value.mobileNo;
    this.userModelObj.address = this.userForm.value.address;
    this.userModelObj.image = this.userForm.value.image;

    this.service.updateUserDetails(this.userModelObj, this.userModelObj.id).subscribe(result => {
      alert("User Record Updated Successfully!!");
      this.userForm.reset();
      this.getUserDetails();
    })
  }
  editUserDetails(data: any) {
    this.userModelObj.id = data._id;
    this.showAdd = false;
    this.showUpdate = true;
    this.userForm.controls['fullName'].setValue(data.fullName);
    this.userForm.controls['email'].setValue(data.email);
    this.userForm.controls['mobileNo'].setValue(data.mobileNo);
    this.userForm.controls['address'].setValue(data.address);
    this.userForm.controls['image'].setValue(data.image);
  }
  deleteUserDetails(data: any) {
    const id = data._id;
    this.service.deleteUserDetails(id).subscribe(result => {
      window.confirm("Do You Want To Delete User Record ?");
      this.getUserDetails();
    });
  }

  get f() {
    return this.userForm.controls;
  }
  clickAddNewUser() {
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  allowedOnlyNo(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  allowOnlyAlphabets(event: any) {
    const pattern = /[a-zA-Z\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  validateEmail(email: any) {
    const emailPattern = /^[A-Za-z._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    return emailPattern.test(String(email).toLowerCase());
  }
  allowNumbersAndAlphabets(event: any) {
    const pattern = /[a-z A-Z 0-9 \&\$\@\#\%\* ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.dataList.slice(start, end);
    console.log('part ==>' + part);
    this.gridDate = part
    console.log('this.gridDate ==>' + this.gridDate);
    this.dataSource = part;
    console.log('this.dataSource ==>' + this.dataSource);
  }
  resetUserForm() {
    this.userForm.reset();
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file
    }
  }
  upLoadImage() {
    const formData = new FormData();
    formData.append('file', this.images);
    this.http.post<any>('http://localhost:8000/file', formData).subscribe(res => {
      console.log(res);
    })
  }
}
