package com.testAngular.rest.repositories;

import com.testAngular.rest.models.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {
    List<OrderProduct> findByorderid(int orderid);
}
