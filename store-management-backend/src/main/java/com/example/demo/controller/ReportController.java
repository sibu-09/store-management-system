package com.example.demo.controller;

import com.example.demo.entity.Report;
import com.example.demo.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // ✅ Generate a new report
    @PostMapping
    public Report createReport(@RequestBody Report report) {
        return reportService.createReport(
                report.getType(),
                report.getSummary(),
                report.getGeneratedBy()
        );
    }

    // ✅ Get all reports
    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    // ✅ Get report by ID
    @GetMapping("/{id}")
    public Optional<Report> getReportById(@PathVariable Long id) {
        return reportService.getReportById(id);
    }

    // ✅ Delete a report
    @DeleteMapping("/{id}")
    public String deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
        return "Report deleted successfully with ID: " + id;
    }
}
