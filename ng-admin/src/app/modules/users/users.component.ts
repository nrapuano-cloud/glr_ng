import { Component } from '@angular/core';
import { UserService } from './../../core/services/user.service';
import { SHARED_IMPORTS } from '../../shared/shared-imports';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SHARED_IMPORTS],
  template: `
    <h2>Users</h2>

    <div *ngFor="let user of users">
      {{user.username}}
    </div>
  `
})
export class UsersComponent {

  users:any[] = [];

  constructor(private userService:UserService){}

  ngOnInit(){

    this.userService.getUsers().subscribe((data:any)=>{
      this.users = data;
    });

  }

}