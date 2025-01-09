<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Global */
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 20px !important;
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
}

img.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

/* Mobile */
.flex {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 768px) {
  .flex {
    flex-direction: row;
  }
}

</style>
