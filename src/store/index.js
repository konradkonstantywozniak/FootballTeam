import { createStore } from 'vuex';

const store = createStore({
  state: {
    users: [], // User list
    currentUser: null, // Current user being edited
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter(user => user.id !== userId);
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      const response = await fetch('https://reqres.in/api/users');
      const data = await response.json();
      commit('SET_USERS', data.data);
    },
    addUser({ commit }, user) {
        const newUser = {
          ...user,
          id: Date.now(), // Generate a unique ID for the user
        };
        commit('ADD_USER', newUser);
      },
    updateUser({ commit }, updatedUser) {
      commit('UPDATE_USER', updatedUser);
    },
    deleteUser({ commit }, userId) {
      commit('DELETE_USER', userId);
    },
    setCurrentUser({ commit }, user) {
      commit('SET_CURRENT_USER', user);
    },
  },
  getters: {
    users: state => state.users,
    currentUser: state => state.currentUser,
  },
});

export default store;
