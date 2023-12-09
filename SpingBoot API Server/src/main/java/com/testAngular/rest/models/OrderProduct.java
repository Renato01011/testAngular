package com.testAngular.rest.models;


import jakarta.persistence.*;

@Entity
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @Column
    private int orderid;

    @Column
    private int productid;
    @Column
    private String name;
    @Column
    private int unit_price;
    @Column
    private int quantity;
    @Column
    private int totalprice;

    public int getOrderid() {
        return orderid;
    }

    public void setOrderid(int order_id) {
        this.orderid = order_id;
    }

    public int getProductid() {
        return productid;
    }

    public void setProductid(int product_id) {
        this.productid = product_id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getTotalprice() {
        return totalprice;
    }

    public void setTotalprice(int totalPrice) {
        this.totalprice = totalPrice;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getUnit_price() {
        return unit_price;
    }

    public void setUnit_price(int unit_price) {
        this.unit_price = unit_price;
    }
}
