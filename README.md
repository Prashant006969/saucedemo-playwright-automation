# SauceDemo Playwright Automation Framework

## Overview
This repository contains automated test scripts for the SauceDemo e-commerce application (https://www.saucedemo.com/) using Playwright with TypeScript.

**Assignment Context:**  
This project was created as part of a QA Tester practical screening assignment to demonstrate:
- Understanding of automation frameworks
- Implementation of code-based automated tests
- Identification of regression-prone flows
- Clear documentation of automation results

---

## Framework Details

**Tool:** Playwright  
**Language:** TypeScript  
**Execution Environment:** Local (Windows)  
**Base Repository:** https://github.com/saucelabs/saucectl-imagerunner-example  
**Application Under Test:** https://www.saucedemo.com/

---

## Test Coverage

This automation suite covers **5 critical end-to-end user flows:**

1. **Valid Login** - Standard user authentication flow
2. **Invalid Login Error Handling** - Negative testing for authentication
3. **Add to Cart & Cart Validation** - Shopping cart functionality
4. **Checkout Happy Path** - Complete order placement flow
5. **Logout** - Session management and logout functionality

**Total Test Cases:** 5  
**Execution Status:** ✅ All 5 Passed

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Prashant006969/saucedemo-playwright-automation.git
   cd saucedemo-playwright-automation
