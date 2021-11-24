import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category, Product} from "../interfaces";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class CategoryService {
  constructor(
    private http: HttpClient
  ) {}

  create(category: Category): Observable<Category>{
    return this.http.post<Category>(`${environment.fbDbUrl}/categories.json`, category)
      .pipe(map( (res: Category) => {
        return {
          ...category,
          id: res.name,
          date: new Date(category.date)
        }
      }))
  }

  getAll(): Observable<Category[]> {
    return this.http.get(`${environment.fbDbUrl}/categories.json`)
      .pipe(map((response: {[key: string]:any}) => {
        return Object.keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.fbDbUrl}/categories/${id}.json`)
      .pipe(map( (category: Category) => {
        return {
          ...category, id,
          date: new Date(category.date)
        }
      }))
  }

  remove(id:string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/categories/${id}.json`)
  }

  update(category: Category): Observable<Category> {
    return this.http.patch<Category>(`${environment.fbDbUrl}/categories/${category.id}.json`, category)
  }
}
