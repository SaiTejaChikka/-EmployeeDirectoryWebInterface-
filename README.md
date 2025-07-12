
 # Employee Directory Web Interface

A modern, responsive web application for managing employee records. Built with vanilla HTML, CSS, and JavaScript.

## Features
- Add, edit, and delete employees
- Search, sort, and filter employees by name, department, and role
- Pagination and items-per-page selection
- Responsive, modern UI/UX with modal forms
- Data persistence using browser localStorage
- Form validation for required fields and email format

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/SaiTejaChikka/-EmployeeDirectoryWebInterface-.git
   cd -EmployeeDirectoryWebInterface-
   ```
2. **Open `index.html` in your browser.**
   - No build tools or server required; works as a static site.

## Project Structure
```
assigment/
  css/
    style.css         # Main stylesheet
  js/
    app.js            # Main app logic
    data.js           # Initial/mock data and localStorage logic
    utils.js          # Form validation and helpers
  index.html          # Main HTML file
  README.md           # Project documentation
```

## Usage
- Click **+ Add Employee** to open the form modal.
- Fill in all required fields and click **Save** to add a new employee.
- Use the search bar, sort dropdown, and filter dropdowns to find employees.
- Edit or delete employees using the buttons on each card.
- Pagination controls allow you to browse through the employee list.

## Customization
- Add more departments or roles by editing the dropdowns in `index.html`.
- Style and layout can be customized in `css/style.css`.

## License
This project is open source and available under the [MIT License](LICENSE).

