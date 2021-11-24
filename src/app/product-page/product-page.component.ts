import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../shared/services/product.service";
import {map, switchMap} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {Category, Product} from "../shared/interfaces";
import {CategoryService} from "../shared/services/category.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.sass']
})
export class ProductPageComponent implements OnInit {

  categories: Category[] = [];
  pSub: Subscription = new Subscription;
  product$: Observable<Product> = this.route.params
    .pipe( switchMap((params: Params) => {
      const productId: string = params['id']
      return this.productService.getById(productId)
        .pipe(
          map((product: Product) => product)
        )
    }))

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit(): void { }

}
