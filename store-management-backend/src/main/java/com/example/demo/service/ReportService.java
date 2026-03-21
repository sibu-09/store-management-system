package com.example.demo.service;

import com.example.demo.entity.Report;
import com.example.demo.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    // Generate and save a new report
    public Report createReport(String type, String summary, String generatedBy) {
        Report report = new Report(type, LocalDateTime.now(), generatedBy, summary);
        return reportRepository.save(report);
    }

    // Get all reports
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    // Get report by ID
    public Optional<Report> getReportById(Long id) {
        return reportRepository.findById(id);
    }

    // Delete a report
    public void deleteReport(Long id) {
        reportRepository.deleteById(id);
    }
}
