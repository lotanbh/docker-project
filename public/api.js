// const API_URL = "http://localhost:3000/api/users";
const API_URL = "/api/users";

let editingUserId = null;   


const totalUsers = document.getElementById('totalUsers');  
const avgAge = document.getElementById('avgAge');
const addUserForm = document.getElementById('addUserForm'); 


const usersGrid = document.getElementById('usersGrid')

async function loadUsers() {
    try {
        const response = await fetch(API_URL);        
        const users = await response.json();
        console.log(users);
        renderUsers(users);

    } catch (error) {
        console.error(error, "Error loading users");
        
    }
    
}

function renderUsers(users) {
        const totalUsersEl = document.getElementById('totalUsers');
        const avgAgeEl = document.getElementById('avgAge');
        console.log(users.length);
        if (users.length===0){
            usersGrid.innerHTML = `
            <p> No users yet, please create user</p>
            `
            if (totalUsersEl) totalUsersEl.innerText = "0";
            if (avgAgeEl) avgAgeEl.innerText = "0";
            return;
        }
        if (totalUsersEl) {
        totalUsersEl.innerText = users.length;
        }
        if (avgAgeEl) {
        const totalAge = users.reduce((sum, user) => sum + Number(user.age || 0), 0);
        const average = totalAge / users.length;
        
        avgAgeEl.innerText = average.toFixed(1);
    }
        
    usersGrid.innerHTML =users.map((user) => `
        <div class = "card">
            <button type="button" class="deleteBtn" onclick = "deleteUser('${user._id}')">🗑️</button>
             <button type="button" class="editBtn" onclick="startEditUser('${user._id}', '${user.name}', '${user.email}', ${user.age})">📝</button>
            <div>${user.name}</div>
            <div>${user.email}</div>
            <div>${user.age}</div>
        </div>
    `).join("");
}

async function deleteUser(id) {
    if(!confirm("Are you sure you want to delete this user?")) return;
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method:"DELETE"
        });
        if (response.ok){
            loadUsers();
        } else {
            alert (" Could not delete user from the server. ")
        }

    } catch (error) {
        console.error(error, "Error deleting user");
        alert(" Network error. Please try again. ")
        
    }
    
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    const url = editingUserId ? `${API_URL}/${editingUserId}` : API_URL;
    const method = editingUserId ? 'PUT' : 'POST';

    try {
        const response = await fetch(url,  {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, age }) 
        });

        const data = await response.json();

        if (response.ok) {
            alert(editingUserId ? 'User updated successfully!' : 'User added successfully!');
            
            document.getElementById('addUserForm').reset(); 
            editingUserId = null;

            const submitBtn = document.querySelector('#addUserForm button[type="submit"]');
            if (submitBtn) submitBtn.innerText = "Add User";

            loadUsers(); 
        } else {
            alert(`Error: ${data.error || data.message}`); 
            }
    } catch (error) {
        console.error('Network Error:', error);
        alert('Could not connect to the server.');
    }
}


function startEditUser(id, name, email, age) {
    editingUserId = id;   
    
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('age').value = age;
    
    const submitBtn = document.querySelector('#addUserForm button[type="submit"]');
    if (submitBtn) submitBtn.innerText = "Update User";
}

// addUserForm.addEventListener('submit', handleFormSubmit);

document.addEventListener('DOMContentLoaded', () => {
    const formElement = document.getElementById('addUserForm');
    if (formElement) {
        formElement.addEventListener('submit', handleFormSubmit);
        console.log("Form successfully connected to JavaScript!");
    } else {
        console.error("Could not find addUserForm in the HTML!");
    }

    loadUsers();
});


   

