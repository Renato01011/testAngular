import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { ProductModel } from '../../components/models/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  	private url = 'http://localhost:8080';

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json'
		})
	};

  	constructor(private httpClient: HttpClient) {}

	getAllProducts(): Observable<ProductModel[]> {
		return this.httpClient.get<ProductModel[]>(this.url + "/getAllProducts");
	}

	addNewProduct(productModel: ProductModel): Observable<String> {
		return this.httpClient.post<String>(this.url + "/addNewProduct", JSON.stringify(productModel), this.httpOptions)
	}

	deleteProduct(id: number): Observable<String> {
		return this.httpClient.delete<String>(this.url + "/deleteProduct/" + id);
	}
}
