package com.testAngular.rest.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private int ordernumber;

    @Column
    private String date;

    @Column
    private int productsordered;

    @Column
    private String status;

    @Column
    private int finalprice;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOrdernumber() {
        return ordernumber;
    }

    public void setOrdernumber(int orderNumber) {
        this.ordernumber = orderNumber;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getProductsordered() {
        return productsordered;
    }

    public void setProductsordered(int productsOrdered) {
        this.productsordered = productsOrdered;
    }

    public int getFinalprice() {
        return finalprice;
    }

    public void setFinalprice(int finalPrice) {
        this.finalprice = finalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
