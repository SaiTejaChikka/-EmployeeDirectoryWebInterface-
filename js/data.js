// Simulating Freemarker data injection
const mockEmployees = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', department: 'HR', role: 'Manager' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', department: 'IT', role: 'Developer' },
    // ... 8 more records
];

// Initialize local storage with mock data if empty
function initEmployeeData() {
    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify(mockEmployees));
    }
    return JSON.parse(localStorage.getItem('employees'));
}