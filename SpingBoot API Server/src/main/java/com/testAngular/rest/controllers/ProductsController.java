package com.testAngular.rest.controllers;

import com.testAngular.rest.models.OrderProduct;
import com.testAngular.rest.models.Orders;
import com.testAngular.rest.models.Products;
import com.testAngular.rest.repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class ProductsController {

    @Autowired
    private ProductsRepository productRepo;

    @GetMapping("/getAllProducts")
    public List<Products> getProducts() {
        return productRepo.findAll();
    }

    @PostMapping("/addNewProduct")
    public String newProduct(@RequestBody Products product) {
        productRepo.save(product);
        return "Correctly Added";
    }

    @DeleteMapping("/deleteProduct/{id}")
    public String deleteProduct(@PathVariable long id) {
        Products toDeleteProduct = productRepo.findById(id).get();
        productRepo.delete(toDeleteProduct);
        return "Successfully Deleted";
    }

    @PutMapping("/updateProduct/{id}")
    public String updateProduct(@PathVariable long id, @RequestBody Products product) {

        return "Successfully Updated";
    }

}
