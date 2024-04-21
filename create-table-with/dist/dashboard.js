document.addEventListener('DOMContentLoaded', function () {
    const createAccountForm = document.getElementById('createAccountForm');
    const userTableBody = document.getElementById('userTableBody');

    createAccountForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            appendValues();
        } else {
            alert('Please fill all fields!');
        }
    });

    userTableBody.addEventListener('click', function (e) {
        editUser(e);
        if (e.target.classList.contains('delete-btn') || e.target.parentNode.classList.contains('delete-btn')) {
            deleteUser(e);
        }
    });

    function validateForm() {
        const uname = document.getElementById('uname').value.trim();
        const email = document.getElementById('email').value.trim();
        return uname !== '' && email !== '';
    }

    function appendValues() {
        const uname = document.getElementById('uname').value.trim();
        const email = document.getElementById('email').value.trim();
        const role = document.getElementById('role').value;
        const newRow = `
            <tr>
                <td class="border px-4 py-2">${userTableBody.children.length + 1}</td>
                <td class="border px-4 py-2" contenteditable="true">${uname}</td>
                <td class="border px-4 py-2" contenteditable="true">${email}</td>
                <td class="border px-4 py-2" contenteditable="true">${role}</td>
                <td class="border px-4 py-2">
                    <div class="p- m-0 h-10 flex">
                        <button class="text-blue-500 mr-4 edit-btn" style="color: blue;"><i class="fa-solid fa-pen-to-square"></i><span class="sr-only">Edit</span></button>
                        <button class="text-red-500 delete-btn" style="color: red;"><i class="fa-solid fa-trash"></i><span class="sr-only">Delete</span></button>
                    </div>
                </td>
            </tr>
        `;
        userTableBody.insertAdjacentHTML('beforeend', newRow);
        createAccountForm.reset();
    }

    function deleteUser(e) {
        const row = e.target.closest('tr');
        row.remove();
        updateIDs();
    }

    function editUser(e) {
        const editButton = e.target.closest('.edit-btn');
        if (!editButton) return;

        const row = editButton.closest('tr');
        const isEditing = editButton.dataset.editing === 'true';
        
        if (isEditing) {
            const cells = row.querySelectorAll('td');
            const uname = cells[1].textContent.trim();
            const email = cells[2].textContent.trim();
            const role = cells[3].textContent.trim();

            const isValid = uname !== '' && email !== '';
            if (isValid) {
                editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i><span class="sr-only">Edit</span>';
                editButton.dataset.editing = 'false';
            } else {
                alert('Please fill all fields!');
                return;
            }
        } else {
            editButton.innerHTML = '<i class="fa-solid fa-check"></i><span class="sr-only">Save</span>';
            editButton.dataset.editing = 'true';
        }

        const cells = row.querySelectorAll('td:not(:first-child)');
        cells.forEach(cell => {
            cell.contentEditable = !cell.isContentEditable;
        });
    }

    function updateIDs() {
        const rows = userTableBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.querySelector('td:first-child').textContent = index + 1;
        });
    }
});
