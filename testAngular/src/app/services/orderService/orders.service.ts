import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { OrderModel } from '../../components/models/order-model';
import { CompleteOrderModel } from '../../components/models/complete-order-model';

@Injectable({
  	providedIn: 'root',
})

export class OrdersService {
  	
	private url = 'http://localhost:8080';

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json'
		})
	};

	constructor(private httpClient: HttpClient) {}

	getAllOrders(): Observable<OrderModel[]>{
		return this.httpClient.get<OrderModel[]>(this.url + "/getAllOrders");
	};

	addNewOrder(completeorder: CompleteOrderModel): Observable<string> {
		return this.httpClient.post<string>(this.url + "/addNewOrder", JSON.stringify(completeorder), this.httpOptions);
	};

	updateOrder(completeorder: CompleteOrderModel): Observable<string> {
		return this.httpClient.put<string>(this.url + "/updateOrder/" + completeorder.id, JSON.stringify(completeorder), this.httpOptions);
	};

	deleteOrder(id: number): Observable<string> {
		return this.httpClient.delete<string>(this.url + "/deleteOrder/"  + id);
	};

	getOrderById(id: number): Observable<CompleteOrderModel> {
		return this.httpClient.get<CompleteOrderModel>(this.url + "/getOrder/" + id);
	};

}
