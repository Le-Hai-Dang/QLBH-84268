document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    // Thiết lập username
    const username = localStorage.getItem('username') || 'Admin';
    document.querySelector('.user-info .name').textContent = username;
    
    // Cập nhật thời gian hiện tại
    updateDateTime();
    setInterval(updateDateTime, 60000); // Cập nhật mỗi phút
    
    // Xử lý đăng xuất
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
    
    // Xử lý chuyển trang
    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            if (page === 'dashboard') {
                window.location.href = 'dashboard.html';
            } else {
                window.location.href = page + '.html';
            }
        });
    });
    
    // ===== QUẢN LÝ KHÁCH HÀNG =====
    
    // Khởi tạo các biến toàn cục
    let customers = [
        { id: 'KH001', name: 'Nguyễn Thị Hương', phone: '0912345678', birthday: '1990-08-15', address: '123 Đường ABC, Quận 1, TP.HCM', visits: 5, notes: 'Khách hàng thường xuyên' },
        { id: 'KH002', name: 'Lê Văn Nam', phone: '0987654321', birthday: '1985-04-22', address: '456 Đường XYZ, Quận 2, TP.HCM', visits: 3, notes: 'Thích massage vai gáy' },
        { id: 'KH003', name: 'Trần Minh Anh', phone: '0969696969', birthday: '1992-11-10', address: '789 Đường DEF, Quận 3, TP.HCM', visits: 7, notes: 'Dị ứng với dầu dừa' }
    ];
    
    let customerHistory = {
        'KH001': [
            { date: '10/05/2023', service: 'Massage mặt', staff: 'Trần Mai' },
            { date: '25/04/2023', service: 'Chăm sóc da', staff: 'Hoàng Linh' },
            { date: '05/04/2023', service: 'Massage mặt', staff: 'Trần Mai' }
        ],
        'KH002': [
            { date: '05/05/2023', service: 'Massage vai gáy', staff: 'Nguyễn Hà' },
            { date: '15/04/2023', service: 'Massage toàn thân', staff: 'Phạm Thảo' },
            { date: '20/03/2023', service: 'Massage vai gáy', staff: 'Nguyễn Hà' }
        ],
        'KH003': [
            { date: '08/05/2023', service: 'Chăm sóc da', staff: 'Hoàng Linh' },
            { date: '20/04/2023', service: 'Chăm sóc da', staff: 'Hoàng Linh' },
            { date: '05/04/2023', service: 'Massage toàn thân', staff: 'Phạm Thảo' }
        ]
    };
    
    let isEditing = false;
    let currentCustomerId = null;
    
    // Thêm khách hàng mới
    const addCustomerBtn = document.getElementById('addCustomerBtn');
    const customerModal = document.getElementById('customerModal');
    const customerForm = document.getElementById('customerForm');
    const cancelCustomerBtn = document.getElementById('cancelCustomerBtn');
    
    addCustomerBtn.addEventListener('click', function() {
        openCustomerModal();
    });
    
    // Đóng modal
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            closeModal(this.closest('.modal'));
        });
    });
    
    cancelCustomerBtn.addEventListener('click', function() {
        closeModal(customerModal);
    });
    
    document.querySelector('.close-details-btn').addEventListener('click', function() {
        closeModal(document.getElementById('customerDetailsModal'));
    });
    
    // Xử lý sự kiện submit form khách hàng
    customerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customerName = document.getElementById('customerName').value;
        const customerPhone = document.getElementById('customerPhone').value;
        const customerBirthday = document.getElementById('customerBirthday').value;
        const customerAddress = document.getElementById('customerAddress').value;
        const customerNotes = document.getElementById('customerNotes').value;
        
        if (!customerName || !customerPhone) {
            alert('Vui lòng nhập đầy đủ thông tin bắt buộc!');
            return;
        }
        
        // Tạo ID mới hoặc sử dụng ID hiện tại nếu đang edit
        const customerId = isEditing ? currentCustomerId : 'KH' + (customers.length + 1).toString().padStart(3, '0');
        
        const customerData = {
            id: customerId,
            name: customerName,
            phone: customerPhone,
            birthday: customerBirthday,
            address: customerAddress,
            visits: isEditing ? getCustomerById(currentCustomerId).visits : 0,
            notes: customerNotes
        };
        
        if (isEditing) {
            // Cập nhật khách hàng hiện tại
            updateCustomer(customerData);
        } else {
            // Thêm khách hàng mới
            addCustomer(customerData);
        }
        
        // Đóng modal và reset form
        closeModal(customerModal);
        customerForm.reset();
        isEditing = false;
        currentCustomerId = null;
    });
    
    // Xử lý tìm kiếm khách hàng
    const customerSearch = document.getElementById('customerSearch');
    customerSearch.addEventListener('input', function() {
        const searchValue = this.value.toLowerCase();
        
        const filteredCustomers = customers.filter(customer => 
            customer.name.toLowerCase().includes(searchValue) || 
            customer.phone.includes(searchValue)
        );
        
        renderCustomerTable(filteredCustomers);
    });
    
    // Xử lý các nút thao tác (sửa, xóa, xem)
    document.addEventListener('click', function(e) {
        // Nút sửa
        if (e.target.closest('.edit-btn')) {
            const button = e.target.closest('.edit-btn');
            const customerId = button.getAttribute('data-id');
            editCustomer(customerId);
        }
        
        // Nút xóa
        if (e.target.closest('.delete-btn')) {
            const button = e.target.closest('.delete-btn');
            const customerId = button.getAttribute('data-id');
            deleteCustomer(customerId);
        }
        
        // Nút xem
        if (e.target.closest('.view-btn')) {
            const button = e.target.closest('.view-btn');
            const customerId = button.getAttribute('data-id');
            viewCustomerDetails(customerId);
        }
    });
    
    // Xử lý nút đặt lịch hẹn
    document.querySelector('.add-appointment-btn').addEventListener('click', function() {
        // Trong phiên bản demo có thể chuyển sang trang lịch hẹn
        window.location.href = 'appointments.html';
    });
    
    // Khởi tạo bảng khách hàng
    renderCustomerTable(customers);
    
    // CÁC HÀM HỖ TRỢ
    
    // Cập nhật ngày giờ
    function updateDateTime() {
        const now = new Date();
        
        // Format date
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        
        // Format time
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        
        // Cập nhật vào DOM
        document.getElementById('currentDate').textContent = formattedDate;
        document.getElementById('currentTime').textContent = formattedTime;
    }
    
    // Mở modal thêm/sửa khách hàng
    function openCustomerModal(customer = null) {
        if (customer) {
            // Nếu là sửa khách hàng
            document.getElementById('modalTitle').textContent = 'Sửa thông tin khách hàng';
            document.getElementById('customerName').value = customer.name;
            document.getElementById('customerPhone').value = customer.phone;
            document.getElementById('customerBirthday').value = customer.birthday || '';
            document.getElementById('customerAddress').value = customer.address || '';
            document.getElementById('customerNotes').value = customer.notes || '';
            
            isEditing = true;
            currentCustomerId = customer.id;
        } else {
            // Nếu là thêm khách hàng mới
            document.getElementById('modalTitle').textContent = 'Thêm khách hàng mới';
            customerForm.reset();
            
            isEditing = false;
            currentCustomerId = null;
        }
        
        customerModal.style.display = 'block';
    }
    
    // Đóng modal
    function closeModal(modal) {
        modal.style.display = 'none';
    }
    
    // Lấy thông tin khách hàng theo ID
    function getCustomerById(id) {
        return customers.find(customer => customer.id === id);
    }
    
    // Thêm khách hàng mới
    function addCustomer(customer) {
        customers.push(customer);
        
        // Thêm lịch sử trống
        customerHistory[customer.id] = [];
        
        renderCustomerTable(customers);
    }
    
    // Cập nhật thông tin khách hàng
    function updateCustomer(updatedCustomer) {
        const index = customers.findIndex(c => c.id === updatedCustomer.id);
        if (index !== -1) {
            customers[index] = updatedCustomer;
            renderCustomerTable(customers);
        }
    }
    
    // Xóa khách hàng
    function deleteCustomer(id) {
        if (confirm('Bạn có chắc muốn xóa khách hàng này?')) {
            customers = customers.filter(customer => customer.id !== id);
            delete customerHistory[id];
            renderCustomerTable(customers);
        }
    }
    
    // Sửa khách hàng
    function editCustomer(id) {
        const customer = getCustomerById(id);
        if (customer) {
            openCustomerModal(customer);
        }
    }
    
    // Xem chi tiết khách hàng
    function viewCustomerDetails(id) {
        const customer = getCustomerById(id);
        if (customer) {
            // Hiển thị thông tin khách hàng
            document.getElementById('detailCustomerName').textContent = customer.name;
            document.getElementById('detailCustomerId').textContent = customer.id;
            document.getElementById('detailCustomerPhone').textContent = customer.phone;
            
            // Format lại ngày sinh để hiển thị
            let birthdayDisplay = 'Chưa cập nhật';
            if (customer.birthday) {
                const parts = customer.birthday.split('-');
                birthdayDisplay = `${parts[2]}/${parts[1]}/${parts[0]}`;
            }
            document.getElementById('detailCustomerBirthday').textContent = birthdayDisplay;
            
            document.getElementById('detailCustomerAddress').textContent = customer.address || 'Chưa cập nhật';
            document.getElementById('detailCustomerNotes').textContent = customer.notes || 'Không có ghi chú';
            
            // Hiển thị lịch sử
            const history = customerHistory[id] || [];
            const historyTableBody = document.getElementById('historyTableBody');
            historyTableBody.innerHTML = '';
            
            if (history.length > 0) {
                history.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.date}</td>
                        <td>${item.service}</td>
                        <td>${item.staff}</td>
                    `;
                    historyTableBody.appendChild(row);
                });
            } else {
                // Nếu không có lịch sử
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="3" style="text-align: center;">Khách hàng chưa có lịch sử đến spa</td>
                `;
                historyTableBody.appendChild(row);
            }
            
            // Hiển thị modal
            document.getElementById('customerDetailsModal').style.display = 'block';
        }
    }
    
    // Render bảng khách hàng
    function renderCustomerTable(customerList) {
        const tableBody = document.getElementById('customerTableBody');
        tableBody.innerHTML = '';
        
        if (customerList.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="6" style="text-align: center;">Không có khách hàng nào</td>
            `;
            tableBody.appendChild(row);
            return;
        }
        
        customerList.forEach(customer => {
            // Format ngày sinh để hiển thị
            let birthdayDisplay = '';
            if (customer.birthday) {
                const parts = customer.birthday.split('-');
                birthdayDisplay = `${parts[2]}/${parts[1]}/${parts[0]}`;
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${birthdayDisplay}</td>
                <td>${customer.visits} lần</td>
                <td class="actions">
                    <button class="edit-btn" data-id="${customer.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${customer.id}"><i class="fas fa-trash"></i></button>
                    <button class="view-btn" data-id="${customer.id}"><i class="fas fa-eye"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}); 