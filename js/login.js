document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Xử lý đăng nhập
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Kiểm tra demo đơn giản (trong thực tế sẽ kiểm tra qua API)
        if (username === 'admin' && password === 'admin123') {
            // Lưu trạng thái đăng nhập vào localStorage
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);
            
            // Chuyển hướng đến trang dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    });
    
    // Kiểm tra nếu đã đăng nhập thì chuyển hướng tới dashboard
    if (localStorage.getItem('loggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }
}); 