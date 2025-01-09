<template>
  <div class="container">
    <h1>User List</h1>

    <!-- Search bar and Add User button -->
    <div class="search-bar">
      <input type="text" placeholder="Search for users..." v-model="searchQuery" />
      <button class="add-user" @click="navigateToAddUser">+ Add User</button>
    </div>

    <!-- Users table -->
    <div class="user-table">
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Full Name</th>
            <th class="actionsTh">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id">
            <td>
              <img :src="user.avatar" alt="Avatar" class="avatar" />
            </td>
            <td>{{ user.first_name }} {{ user.last_name }}</td>
            <td class="actions">
              <button class="edit" @click="navigateToEditUser(user)">✏️</button>
              <button class="delete" @click="deleteUser(user.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button 
        class="pagination-button prev" 
        :disabled="currentPage === 1" 
        @click="currentPage--"
      >
        «
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="['pagination-button', { active: currentPage === page }]"
      >
        {{ page }}
      </button>
      <button 
        class="pagination-button next" 
        :disabled="currentPage === totalPages" 
        @click="currentPage++"
      >
        »
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchQuery: "", // Search query
      currentPage: 1, // Current page
      itemsPerPage: 5, // Number of users per page
    };
  },
  created() {
    if (!this.$store.getters.users.length) {
      // Fetch users only if the list is empty
      this.$store.dispatch('fetchUsers');
    }
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    filteredUsers() {
      return this.users.filter(user =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredUsers.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    },
  },
  methods: {
    navigateToAddUser() {
      this.$router.push('/add');
    },
    navigateToEditUser(user) {
      this.$store.dispatch('setCurrentUser', user);
      this.$router.push(`/edit/${user.id}`);
    },
    deleteUser(userId) {
      this.$store.dispatch('deleteUser', userId);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages; // Adjust current page if the last page is empty
      }
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-bar input {
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-bar .add-user {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.search-bar .add-user:hover {
  background-color: #218838;
}

.user-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f8f9fa;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.actionsTh {
  text-align: right;
  padding-right: 40px;
}

.actions {
  text-align: right;
  padding-right: 10px;
}

.actions button {
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.actions .edit {
  background-color: #007bff;
  color: white;
}

.actions .edit:hover {
  background-color: #0056b3;
}

.actions .delete {
  background-color: #dc3545;
  color: white;
}

.actions .delete:hover {
  background-color: #c82333;
}

/* Pagination styles */
.pagination {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 20px;
  gap: 5px;
}

.pagination-button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.pagination-button:hover {
  background-color: #007bff;
  color: #fff;
}

.pagination-button.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
  font-weight: bold;
}

.pagination-button:disabled {
  background-color: #f8f9fa;
  color: #ccc;
  cursor: not-allowed;
}

.pagination-button.prev,
.pagination-button.next {
  font-size: 16px;
  font-weight: bold;
}
</style>