document.addEventListener('DOMContentLoaded', () => {

const userTableBody = document.getElementById('userTableBody');
const userCount = document.getElementById('userCount');

    function loadUsers() {
        fetch('admin-users.php?action=read')
            .then(response => response.json())
            .then(data => {

                if (!data.success) {
                    userTableBody.innerHTML = `
                        <tr>
                            <td colspan="4">
                                Unable to load users.
                            </td>
                        </tr>
                    `;
                    return;
                }

                const users = data.users;

                userCount.textContent =
                    `${users.length} Users Total`;


                userTableBody.innerHTML = '';


                users.forEach(user => {

                    const row =
                        document.createElement('tr');


                    row.innerHTML = `

                        <td>${user.id}</td>

                        <td>${user.name}</td>

                        <td>${user.email}</td>

                        <td>
                            <button
                                class="btn-delete"
                                data-id="${user.id}"
                            >
                                Remove
                            </button>
                        </td>
                    `;


                    userTableBody.appendChild(row);

                    const deleteButton =
                        row.querySelector('.btn-delete');


                    deleteButton.addEventListener(
                        'click',
                        () => {

                            deleteUser(user.id);

                        }
                    );

                });

            })

            .catch(error => {

                console.error(error);

                userTableBody.innerHTML = `
                    <tr>
                        <td colspan="4">
                            Unable to connect to database.
                        </td>
                    </tr>
                `;

            });

    }


    function deleteUser(userId) {

        const confirmDelete = confirm(
            'Are you sure you want to remove this user?'
        );


        if (!confirmDelete) {
            return;
        }


        const formData = new FormData();

        formData.append(
            'action',
            'delete'
        );

        formData.append(
            'id',
            userId
        );

        fetch(
            'admin-users.php',
            {
                method: 'POST',
                body: formData
            }
        )
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(
                        'User removed successfully!'
                    );
                    loadUsers();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error(error);
                alert('Database error.');
            });
    }
    loadUsers();
});