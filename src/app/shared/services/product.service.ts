import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../interfaces";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {CategoryService} from "./category.service";

@Injectable({providedIn: 'root'})
export class ProductService {
  constructor(
    private http: HttpClient,
  ) {}

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map( (res: Product) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }))
  }

  getAll(): Observable<Product[]> {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe(map((response: {[key: string]:any}) => {
        return Object.keys(response)
          .map(key => ({
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }))
      }))
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map( (product: Product) => {
        return {
          ...product, id,
          date: new Date(product.date)
        }
      }))
  }

  remove(id:string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/products/${id}.json`)
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${environment.fbDbUrl}/products/${product.id}.json`, product)
  }
}
