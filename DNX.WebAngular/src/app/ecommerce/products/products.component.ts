import { SelectAction } from "./../../state/actions/product";
import { Router } from "@angular/router";
import { ProductService } from "./../../services/product-service";
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../state/reducers";
import * as productActions from "../../state/actions/product";
import { Product } from "app/models/product";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/switchMap";
import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent {
  products: Product[] = [];
  subject: Subject<any> = new Subject();

  constructor(
    private productService: ProductService,
    private store: Store<fromRoot.State>,
    private router: Router
  ) {
    this.subject
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(take => this.loadProducts(take))
      .subscribe(result => {
        this.products = result;
        this.store.dispatch(new productActions.LoadAction(this.products));
      });
    store.select(fromRoot.getProductsCollection).subscribe(result => {
      if (result.length <= 0) {
        this.subject.next(10);
      } else {
        this.products = result;
      }
    });
  }

  redirect(productId: number) {
    this.store.dispatch(new productActions.SelectAction(productId));
    this.router.navigate(["/detail", productId]);
  }
  reloadProducts(event) {
    this.subject.next(event.value);
  }

  loadProducts(take) {
    return this.productService.getAll(take).map(result => result.json());
  }
  // num = 1;

  // constructor() {
  //   for (this.num; this.num <= 20; this.num += 1) {
  //    this.addProducts(this.num);
  //   }
  // }

  // addProducts(i) {
  //   this.products.push({
  //     id: i,
  //     price: (Math.random() * (0.00 - 10.00) + 10.00).toFixed(2),
  //     status: ['', '', '', 'sale'][Math.floor(Math.random() * 4)],
  //     discounted: ['', '', '', 'discounted'][Math.floor(Math.random() * 4)],
  //     discount: (Math.random() * (0.00 - 10.00) + 10.00).toFixed(2),
  //     name: [
  //       'Blouse',
  //       'Casual Shirt',
  //       'Plaid Shirt',
  //       'Long Sleeve',
  //       'Denim Jacked',
  //       'Fur Coat',
  //       'Crop Top',
  //       'Stripe Tee'][Math.floor(Math.random() * 8)],
  //     description: ['B & W', 'Grey', 'Black', 'Green', 'Black'][Math.floor(Math.random() * 5)]
  //   });
  // }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
      navigator.platform.toUpperCase().indexOf("IPAD") >= 0
    ) {
      bool = true;
    }
    return bool;
  }
}
