import {Component, EventEmitter, NgModule, Output} from '@angular/core';
import 'rxjs/add/operator/first';
import { ComponentPageTitle } from './../../../shared/page-title/page-title';
import {MdButtonModule, MdIconModule} from '@angular/material';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.html',
  styleUrls: ['./page-header.scss']
})
export class PageHeaderComponent {
  constructor(public _componentPageTitle: ComponentPageTitle) { }

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
}

@NgModule({
  imports: [MdButtonModule, MdIconModule],
  exports: [PageHeaderComponent],
  declarations: [PageHeaderComponent],
  providers: [ComponentPageTitle],
})
export class PageHeaderModule { }
