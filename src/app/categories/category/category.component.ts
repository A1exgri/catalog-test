import { Component, OnDestroy, OnInit } from '@angular/core';
import {Category} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {CategoryService} from "../../shared/services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  pSub: Subscription = new Subscription;
  dSub: Subscription = new Subscription;

  constructor(
    private categoryServ: CategoryService
  ) { }

  ngOnInit(): void {
    this.pSub = this.categoryServ.getAll().subscribe(categories => {
      this.categories = categories
    })
  }

  remove(id: string | undefined) {
    if(id) {
      this.dSub = this.categoryServ.remove(id).subscribe(() => {
        this.categories = this.categories.filter(post => post.id !== id)
      })
    }
  }

  ngOnDestroy() {
    if(this.pSub) {
      this.pSub.unsubscribe()
    }

    if(this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
