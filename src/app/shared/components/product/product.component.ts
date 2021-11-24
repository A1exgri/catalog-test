import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Category, Product} from "../../interfaces";
import {Subscription} from "rxjs";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit, OnDestroy {

  @Input() product: any
  categories: Category[] = [];
  pSub: Subscription = new Subscription;

  constructor(private categoryServ: CategoryService) { }

  ngOnInit(): void {
    this.pSub = this.categoryServ.getAll().subscribe(categories => {
      this.categories = categories

      if (categories.filter(e => e.name === this.product.category).length>0) {
          return this.product.category
        } else {
          return this.product.category = 'Uncategorized'
        }
      })
  }

  ngOnDestroy() {
    if(this.pSub) {
      this.pSub.unsubscribe()
    }
  }

}
