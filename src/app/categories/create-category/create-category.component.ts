import { Component, OnInit } from '@angular/core';
import {Category} from "../../shared/interfaces";
import {CategoryService} from "../../shared/services/category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.sass']
})
export class CreateCategoryComponent implements OnInit {

  form: any
  submitted: boolean = false

  constructor(
    private CategoryService: CategoryService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    })
  }

  submit() {
    if(this.form.invalid) return

    this.submitted = true
    const category: Category = {
      name: this.form.value.name,
      date: new Date
    }

    this.CategoryService.create(category).subscribe(() => {
      this.form.reset()
      this.submitted = false
      this.router.navigate(['/categories'])
    })
  }

}
