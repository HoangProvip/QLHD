// Mở modal thêm hợp đồng
function openAddModal() {
  document.getElementById('contract-modal').style.display = 'flex';
}

// Đóng modal
function closeModal() {
  document.getElementById('contract-modal').style.display = 'none';
  console.log('Modal đã được đóng');
}

// Lưu hợp đồng (tạm thời chỉ hiển thị console log)
function saveContract() {
  console.log('Hàm saveContract được gọi');
  const id = document.getElementById('contract-id').value;
  const student = document.getElementById('student-name').value;
  const room = document.getElementById('room').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const rentalFee = document.getElementById('rental-fee').value;

  if (id && student && room && startDate && endDate && rentalFee) {
    console.log('Hợp đồng mới:', { id, student, room, startDate, endDate, rentalFee });
    closeModal();
  } else {
    alert('Vui lòng nhập đầy đủ thông tin!');
  }
}

// Tìm kiếm hợp đồng (đơn giản với console log)
function searchContract() {
  const keyword = document.getElementById('search-input').value;
  console.log('Từ khóa tìm kiếm:', keyword);
}
