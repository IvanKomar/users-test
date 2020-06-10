<template>
  <v-container v-if="getCurrentUser" >
  <router-link :to="`/users/${getCurrentUser.id}`">
    <v-row>
      <v-col sm="auto">
        <v-avatar size="36px">
        <img :src="getCurrentUser.avatar">
        </v-avatar>
      </v-col>
      <v-col>
        <v-row>
          <strong>
            {{`${getCurrentUser.first_name} ${getCurrentUser.last_name}`}}
          </strong>
        </v-row>
        <v-row>
          <small>
            {{getCurrentUser.company}}
          </small>
        </v-row>
      </v-col>
    </v-row>
  </router-link>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getCurrentUser'])
  }
}
</script>
