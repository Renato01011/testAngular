export interface CompleteOrderModel {
    id: number,
    orderNumber: number,
    date: string,
    status: string,
    productsOrdered: [
        {
            Id: number;
            orderid: number;
            productid: number;
            name: string;
            unitprice: number;
            quantity: number;
            totalprice: number;
        }
    ],
    finalPrice: number,
}
