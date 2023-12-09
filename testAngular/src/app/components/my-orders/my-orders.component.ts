import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { OrderModel } from '../models/order-model';
import { OrdersService } from '../../services/orderService/orders.service';

@Component({
    selector: 'app-my-orders',
    standalone: true,
    imports: [ConfirmDialogModule, CommonModule, TableModule, ButtonModule, RouterModule],
    templateUrl: './my-orders.component.html',
    styleUrl: './my-orders.component.css',
    providers: [MessageService, ConfirmationService]
})
export class MyOrdersComponent implements OnInit {
    
	cols: any[] = [];
    orders: OrderModel[] = [];

    constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService, private orderService: OrdersService) {}

    ngOnInit(): void {
        this.cols = [
            { header: 'ID', field: 'id', },
            { header: 'Order #', field: 'ordernumber', },
            { header: 'Date', field: 'date', },
            { header: '# Products', field: 'productsordered', },
            { header: 'Final Price', field: 'finalprice', },
            { header: 'Status', field: 'status' }
        ];
        this.orderService.getAllOrders().subscribe(orders => {
            this.orders = orders;
        });
    }

    deleteOrder(order: OrderModel) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this order?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                console.log("im here");
                this.orders = this.orders.filter(val => val.id !== order.id);
                this.orderService.deleteOrder(order.id).subscribe(message => {});
            }
        });
    }

	redirectEditOrder(order: OrderModel) {
		this.router.navigate(["add-order/" + order.id]);
	}

    redirectNewOrder() {
		this.router.navigate(["add-order/-1"]);
	}
}
