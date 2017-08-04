import {Injectable} from '@angular/core';

/**
 * Service responsible for setting the title that appears above the components and guide pages.
 */
@Injectable()
export class NavBarConfig {
  _isHidden = true;

  get isHidden(): boolean { return this._isHidden; }
  set isHidden(isHidden: boolean) { this._isHidden = isHidden; }
}
