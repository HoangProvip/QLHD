// Mở modal thêm hợp đồng
function openAddModal() {
  document.getElementById('contract-modal').style.display = 'flex';
}

// Đóng modal
function closeModal() {
  document.getElementById('contract-modal').style.display = 'none';
  console.log('Modal đã được đóng');
}

// Lưu hợp đồng
function saveContract() {
  console.log('Hàm saveContract được gọi');
  const id = document.getElementById('contract-id').value;
  const student = document.getElementById('student-name').value;
  const room = document.getElementById('room').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const rentalFee = document.getElementById('rental-fee').value;

  // Kiểm tra thông tin hợp đồng đã được nhập đầy đủ chưa
  if (id && student && room && startDate && endDate && rentalFee) {
    console.log('Hợp đồng mới:', { id, student, room, startDate, endDate, rentalFee });

    // Tạo một hàng mới trong bảng hợp đồng
    const table = document.getElementById('contract-list');
    const row = table.insertRow();

    // Thêm các ô dữ liệu vào hàng
    row.insertCell(0).textContent = id;
    row.insertCell(1).textContent = student;
    row.insertCell(2).textContent = room;
    row.insertCell(3).textContent = startDate;
    row.insertCell(4).textContent = endDate;
    row.insertCell(5).textContent = rentalFee;

    // Thêm các nút hành động (Sửa/Xóa) vào ô cuối cùng
    const actionCell = row.insertCell(6);
    actionCell.innerHTML = `<button class="btn btn-primary" onclick="editContract(this)">Sửa</button>
                            <button class="btn btn-danger" onclick="deleteContract(this)">Xóa</button>`;

    // Đóng modal sau khi lưu hợp đồng
    closeModal();
  } else {
    alert('Vui lòng nhập đầy đủ thông tin!');
  }
}

// Tìm kiếm hợp đồng
function searchContract() {
  const keyword = document.getElementById('search-input').value;
  console.log('Từ khóa tìm kiếm:', keyword);
}

// Chỉnh sửa hợp đồng
function editContract(button) {
  const row = button.closest('tr');
  const cells = row.getElementsByTagName('td');
  // Hiển thị dữ liệu của hợp đồng để chỉnh sửa
  document.getElementById('contract-id').value = cells[0].textContent;
  document.getElementById('student-name').value = cells[1].textContent;
  document.getElementById('room').value = cells[2].textContent;
  document.getElementById('start-date').value = cells[3].textContent;
  document.getElementById('end-date').value = cells[4].textContent;
  document.getElementById('rental-fee').value = cells[5].textContent;

  // Thay đổi tiêu đề modal
  document.getElementById('modal-title').textContent = 'Sửa Hợp đồng';

  // Mở modal để chỉnh sửa
  openAddModal();
}

// Xóa hợp đồng
function deleteContract(button) {
  const row = button.closest('tr');
  row.remove();
  console.log('Hợp đồng đã bị xóa');
}
