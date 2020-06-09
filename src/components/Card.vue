<template>
  <v-card
    class="mx-2 my-2"
    width="350"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="src"
    >
      <v-card-title>{{name}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">{{email}}</v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="primary"
        small
        link
        v-if="!showUser"
        :to="`/users/${id}`"
      >
        show
      </v-btn>
      <v-btn
        small
        @click="getUserDataForModal(id)"
      >
        edit
      </v-btn>
      <v-btn
        color="error"
        small
        @click="deleteUser(id)"
      >
        delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'card',
  props: {
    src: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    showUser: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser'])
  },
  methods: {
    deleteUser (id) {
      this.$store.dispatch('deleteUser', id)
      this.showUser && this.$router.push('/users')
    },
    ...mapMutations(['hideModal']),
    async getUserDataForModal (id) {
      await this.$store.dispatch('fetchUser', id)
      this.$store.dispatch('showDialog', { type: 'edit', id })
    }
  }
}
</script>

<style lang="sass">
  .text-decoration-none
    text-decoration: none
  .wf-loading .material-icons
    display: none
  .v-application .markdown code
    box-shadow: none
    color: #c0341d
    background-color: #fbe5e1
  .v-application .markdown kbd > code
    background: transparent
    color: inherit
</style>
