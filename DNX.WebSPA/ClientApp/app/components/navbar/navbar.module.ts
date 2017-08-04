import { ThemePickerModule } from './../theme-picker/theme-picker';
import {Component, NgModule} from '@angular/core';
import {MdButtonModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavBar {}

@NgModule({
  imports: [MdButtonModule, RouterModule, ThemePickerModule],
  exports: [NavBar],
  declarations: [NavBar],
})
export class NavBarModule {}