package com.testAngular.rest.models;

import java.util.Date;
import java.util.List;

public class CompleteOrder {
    public int id;

    public int orderNumber;

    public String date;

    public String status;

    public List<OrderProduct> productsOrdered;

    public int finalPrice;
}
