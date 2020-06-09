<template>
  <v-overlay v-if="loading" :value="loading">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
  <v-container v-else>
    <Card
      :id="getCurrentUser.id"
      :src="getCurrentUser.avatar"
      :name="`${getCurrentUser.first_name} ${getCurrentUser.last_name}`"
      :email="getCurrentUser.email"
      :showUser="true"
    />
    <Modal v-if="getModalStatus" />
  </v-container>
</template>

<script>
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import { mapGetters } from 'vuex'
export default {
  name: 'Users',
  components: {
    Card,
    Modal
  },
  computed: {
    ...mapGetters([
      'getCurrentUser',
      'getPages',
      'getModalStatus',
      'getLoadingStatus'
    ])
  },
  data: () => ({
    loading: true
  }),
  async mounted () {
    const id = this.$router.history.current.params.id
    await this.$store.dispatch('fetchUser', +id)
    this.loading = false
  }
}
</script>
