import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule,
    FormBuilder,
    FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SharedModule } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ProductsService } from '../../services/productsService/products.service';
import { ProductModel } from '../models/product-model';

@Component({
    selector: 'app-my-products',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        DialogModule,
        InputTextModule,
		InputNumberModule,
		SharedModule,
		FormsModule
    ],
    templateUrl: './my-products.component.html',
    styleUrl: './my-products.component.css',
    providers: [MessageService, ConfirmationService],
})
export class MyProductsComponent implements OnInit {
    products: ProductModel[] = [];
    cols: any[] = [];
	displayNewProductDialog: boolean = false;
	quantity: number = 0;
	name: string = '';

    constructor(private productsService: ProductsService, private confirmationService: ConfirmationService, private messageService: MessageService) {}

    ngOnInit(): void {
        this.cols = [
            { header: 'ID', field: 'id' },
            { header: 'Name', field: 'name' },
            { header: 'Unit Price', field: 'unitPrice' },
        ];
        this.productsService.getAllProducts().subscribe((products) => {
            this.products = products;
        });
    }

    deleteProduct(product: ProductModel) {
		this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => val.id !== product.id);
				this.productsService.deleteProduct(product.id).subscribe();
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
            }
        });
    }

    newProduct() {
		this.quantity = 0;
		this.name = "";
        this.displayNewProductDialog = true;
    }

	closeNewProductDialog() {
		let newProduct: ProductModel = {
			id: 0,
			name: this.name,
			unitPrice: this.quantity
		};
		this.productsService.addNewProduct(newProduct).subscribe();
		window.location.reload();
		this.displayNewProductDialog = false;
	}
}
