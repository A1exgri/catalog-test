import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category, Product} from "../shared/interfaces";
import {ProductService} from "../shared/services/product.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {CategoryService} from "../shared/services/category.service";
import {minDateControl} from "../shared/my.validators";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.sass']
})
export class CreatePageComponent implements OnInit, OnDestroy {

  form: any
  submitted: boolean = false
  categories: Category[] = []
  pSub: Subscription = new Subscription

  constructor(
    private productService: ProductService,
    private categoryServ: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      category: new FormControl(null, [Validators.required]),
      shelfLife: new FormControl(null, [Validators.required, minDateControl()])
    })

    this.pSub = this.categoryServ.getAll().subscribe(categories => {
      this.categories = categories
    })
  }

  submit() {
    if(this.form.invalid) return

    this.submitted = true
    const product: Product = {
      name: this.form.value.name,
      price: this.form.value.price,
      category: this.form.value.category,
      shelfLife: this.form.value.shelfLife,
      date: new Date
    }

    this.productService.create(product).subscribe(() => {
      this.form.reset()
      this.submitted = false
      this.router.navigate(['/products'])
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }
}
