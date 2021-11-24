import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CategoryService} from "../../shared/services/category.service";
import {switchMap} from "rxjs/operators";
import {Category} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.sass']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  form: any
  submitted: boolean = false
  category: any
  uSub: Subscription = new Subscription

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.categoryService.getById(params['id'])
        })
      ).subscribe((category: Category) => {
      this.category = category
      this.form = new FormGroup({
        name: new FormControl(category.name, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      })
    })
  }

  submit() {
    this.submitted = true
    if(this.form.invalid) return

    this.uSub = this.categoryService.update({
      id: this.category.id,
      name: this.form.value.name,
      date: new Date
    }).subscribe(() => {
      this.submitted = false
      this.router.navigate(['/categories'])
    })
  }

  ngOnDestroy() {
    if (this.uSub) this.uSub.unsubscribe()
  }
}
