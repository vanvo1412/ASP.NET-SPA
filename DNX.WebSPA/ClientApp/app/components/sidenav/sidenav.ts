import { Component, ViewEncapsulation, ViewChild, OnInit, NgModule, Inject } from '@angular/core';
import { MdSidenav, MdSidenavModule } from '@angular/material';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterModule } from './../footer/footer.module';
import { PageHeaderModule } from './../page-header/page-header';
import { SideNavItems } from './../../../shared/sidenav-items/sidenav-items';
import { PLATFORM_ID } from '@angular/core';

const SMALL_WIDTH_BREAKPOINT = 840;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideNavComponent implements OnInit {
  isBrowser: boolean;

  constructor(public sideNavItems: SideNavItems, private _router: Router, @Inject(PLATFORM_ID) _platformId: string) {
    this.isBrowser = isPlatformBrowser(_platformId);
  }

  @ViewChild(MdSidenav) sidenav: MdSidenav;

  ngOnInit() {
    this._router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    if (this.isBrowser) {
      return window.matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`).matches;
    }
    return false;
  }
}


@NgModule({
  imports: [MdSidenavModule, RouterModule, CommonModule, PageHeaderModule, FooterModule],
  exports: [SideNavComponent],
  declarations: [SideNavComponent],
  providers: [SideNavItems],
})
export class SideNavModule { }
