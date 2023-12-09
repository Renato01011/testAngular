package com.testAngular.rest.repositories;

import com.testAngular.rest.models.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products, Long> {
}
