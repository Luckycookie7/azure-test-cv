
Cloud Resume Challenge — Azure
📌 Project Summary

Designed and deployed a production-grade serverless web application that showcases real-world cloud engineering, automation, and security practices. This project implements the Cloud Resume Challenge using Microsoft Azure, featuring a live visitor counter backed by a scalable, secure backend.

🏗️ Architecture Overview

Frontend
--Azure Static Web Apps
--HTML, CSS, JavaScript

Backend
--Azure Functions (Node.js)
--HTTP-triggered API for real-time counter updates
--Data Layer
--Azure Cosmos DB
--Persistent storage for visitor metrics
--Automation
GitHub Actions for CI/CD

🔐 Security & Reliability
--Security was built in from day one:
--Secrets stored securely in Azure App Settings (no hard-coded credentials)
--Environment-based configuration for local vs production
--Least-privilege access to cloud resources
--API exposure limited to required endpoints only
--Logging and error handling for operational visibility

🚀 DevOps & Automation
--Automated deployments using GitHub Actions
--Continuous integration for both frontend and backend
--Repeatable, version-controlled infrastructure and app configuration
--Rapid troubleshooting of CORS, routing, and deployment packaging issues

🧠 Skills Demonstrated
--Serverless architecture (Azure Functions)
--Cloud security fundamentals
--REST API integration

CI/CD pipelines

Secrets management

Cloud troubleshooting & production debugging
