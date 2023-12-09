import { Component, OnInit } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Orders',
		routerLink: ['my-orders']
      },
      {
        label: 'Products',
		routerLink: ['my-products']
      },
    ];
  }
}
