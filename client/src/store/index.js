import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    isAuthenticated: false,
    userData: null,
    token:null
  },
  mutations: {
    loginUser(state) {
      state.isAuthenticated = true;
    },  
    updateUserData(state, data) {
      (state.userData = data.user), (state.token = data.token);
    }, 
    logoutUser(state) {
      state.isAuthenticated = false;
      state.userData=null,
      state.token=null
    },  
  },
  actions: {
    loginUser({ commit }, body) {
      commit("updateUserData", body);
      commit("loginUser");
    }, 
    logoutUser({ commit }, body) {
      commit("logoutUser");
    },      
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  getters: {
    currentUser(state, getters) {
      return state.userData;
    },
    currentToken(state, getters) {
      return state.token;
    },
  },
  modules: {
  }
})
