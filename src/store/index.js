import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    totalPages: 0,
    currentPage: 0,
    currentUser: {},
    showModal: false,
    modalType: '',
    loading: true
  },
  mutations: {
    setUsersData (state, users) {
      state.users = users.data
      state.totalPages = users.total_pages
      state.currentPage = users.page
    },
    setError (state, error) {
      state.error = error
    },
    setUserById (state, user) {
      state.currentUser = { ...user.data, ...user.ad }
    },
    deleteUserById (state, deletedUserId) {
      state.users = state.users.filter(user => user.id !== deletedUserId)
    },
    updateUserById (state, updatedUserData) {
      state.users = state.users.map(user => {
        if (user.id === updatedUserData.id) {
          return { ...user, name: updatedUserData.name, company: updatedUserData.job }
        }
        return user
      })
    },
    showModal (state, type = 'create') {
      state.showModal = true
      state.modalType = type
    },
    hideModal (state) {
      state.showModal = false
      state.modalType = ''
    },
    setLoading (state) {
      state.loading = true
    },
    setLoaded (state) {
      state.loading = false
    }
  },
  actions: {
    async fetchUsers ({ dispatch, commit }, page = 1) {
      commit('setLoading')
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}&delay=3`)
        commit('setUsersData', response.data)
        commit('setLoaded')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchUser ({ dispatch, commit }, id) {
      commit('setLoading')
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`)
        if (response.status === 200) {
          await commit('setUserById', response.data)
          commit('setLoaded')
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteUser ({ dispatch, commit }, id) {
      commit('setLoading')
      try {
        await axios.delete(`https://reqres.in/api/users/${id}`)
        commit('deleteUserById', id)
        commit('setLoaded')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateUser ({ dispatch, commit }, data) {
      commit('setLoading')
      try {
        await axios.put(`https://reqres.in/api/users/${data.id}`, data)
        commit('updateUserById', data)
        commit('setLoaded')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async showDialog ({ dispatch, commit }, data) {
      commit('showModal', data.type)
    }
  },
  getters: {
    getUsersList: state => state.users,
    getPages: state => ({
      currentPage: state.currentPage,
      totalPages: state.totalPages
    }),
    getCurrentUser: state => state.currentUser,
    getModalStatus: state => state.showModal,
    getModalType: state => state.modalType,
    getLoadingStatus: state => state.loading
  }
})