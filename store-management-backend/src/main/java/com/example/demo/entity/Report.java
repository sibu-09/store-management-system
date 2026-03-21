package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reportType;  // e.g., "Sales Report", "Customer Report", "Inventory Report"
    private LocalDateTime generatedDate;
    private String generatedBy; // Admin name or system user

    @Column(length = 500)
    private String summary;     // short description or result summary

    public Report() {}

    public Report(String reportType, LocalDateTime generatedDate, String generatedBy, String summary) {
        this.reportType = reportType;
        this.generatedDate = generatedDate;
        this.generatedBy = generatedBy;
        this.summary = summary;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getReportType() { return reportType; }
    public void setReportType(String reportType) { this.reportType = reportType; }

    public LocalDateTime getGeneratedDate() { return generatedDate; }
    public void setGeneratedDate(LocalDateTime generatedDate) { this.generatedDate = generatedDate; }

    public String getGeneratedBy() { return generatedBy; }
    public void setGeneratedBy(String generatedBy) { this.generatedBy = generatedBy; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

	public String getType() {
		// TODO Auto-generated method stub
		return null;
	}
}
