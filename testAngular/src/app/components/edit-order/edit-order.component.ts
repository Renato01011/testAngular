import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SharedModule } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ProductModel } from '../models/product-model';
import { OrdersService } from '../../services/orderService/orders.service';
import { CompleteOrderModel } from '../models/complete-order-model';
import { ProductsService } from '../../services/productsService/products.service';

@Component({
    selector: 'app-edit-order',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        DialogModule,
        DropdownModule,
        InputNumberModule,
        SharedModule,
        ConfirmDialogModule
    ],
    templateUrl: './edit-order.component.html',
    styleUrl: './edit-order.component.css',
    providers: [ConfirmationService, MessageService]
})
export class EditOrderComponent implements OnInit {
    @Input() id: any = null;
    
    selectedStatus: any;
    statusList: any[] = [];
    idOfOrder: number = -1;
    displayEditProductDialog: boolean = false;
    selectedProduct: any = {};
    insertedAmount: number = 0;
    availableProducts: any[] = [];
    displayProductDialog: boolean = false;
    editProductId: any;
	title: string = "";
    cols: any[] = [];
    products: any[] = [];
    newOrder: any = {};

    orderExists: boolean = false;

    constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService, private orderService: OrdersService, private productsService: ProductsService, private route: ActivatedRoute) {}

    VerifyOrderExists(): boolean {
        this.idOfOrder = Number(this.route.snapshot.paramMap.get("id"));
        if (this.idOfOrder == -1) {
            return false;
        }
        else {
            return true;
        }
    }

    ngOnInit() {
        this.orderExists = this.VerifyOrderExists();
		if (this.orderExists) {
			this.title = "Edit Order";
            this.orderService.getOrderById(this.idOfOrder).subscribe(order => {
                this.newOrder = order;
                this.products = order.productsOrdered
                this.newOrder.productsOrdered = order.productsOrdered.length
                this.selectedStatus = order.status;
            });
		}
		else {
			this.title = "Add Order";
            this.newOrder = {
                id: 0,
                orderNumber: Math.round(Math.random()*1000),
                date: new Date().toLocaleString(),
                productsOrdered: 0,
                finalPrice: 0,
            };
		}
        this.cols = [
            { header: 'ID', field: 'id' },
            { header: 'Name', field: 'name' },
            { header: 'Unit Price', field: 'unitprice' },
            { header: 'Quantity', field: 'quantity' },
            { header: 'Total Price', field: 'totalprice' },
        ];
        this.statusList = [
            { label: 'Pending', field: 'pending' },
            { label: 'InProgress', field: 'inprogress' },
            { label: 'Completed', field: 'completed' }
        ];
        this.productsService.getAllProducts().subscribe(products => {
            this.availableProducts = products;
        });
    }

	showProductDialog() {
		this.displayProductDialog = true;
	}

    closeProductDialog() {
        let totalPrice = this.insertedAmount * this.selectedProduct.unitPrice;
        this.products.push({
            id: this.products.length,
            orderid: 0,
            productid: this.selectedProduct.id,
            name: this.selectedProduct.name,
            unitprice: this.selectedProduct.unitPrice,
            quantity: this.insertedAmount,
            totalprice: totalPrice,
        });
        this.displayProductDialog = false;
        this.selectedProduct = {};
        this.insertedAmount = 0;
        let totalAmount = 0;
        this.products.forEach(product => {
            totalAmount = totalAmount + product.totalprice;
        });
        this.newOrder.finalPrice = totalAmount;
        this.newOrder.productsOrdered = this.newOrder.productsOrdered + 1;
    }

    deleteProduct(product: ProductModel) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => val.id !== product.id);
                let totalAmount = 0;
                this.products.forEach(product => {
                    totalAmount = totalAmount + product.totalprice;
                });
                this.newOrder.finalPrice = totalAmount;
                this.newOrder.productsOrdered = this.newOrder.productsOrdered - 1;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
            }
        });
    }

    submitOrder() {
        let completeOrder: CompleteOrderModel = {
            id: this.newOrder.id,
            orderNumber: this.newOrder.orderNumber,
            date: this.newOrder.date,
            status: this.selectedStatus,
            productsOrdered: [{
                Id: 0,
                orderid: 0,
                productid: 0,
                name: " ",
                unitprice: 0,
                quantity: 0,
                totalprice: 0
            }],
            finalPrice: this.newOrder.finalPrice,
        };
        completeOrder.productsOrdered.splice(0);
        this.products.forEach(product => {
            completeOrder.productsOrdered.push({
                Id: product.id,
                orderid: product.orderid,
                productid: product.productid,
                name: product.name,
                unitprice: product.unitprice,
                quantity: product.quantity,
                totalprice: product.totalprice
            });
        });
        if (this.orderExists) {
            this.orderService.updateOrder(completeOrder).subscribe();
        }
        else {
            this.orderService.addNewOrder(completeOrder).subscribe();
        }
        this.router.navigate(["my-orders"]);
    }
}