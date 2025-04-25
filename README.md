
# 🏥 Health Point

**Health Point** is a React-based doctor listing web application that enables users to search, filter, and sort doctors based on multiple criteria — all handled completely on the client side after a single API call.

---

## 🚀 Features

- 🔍 **Autocomplete Search**
  - Top 3 real-time suggestions while typing doctor names
  - Filters the list on selection or pressing Enter

- 🧪 **Dynamic Filters**
  - **Consultation Type**: Single-select radio buttons (Video Consult / In Clinic)
  - **Specialties**: Multi-select checkboxes
  - All filters can be combined for precise results

- ↕️ **Sorting Options**
  - Sort by **Fees** (ascending)
  - Sort by **Experience** (descending)
  - First-applied sort takes precedence

- 🌐 **URL Query Parameters**
  - Filters, sort, and search reflected in the URL
  - Browser navigation (Back/Forward) retains filters and sort state

- 🧪 **Test-Ready**
  - Implements required `data-testid` attributes for easy test automation

---

## 📦 Tech Stack

- **Frontend**: React, JavaScript (ES6+)
- **Styling**: CSS / Tailwind / Styled Components (based on your choice)
- **API**: [SRM Campus API Mock](https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json)
- **Routing & Query Params**: React Router (v6+), URLSearchParams

---

## 🧰 Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/health-point.git
   cd health-point
