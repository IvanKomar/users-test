<template>
  <v-overlay v-if="loading" :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
<v-container v-else>
  <div class="d-sm-flex flex-sm-wrap justify-start">
  <Card
    v-for="user of getUsersList"
    :key="user.id"
    :id="user.id"
    :src="user.avatar"
    :name="`${user.first_name} ${user.last_name}`"
    :email="user.email"
  />
  </div>
  <Pagination
    :totalPages="getPages.totalPages"
    :currentPage="getPages.currentPage"
  />
  <Modal v-if="getModalStatus"/>
</v-container>
</template>

<script>
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import Pagination from '@/components/Pagination'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Users',
  components: {
    Card,
    Pagination,
    Modal
  },
  computed: {
    ...mapGetters(['getUsersList', 'getPages', 'getModalStatus', 'getLoadingStatus'])
  },
  data: () => ({
    loading: true
  }),
  methods: {
    ...mapMutations(['showModal', 'hideModal'])
  },
  async mounted () {
    await this.$store.dispatch('fetchUsers')
    this.loading = this.getLoadingStatus
  }
}
</script>
