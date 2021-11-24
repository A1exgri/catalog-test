import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {ProductsPageComponent} from "./products-page/products-page.component";
import {AuthGuard} from "./shared/auth.guard";
import {CategoryComponent} from "./categories/category/category.component";
import {CreateCategoryComponent} from "./categories/create-category/create-category.component";
import {EditCategoryComponent} from "./categories/edit-category/edit-category.component";

const routes: Routes = [
  { path:'', component: MainLayoutComponent, children: [
      { path:'', redirectTo:'/', pathMatch: 'full' },
      { path:'', component: HomePageComponent},
      { path:'products', component: ProductsPageComponent, canActivate: [AuthGuard]},
      { path: 'product/:id', component: ProductPageComponent, canActivate: [AuthGuard] },
      { path: 'product/:id/edit', component: EditPageComponent , canActivate: [AuthGuard] },
      { path: 'create-products', component: CreatePageComponent, canActivate: [AuthGuard] },
      { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'create-category', component: CreateCategoryComponent, canActivate: [AuthGuard] },
      { path: 'category/:id/edit', component: EditCategoryComponent , canActivate: [AuthGuard] },
      { path: 'login', component: LoginPageComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
