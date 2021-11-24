import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../shared/services/product.service";
import {switchMap} from "rxjs/operators";
import {Category, Product} from "../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../shared/services/category.service";
import {Subscription} from "rxjs";
import {minDateControl} from "../shared/my.validators";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass']
})
export class EditPageComponent implements OnInit, OnDestroy {

  id: string | undefined = ''
  form : any
  product: any
  submitted:boolean = false
  products: Product[] = []
  categories: Category[] = []
  pSub: Subscription = new Subscription
  uSub: Subscription = new Subscription
  dSub: Subscription = new Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryServ: CategoryService,
  ) { }

  ngOnInit(): void {
    this.id = this.router.url.split("/")[2]

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.productService.getById(params['id'])
        })
      ).subscribe((product: Product) => {
        this.product = product
        this.form = new FormGroup({
          name: new FormControl(product.name, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
          price: new FormControl(product.price, [Validators.required, Validators.min(0)]),
          category: new FormControl(product.category, [Validators.required]),
          shelfLife: new FormControl(product.shelfLife, [Validators.required, minDateControl()])
        })
    })

    this.pSub = this.categoryServ.getAll().subscribe(categories => {
      this.categories = categories
    })
  }

  remove() {
    if(this.id) {
      this.dSub = this.productService.remove(this.id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== this.id)
      })
    }
  }

  submit() {
    this.submitted = true
    if(this.form.invalid) return

    this.uSub = this.productService.update({
      id: this.product.id,
      name: this.form.value.name,
      price: this.form.value.price,
      category: this.form.value.category,
      shelfLife: this.form.value.shelfLife,
      date: new Date
    }).subscribe(() => {
      this.submitted = false
      this.router.navigate(['/products'])
    })
  }

  ngOnDestroy() {
    if (this.pSub) this.pSub.unsubscribe()
    if (this.uSub) this.uSub.unsubscribe()
  }

}
