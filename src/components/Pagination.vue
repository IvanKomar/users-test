<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="totalPages"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  data: () => ({
    page: 0
  }),
  props: {
    totalPages: {
      type: Number
    },
    currentPage: {
      type: Number
    }
  },
  mounted () {
    this.page = this.currentPage
  },
  updated () {
    this.$store.dispatch('fetchUsers', this.page)
  }
}
</script>
