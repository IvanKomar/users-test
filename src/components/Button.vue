<template>
  <v-btn
    absolute
    dark
    fab
    top
    right
    color="orange"
    @click="openUserCreateModal"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  methods: {
    openUserCreateModal () {
      this.$store.dispatch('showDialog', 'created')
    }
  }
}
</script>
