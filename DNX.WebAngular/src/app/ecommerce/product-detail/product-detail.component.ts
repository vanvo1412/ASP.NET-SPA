import { SelectAction } from "./../../state/actions/product";
import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../state/reducers";
import * as productActions from "../../state/actions/product";
import { Product } from "app/models/product";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "app/services/product-service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent {
  @Input() productId: number;
  product: Product;
  constructor(private productService: ProductService, private store: Store<fromRoot.State>, route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.productId = +params["id"];
      store.select(fromRoot.getProductsState).subscribe(result => {
        if (result.selectedProductId) {
          this.product = result.entities[result.selectedProductId];
        } else {
          this.productService.getById(this.productId).map(product => product.json()).subscribe(res => {
            this.product = res;
          });
        }
      });
      document.querySelector("[cdk-scrollable]").scrollTop = 0;
    });
  }
  stars: number[] = [1, 2, 3, 4, 5];
  //   product = {
  //   price: (Math.random() * (0.00 - 10.00) + 10.00).toFixed(2),
  //   rating: Math.floor(Math.random() * 6),
  //   status: ['', '', '', 'sale'][Math.floor(Math.random() * 4)],
  //   discounted: ['', '', '', 'discounted'][Math.floor(Math.random() * 4)],
  //   discount: (Math.random() * (0.00 - 10.00) + 10.00).toFixed(2),
  //   name: [
  //       'Blouse',
  //       'Casual Shirt',
  //       'Plaid Shirt',
  //       'Long Sleeve',
  //       'Denim Jacked',
  //       'Fur Coat',
  //       'Crop Top',
  //       'Stripe Tee'][Math.floor(Math.random() * 8)],
  //   description: ['B & W', 'Grey', 'Black', 'Green', 'Black'][Math.floor(Math.random() * 5)]
  // };

  messages: Object[] = [
    {
      from: "Ali Connors",
      message: "I will be in your neighborhood",
      photo: "assets/images/face3.jpg",
      subject: "Brunch this weekend?",
      rating: Math.floor(Math.random() * 6)
    },
    {
      from: "Trevor Hansen",
      message: "Wish I could but we have plans",
      photo: "assets/images/face6.jpg",
      subject: "Brunch this weekend?",
      rating: Math.floor(Math.random() * 6)
    },
    {
      from: "Sandra Adams",
      message: "Do you have Paris recommendations instead?",
      photo: "assets/images/face4.jpg",
      subject: "Brunch this weekend?",
      rating: Math.floor(Math.random() * 6)
    }
  ];
}
