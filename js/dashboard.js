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
    
    // Bảng dữ liệu của dashboard không cần xử lý thêm
    // vì đã có dữ liệu cứng trong HTML
});

// Hàm cập nhật ngày giờ
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