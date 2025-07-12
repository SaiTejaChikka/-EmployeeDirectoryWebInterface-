// State management
let employees = [];
let currentPage = 1;
let itemsPerPage = 10;
let sortField = 'firstName';
let sortDirection = 'asc';
let currentFilters = {};

document.addEventListener('DOMContentLoaded', () => {
    employees = initEmployeeData();
    renderEmployeeList();
    setupEventListeners();
});

function renderEmployeeList() {
    const container = document.getElementById('employee-list');
    container.innerHTML = '';

    // Apply filtering, sorting, pagination
    const filtered = filterEmployees(employees, currentFilters);
    const sorted = sortEmployees(filtered, sortField, sortDirection);
    const paginated = paginateEmployees(sorted, currentPage, itemsPerPage);

    paginated.forEach(employee => {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.innerHTML = `
            <h3>${employee.firstName} ${employee.lastName}</h3>
            <p>${employee.email}</p>
            <p>${employee.department} - ${employee.role}</p>
            <div class="actions">
                <button class="edit-btn" data-id="${employee.id}">Edit</button>
                <button class="delete-btn" data-id="${employee.id}">Delete</button>
            </div>
        `;
        container.appendChild(card);
    });

    updatePaginationControls(sorted.length);
}

// CRUD Operations
function addEmployee(employee) {
    const newEmployee = { ...employee, id: Date.now() };
    employees.push(newEmployee);
    saveToLocalStorage();
}

function updateEmployee(updated) {
    employees = employees.map(emp => 
        emp.id === updated.id ? updated : emp
    );
    saveToLocalStorage();
}

function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        employees = employees.filter(emp => emp.id !== id);
        saveToLocalStorage();
        renderEmployeeList();
    }
}

// Form Handling
function showSuccessMessage(message) {
    let msgDiv = document.getElementById('success-message');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'success-message';
        msgDiv.style.position = 'fixed';
        msgDiv.style.top = '80px';
        msgDiv.style.left = '50%';
        msgDiv.style.transform = 'translateX(-50%)';
        msgDiv.style.background = '#22c55e';
        msgDiv.style.color = '#fff';
        msgDiv.style.padding = '12px 32px';
        msgDiv.style.borderRadius = '6px';
        msgDiv.style.fontWeight = 'bold';
        msgDiv.style.zIndex = '2000';
        document.body.appendChild(msgDiv);
    }
    msgDiv.textContent = message;
    msgDiv.style.display = 'block';
    setTimeout(() => {
        msgDiv.style.display = 'none';
    }, 1800);
}

function setupForm(employee = null) {
    const form = document.getElementById('employee-form');
    if (employee) {
        // Pre-fill form for editing
        document.getElementById('employee-id').value = employee.id;
        document.getElementById('first-name').value = employee.firstName;
        document.getElementById('last-name').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
    } else {
        form.reset();
        document.getElementById('employee-id').value = '';
    }
    
    form.onsubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const employeeData = {
                id: document.getElementById('employee-id').value || null,
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                department: document.getElementById('department').value,
                role: document.getElementById('role').value,
            };
            
            if (employeeData.id) {
                employeeData.id = parseInt(employeeData.id);
                updateEmployee(employeeData);
                showSuccessMessage('Employee updated successfully!');
            } else {
                addEmployee(employeeData);
                showSuccessMessage('Employee added successfully!');
            }
            
            closeForm();
            renderEmployeeList();
        }
    };
}

// Filter/Sort/Search
function filterEmployees(employees, filters) {
    return employees.filter(emp => {
        return Object.keys(filters).every(key => 
            emp[key].toLowerCase().includes(filters[key].toLowerCase())
        );
    });
}

function sortEmployees(employees, field, direction) {
    return [...employees].sort((a, b) => {
        const valA = a[field].toLowerCase();
        const valB = b[field].toLowerCase();
        
        if (direction === 'asc') {
            return valA.localeCompare(valB);
        }
        return valB.localeCompare(valA);
    });
}

// Pagination
function paginateEmployees(employees, page, perPage) {
    const start = (page - 1) * perPage;
    return employees.slice(start, start + perPage);
}

function updatePaginationControls(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const currentPageSpan = document.getElementById('current-page');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const itemsPerPageSelect = document.getElementById('items-per-page');

    // Update current page display
    currentPageSpan.textContent = currentPage;

    // Enable/disable prev/next buttons
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;

    // Add event listeners if not already added
    if (!prevBtn._listenerAdded) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderEmployeeList();
            }
        });
        prevBtn._listenerAdded = true;
    }
    if (!nextBtn._listenerAdded) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderEmployeeList();
            }
        });
        nextBtn._listenerAdded = true;
    }
    if (!itemsPerPageSelect._listenerAdded) {
        itemsPerPageSelect.addEventListener('change', (e) => {
            itemsPerPage = parseInt(e.target.value);
            currentPage = 1;
            renderEmployeeList();
        });
        itemsPerPageSelect._listenerAdded = true;
    }
}

// Event Listeners
function setupEventListeners() {
    // Add Employee Button
    document.getElementById('add-employee-btn').addEventListener('click', () => {
        document.getElementById('form-title').textContent = 'Add Employee';
        setupForm();
        document.getElementById('form-modal').classList.remove('hidden');
    });

    // Edit/Delete Delegated Events
    document.getElementById('employee-list').addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        if (e.target.classList.contains('edit-btn')) {
            const employee = employees.find(emp => emp.id === id);
            document.getElementById('form-title').textContent = 'Edit Employee';
            setupForm(employee);
            document.getElementById('form-modal').classList.remove('hidden');
        }
        if (e.target.classList.contains('delete-btn')) {
            deleteEmployee(id);
        }
    });

    // Search
    document.getElementById('search').addEventListener('input', (e) => {
        currentFilters.search = e.target.value;
        renderEmployeeList();
    });

    // Sort
    document.getElementById('sort-by').addEventListener('change', (e) => {
        sortField = e.target.value;
        renderEmployeeList();
    });
    // Sort direction toggle (add a button in UI with id 'sort-direction-btn')
    const sortDirBtn = document.getElementById('sort-direction-btn');
    if (sortDirBtn) {
        sortDirBtn.addEventListener('click', () => {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            sortDirBtn.textContent = sortDirection === 'asc' ? '↑' : '↓';
            renderEmployeeList();
        });
    }

    // Filter by department (add a select in UI with id 'filter-department')
    const filterDept = document.getElementById('filter-department');
    if (filterDept) {
        filterDept.addEventListener('change', (e) => {
            currentFilters.department = e.target.value || '';
            renderEmployeeList();
        });
    }
    // Filter by role (add a select in UI with id 'filter-role')
    const filterRole = document.getElementById('filter-role');
    if (filterRole) {
        filterRole.addEventListener('change', (e) => {
            currentFilters.role = e.target.value || '';
            renderEmployeeList();
        });
    }

    // Pagination (handled in updatePaginationControls)

    // Cancel button in form
    document.getElementById('cancel-btn').addEventListener('click', () => {
        closeForm();
    });
}

// Add closeForm function to hide the modal
function closeForm() {
    document.getElementById('form-modal').classList.add('hidden');
}