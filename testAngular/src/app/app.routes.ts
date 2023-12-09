import { Routes } from '@angular/router';

import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { MyProductsComponent } from './components/my-products/my-products.component';

export const routes: Routes = [
    { path: 'my-orders', component: MyOrdersComponent },
    { path: 'add-order/:id', component: EditOrderComponent },
    { path: 'my-products', component: MyProductsComponent},
];
