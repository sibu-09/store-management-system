package com.example.demo.service;

import com.example.demo.entity.Sale;
import com.example.demo.entity.Customer;
import com.example.demo.repository.SaleRepository;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private CustomerRepository customerRepository; // ✅ add this

    // ✅ Create or update a sale
    public Sale saveSale(Sale sale) {
        sale.setSaleDate(java.time.LocalDate.now());

        // ✅ 1. Save sale as usual
        Sale savedSale = saleRepository.save(sale);

        // ✅ 2. Also save or update the customer record
        if (sale.getCustomerEmail() != null) {
            Optional<Customer> existingCustomer = customerRepository
                    .findAll()
                    .stream()
                    .filter(c -> c.getEmail().equalsIgnoreCase(sale.getCustomerEmail()))
                    .findFirst();

            Customer customer;
            if (existingCustomer.isPresent()) {
                // update existing
                customer = existingCustomer.get();
                customer.setName(sale.getCustomerName());
                customer.setPhone(sale.getCustomerPhone());
                // ✅ added line
            } else {
                // create new
                customer = new Customer();
                customer.setName(sale.getCustomerName());
                customer.setEmail(sale.getCustomerEmail());
                customer.setPhone(sale.getCustomerPhone());
                // ✅ added line
            }
            customerRepository.save(customer);
        }

        return savedSale;
    }

    // ✅ (Keep your other methods unchanged)
    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Optional<Sale> getSaleById(Long id) {
        return saleRepository.findById(id);
    }

    public void deleteSale(Long id) {
        saleRepository.deleteById(id);
    }

    public double getTotalRevenue() {
        List<Sale> sales = saleRepository.findAll();
        return sales.stream().mapToDouble(Sale::getTotalAmount).sum();
    }

    public List<Map<String, Object>> getAllCustomers() {
        List<Sale> sales = saleRepository.findAll();
        Map<String, Map<String, Object>> customerMap = new LinkedHashMap<>();

        for (Sale sale : sales) {
            if (sale.getCustomerEmail() != null) {
                String key = sale.getCustomerEmail();
                if (!customerMap.containsKey(key)) {
                    Map<String, Object> customer = new HashMap<>();
                    customer.put("id", sale.getId());
                    customer.put("name", sale.getCustomerName());
                    customer.put("email", sale.getCustomerEmail());
                    customer.put("phone", sale.getCustomerPhone());
                    // ✅ added line
                    customerMap.put(key, customer);
                }
            }
        }

        return new ArrayList<>(customerMap.values());
    }
    public Sale updateSale(Long id, Sale updatedSale) {
        Sale existingSale = saleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Sale not found with id: " + id));

        existingSale.setCustomerName(updatedSale.getCustomerName());
        existingSale.setProductName(updatedSale.getProductName());
        existingSale.setQuantity(updatedSale.getQuantity());
        existingSale.setTotalAmount(updatedSale.getTotalAmount());
        existingSale.setSaleDate(updatedSale.getSaleDate());

        return saleRepository.save(existingSale);
    }

}
