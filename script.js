// Biến lưu trữ dữ liệu sinh viên
let studentData = [
  { id: "SV001", name: "Trần Trọng Hoàng", birthDate: "2003-11-30", major: "Công nghệ thông tin", roomId: "72DCTT11" },
  { id: "SV002", name: "Trần Ngọc Bình", birthDate: "2003-3-20", major: "Công nghệ thông tin", roomId: "72DCTT11" },
  { id: "SV003", name: "Nguyễn Thu Hiền", birthDate: "2005-03-22", major: "Kế toán", roomId: "74DCKT14" },
  { id: "SV004", name: "Lăng Văn Tỉnh", birthDate: "2003-6-12", major: "Công nghệ thông tin", roomId: "72DCTT12" },
  { id: "SV005", name: "Hoàng Quốc Việt", birthDate: "2003-6-12", major: "Công nghệ thông tin", roomId: "72DCTT11" },
];

// Biến lưu trữ dữ liệu loại phòng
let roomTypeData = [
  { id: "101", name: "Phòng Đơn", price: 3000000 },
  { id: "110", name: "Phòng Đôi", price: 2000000 },
  { id: "201", name: "Phòng Bốn", price: 1500000 },
  { id: "102", name: "Phòng Đơn", price: 3000000 }
  
];

// Biến lưu trữ chỉ mục sinh viên và loại phòng đang được sửa
let editingIndex = -1;
let editingRoomTypeIndex = -1;

// Hàm chuyển đổi giữa các màn hình
function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.add('hidden'));
  document.getElementById(screenId + '-screen').classList.remove('hidden');
}

// Hiển thị modal thêm sinh viên
function addStudent() {
  document.getElementById("student-id").value = '';
  document.getElementById("student-name").value = '';
  document.getElementById("student-date").value = '';
  document.getElementById("student-major").value = '';
  document.getElementById("student-room").value = '';
  document.getElementById("add-student-modal").classList.remove("hidden");
  editingIndex = -1;
}

// Đóng modal
function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

// Lưu thông tin sinh viên
function saveStudent() {
  const newId = document.getElementById("student-id").value.trim();
  const newName = document.getElementById("student-name").value.trim();
  const newDate = document.getElementById("student-date").value.trim();
  const newMajor = document.getElementById("student-major").value.trim();
  const newRoomId = document.getElementById("student-room").value.trim();

  // Kiểm tra dữ liệu
  const isRoomValid = roomTypeData.some(room => room.id === newRoomId);
  if (!newId || !newName || !newDate || !newMajor || !newRoomId) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  if (editingIndex === -1) {
    // Thêm sinh viên mới
    if (studentData.some(student => student.id === newId)) {
      alert("Mã sinh viên đã tồn tại. Vui lòng nhập mã khác.");
    } else {
      studentData.push({ id: newId, name: newName, birthDate: newDate, major: newMajor, roomId: newRoomId });
      alert("Thêm sinh viên thành công!");
    }
  } else {
    // Sửa sinh viên
    studentData[editingIndex] = { id: newId, name: newName, birthDate: newDate, major: newMajor, roomId: newRoomId };
    alert("Cập nhật thông tin sinh viên thành công!");
  }
  renderStudents();
  closeModal("add-student-modal");
}
function searchStudent() {
  const query = document.getElementById("search-student").value.toLowerCase();
  renderStudents(query);
}
// Hiển thị danh sách sinh viên
function renderStudents(query = "") {
  const studentList = document.querySelector("#student-screen .data-table tbody");
  studentList.innerHTML = "";

  studentData
  .filter(student => 
    student.id.toLowerCase().includes(query) || 
    student.name.toLowerCase().includes(query) || 
    student.major.toLowerCase().includes(query) ||
    student.roomId.toLowerCase().includes(query)
  )
  .forEach((student, index) => {
    const roomExists = roomTypeData.some(room => room.id === student.roomId);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.birthDate}</td>
      <td>${student.major}</td>
      <td>${student.roomId}</td>
      <td>
        <button class="btn btn-primary" onclick="editStudent(${index})">Sửa</button>
        <button class="btn btn-danger" onclick="deleteStudent(${index})">Xóa</button>
      </td>
    `;
    studentList.appendChild(row);
  });
}

// Sửa thông tin sinh viên
function editStudent(index) {
  const student = studentData[index];
  document.getElementById("student-id").value = student.id;
  document.getElementById("student-name").value = student.name;
  document.getElementById("student-date").value = student.birthDate;
  document.getElementById("student-major").value = student.major;
  document.getElementById("student-room").value = student.roomId;
  document.getElementById("add-student-modal").classList.remove("hidden");
  editingIndex = index;
}

// Xóa sinh viên
function deleteStudent(index) {
  if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
    studentData.splice(index, 1);
    alert("Xóa sinh viên thành công!");
    renderStudents();
  }
}
// Hiển thị modal thêm loại phòng
function addRoomType() {
  document.getElementById("room-type-id").value = '';
  document.getElementById("room-type-name").value = '';
  document.getElementById("room-type-price").value = '';
  document.getElementById("add-room-type-modal").classList.remove("hidden");
  editingRoomTypeIndex = -1;
}

// Lưu thông tin loại phòng
function saveRoomType() {
  const newId = document.getElementById("room-type-id").value.trim();
  const newName = document.getElementById("room-type-name").value.trim();
  const newPrice = parseInt(document.getElementById("room-type-price").value.trim(), 10);

  if (newId && newName && !isNaN(newPrice)) {
    if (editingRoomTypeIndex === -1) {
      // Thêm loại phòng mới
      if (roomTypeData.some(room => room.id === newId)) {
        alert("Mã loại phòng đã tồn tại. Vui lòng nhập mã khác.");
      } else {
        roomTypeData.push({ id: newId, name: newName, price: newPrice });
        alert("Thêm loại phòng thành công!");
      }
    } else {
      // Sửa loại phòng
      roomTypeData[editingRoomTypeIndex] = { id: newId, name: newName, price: newPrice };
      alert("Cập nhật loại phòng thành công!");
    }

    renderRoomTypes();
    renderStudents(); // Cập nhật danh sách sinh viên
    closeModal("add-room-type-modal");
  } else {
    alert("Vui lòng nhập đầy đủ thông tin!");
  }
}
// Tìm kiếm loại phòng
function searchRoomType() {
  const query = document.getElementById("search-room").value.toLowerCase();
  renderRoomTypes(query);
}

// Hiển thị danh sách loại phòng (cập nhật để hỗ trợ tìm kiếm)
function renderRoomTypes(query = "") {
  const roomTypeList = document.querySelector("#room-type-screen .data-table tbody");
  roomTypeList.innerHTML = "";

  roomTypeData
    .filter(room => 
      room.id.toLowerCase().includes(query) || 
      room.name.toLowerCase().includes(query) || 
      room.price.toString().includes(query)
    )
    .forEach((room, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${room.id}</td>
        <td>${room.name}</td>
        <td>${room.price.toLocaleString()} VND</td>
        <td>
          <button class="btn btn-primary" onclick="editRoomType(${index})">Sửa</button>
          <button class="btn btn-danger" onclick="deleteRoomType(${index})">Xóa</button>
        </td>
      `;
      roomTypeList.appendChild(row);
    });
}

// Sửa thông tin loại phòng
function editRoomType(index) {
  const room = roomTypeData[index];
  document.getElementById("room-type-id").value = room.id;
  document.getElementById("room-type-name").value = room.name;
  document.getElementById("room-type-price").value = room.price;
  document.getElementById("add-room-type-modal").classList.remove("hidden");
  editingRoomTypeIndex = index;
}

// Xóa loại phòng
function deleteRoomType(index) {
  const roomId = roomTypeData[index].id;

  if (confirm("Bạn có chắc chắn muốn xóa loại phòng này?")) {
    // Xóa loại phòng
    roomTypeData.splice(index, 1);

    // Xóa sinh viên thuộc phòng bị xóa
    studentData = studentData.filter(student => student.roomId !== roomId);

    alert("Xóa loại phòng thành công!");
    renderRoomTypes();
    renderStudents();
  }
}

// Khởi tạo hiển thị danh sách khi trang tải
window.onload = function () {
  renderRoomTypes();
  renderStudents();
};

