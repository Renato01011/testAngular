package com.testAngular.rest.controllers;

import com.testAngular.rest.models.*;
import com.testAngular.rest.repositories.OrderProductRepository;
import com.testAngular.rest.repositories.OrderRepository;
import com.testAngular.rest.repositories.ProductsRepository;
import org.hibernate.query.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class OrderController {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderProductRepository orderProductRepo;

    @Autowired
    private ProductsRepository productsRepository;

    @GetMapping("/getAllOrders")
    public List<Orders> getOrders() {
        return orderRepo.findAll();
    }

    @PostMapping("/addNewOrder")
    public String newOrder(@RequestBody CompleteOrder orders) {
        Orders newOrder = new Orders();
        newOrder.setOrdernumber(orders.orderNumber);
        newOrder.setProductsordered(orders.productsOrdered.size());
        newOrder.setDate(orders.date);
        newOrder.setStatus(orders.status);
        newOrder.setFinalprice(orders.finalPrice);
        orderRepo.save(newOrder);
        int orderId = orderRepo.findByordernumber(orders.orderNumber).get(0).getId();
        for (int i = 0; i < orders.productsOrdered.size(); i++) {
            OrderProduct newOrderProduct = new OrderProduct();
            newOrderProduct.setOrderid(orderId);
            newOrderProduct.setProductid(orders.productsOrdered.get(i).getProductid());
            newOrderProduct.setQuantity(orders.productsOrdered.get(i).getQuantity());
            newOrderProduct.setUnit_price(orders.productsOrdered.get(i).getUnit_price());
            newOrderProduct.setTotalprice(orders.productsOrdered.get(i).getTotalprice());
            newOrderProduct.setName(orders.productsOrdered.get(i).getName());
            orderProductRepo.save(newOrderProduct);
        }
        return "Correctly Added";
    }

    @GetMapping("/getOrder/{id}")
    public CompleteOrder getOrder(@PathVariable long id) {
        CompleteOrder toReturnOrder = new CompleteOrder();
        Orders order = orderRepo.findById(id).get();
        toReturnOrder.id = order.getId();
        toReturnOrder.orderNumber = order.getOrdernumber();
        toReturnOrder.date = DateFormat.getTimeInstance(DateFormat.DEFAULT, new Locale("en", "US")).format(new Date());
        toReturnOrder.status = order.getStatus();
        toReturnOrder.finalPrice = order.getFinalprice();
        List<OrderProduct> toSearchProducts = orderProductRepo.findByorderid(order.getId());
        toReturnOrder.productsOrdered = toSearchProducts;
        return toReturnOrder;
    }

    @PutMapping("/updateOrder/{id}")
    public String updateOrder(@PathVariable long id, @RequestBody CompleteOrder order) {
        deleteOrder(id);
        newOrder(order);
        return "Successfully Updated";
    }

    @DeleteMapping("/deleteOrder/{id}")
    public String deleteOrder(@PathVariable long id) {
        Orders toDeleteOrder = orderRepo.findById(id).get();
        List<OrderProduct> toDeleteOrderProducts = orderProductRepo.findByorderid((int) id);
        orderRepo.delete(toDeleteOrder);
        orderProductRepo.deleteAll(toDeleteOrderProducts);
        return "Successfully Deleted";
    }
}
