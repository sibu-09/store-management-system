package com.example.demo.controller;

import com.example.demo.entity.Sale;
import com.example.demo.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;

    // ✅ Create or update a sale
    @PostMapping
    public Sale saveSale(@RequestBody Sale sale) {
        return saleService.saveSale(sale);
    }

    // ✅ Get all sales
    @GetMapping
    public List<Sale> getAllSales() {
        return saleService.getAllSales();
    }

    // ✅ Get sale by ID
    @GetMapping("/{id}")
    public Optional<Sale> getSaleById(@PathVariable Long id) {
        return saleService.getSaleById(id);
    }

    // ✅ Delete sale by ID
    @DeleteMapping("/{id}")
    public String deleteSale(@PathVariable Long id) {
        saleService.deleteSale(id);
        return "Sale deleted successfully with ID: " + id;
    }

    // ✅ Get total revenue (for reports)
    @GetMapping("/revenue")
    public double getTotalRevenue() {
        return saleService.getTotalRevenue();
    }

    // ✅ Get unique customers (for customer list)
    @GetMapping("/customers")
    public List<Map<String, Object>> getAllCustomers() {
        return saleService.getAllCustomers();
    }
 // ✅ Update sale by ID
    @PutMapping("/{id}")
    public Sale updateSale(@PathVariable Long id, @RequestBody Sale updatedSale) {
        return saleService.updateSale(id, updatedSale);
    }

}
