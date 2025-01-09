<template>
  <div class="container">
    <h1>Add User</h1>
    <div class="container">
      <UserForm 
      :firstName="currentUser?.first_name"
      :lastName="currentUser?.last_name"
      :avatar="currentUser?.avatar"
      :submitButtonText="'Add User'"
      @submit="addUser" 
      />
    </div>
  </div>
</template>

<script>
import UserForm from '../components/UserForm.vue'; // Adjust path if necessary

export default {
  components: {
    UserForm, // Register the component
  },
  methods: {
    addUser(user) {
      // Dispatch the action to add a new user to the Vuex store
      this.$store.dispatch('addUser', user);
      // Navigate back to the user list after adding
      this.$router.push('/list');
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

.flex {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  width: 1000px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
}

.user-photo .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
