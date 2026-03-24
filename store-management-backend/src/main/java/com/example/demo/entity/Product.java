package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Product name must contain only letters and spaces")
    @Column(nullable = false)
    private String name;

    @Min(value = 1, message = "Quantity must be at least 1")
    @Column(nullable = false)
    private int quantity;

    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    @Column(nullable = false)
    private double price;

    public Product() {}

    public Product(String name, double price, int quantity) {
        this.name = name.trim();
        this.price = price;
        this.quantity = quantity;
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = (name != null) ? name.trim() : null; }
    public void setPrice(double price) { this.price = price; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    @Override
    public String toString() {
        return "Product{id=" + id + ", name='" + name + "', price=" + price + ", quantity=" + quantity + "}";
    }
}