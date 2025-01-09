<template>
  <div class="container">
    <h1>Edit User</h1>
    <div class="flex">
      <UserForm 
        :firstName="currentUser?.first_name"
        :lastName="currentUser?.last_name"
        :avatar="currentUser?.avatar"
        :submitButtonText="'Update User'"
        @submit="updateUser" 
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
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  methods: {
    updateUser(updatedData) {
      // Dispatch Vuex action to update the user
      this.$store.dispatch('updateUser', {
        id: this.currentUser.id, // Ensure the user's ID is included
        ...updatedData, // Spread the updated fields (first_name, last_name, avatar)
      });

      // Navigate back to the user list
      this.$router.push('/list');
    },
  },
  created() {
    if (!this.currentUser) {
      // Redirect if no current user is set
      this.$router.push('/list');
    }
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
