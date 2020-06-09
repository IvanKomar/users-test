<template>
  <v-app>
    <component :is="layout">
        <router-view/>
    </component>
  </v-app>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'

export default {
  components: {
    MainLayout
  },
  computed: {
    layout () {
      return 'main-layout'
    }
  }
}
</script>
