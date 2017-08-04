import { ThemePickerModule } from './../theme-picker/theme-picker';
import {Component, NgModule} from '@angular/core';
import {MdButtonModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './page-layout.html',
  styleUrls: ['./page-layout.scss']
})
export class PageLayoutComponent {}

@NgModule({
  imports: [MdButtonModule, RouterModule, ThemePickerModule],
  exports: [PageLayoutComponent],
  declarations: [PageLayoutComponent],
})
export class PageLayoutModule {}