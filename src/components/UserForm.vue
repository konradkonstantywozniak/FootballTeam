<template>
  <div class="user-form">
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="name-fields">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            id="firstName"
            v-model="localFirstName"
            type="text"
            placeholder="Enter first name"
            required
          />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            id="lastName"
            v-model="localLastName"
            type="text"
            placeholder="Enter last name"
            required
          />
        </div>
      </div>
      <button type="submit" class="submit-button">{{ submitButtonText }}</button>
    </form>

    <div class="avatar-container">
      <img
        :src="previewImage || 'https://via.placeholder.com/150'"
        alt="Avatar"
        class="avatar"
      />
      <button type="button" class="change-photo-button">
        Change photo
        <input 
          type="file" 
          accept="image/*" 
          @change="onFileChange" 
          class="file-input"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    firstName: String,
    lastName: String,
    avatar: String,
    submitButtonText: String,
  },
  emits: ["submit"],
  data() {
    return {
      localFirstName: this.firstName || "",
      localLastName: this.lastName || "",
      localAvatar: this.avatar || "https://via.placeholder.com/150",
      previewImage: this.avatar || "https://via.placeholder.com/150",
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", {
        first_name: this.localFirstName,
        last_name: this.localLastName,
        avatar: this.previewImage,
      });
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 2px solid #ccc;
}

/* Style for the button acting as a wrapper */
.change-photo-button {
  position: relative;
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-block;
  overflow: hidden;
}

.change-photo-button:hover {
  background-color: #f0f0f0;
}

/* File input hidden */
.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0; /* Completely hide the file input */
  cursor: pointer; /* Ensure the pointer indicates a clickable area */
}
/* Main container for form and avatar */
.user-form {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  gap: 100px; /* Space between form and avatar */
}

/* Form container styles */
.form-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Name fields in one line */
.name-fields {
  display: flex;
  gap: 20px; /* Space between First Name and Last Name fields */
}

/* Form group styles */
.form-group {
  flex: 1; /* Each field takes equal space */
  display: flex;
  flex-direction: column;
}

label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

input[type="text"] {
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

/* Submit button styles */
.submit-button {
  margin-top: 60px;
  padding: 12px 24px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 150px;
}

.submit-button:hover {
  background-color: #218838;
}

/* Avatar container styles */
.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-shrink: 0; /* Prevent shrinking of avatar */
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 3px solid #ccc;
}

.change-photo-button {
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 1px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 200px;
}

.change-photo-button:hover {
  background-color: #f0f0f0;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  .user-form {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
  }

  .avatar-container {
    margin-top: 20px;
  }

  .name-fields {
    flex-direction: column;
  }
}
</style>
