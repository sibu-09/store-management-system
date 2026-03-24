package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Product;
import com.example.demo.entity.Sale;
import com.example.demo.entity.SaleRequest;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.SaleRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SaleService saleService;
    
    
 
    // Create or update a product
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // Fetch all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Fetch a product by ID
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // Delete a product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    @Transactional
    public void processPurchase(Long productId, SaleRequest saleRequest) {
        // 1. Find Product
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        // 2. Logic: Check if requested quantity is available
        if (product.getQuantity() < saleRequest.getQuantity()) {
            throw new RuntimeException("❌ Insufficient stock! Only " + product.getQuantity() + " left.");
        }

        // 3. Logic: Subtract the stock
        product.setQuantity(product.getQuantity() - saleRequest.getQuantity());
        productRepository.save(product);
        
        productRepository.saveAndFlush(product); 

        // 4. Logic: Create the Sale object to trigger your existing saveSale() logic
        Sale newSale = new Sale();
        newSale.setProductName(product.getName());
        newSale.setQuantity(saleRequest.getQuantity());
        newSale.setTotalAmount(product.getPrice() * saleRequest.getQuantity());
        newSale.setCustomerName(saleRequest.getCustomerName());
        newSale.setPrice(product.getPrice());
        newSale.setCustomerEmail(saleRequest.getCustomerEmail());
        newSale.setCustomerPhone(saleRequest.getCustomerPhone());
        
        // This runs your existing code that updates the Sales and Customer tables
     // In ProductService.java
        newSale.setSaleDate(java.time.LocalDateTime.now()); // Now includes HH:mm:ss
     // Add @Autowired private SaleRepository saleRepository; at the top
        saleService.saveSale(newSale);
    }
}
