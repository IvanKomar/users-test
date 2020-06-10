<template>
  <v-row justify="center">
    <v-dialog v-model="getModalStatus" persistent max-width="600px">
      <v-card v-if="getLoadingStatus" :value="getLoadingStatus">
        <v-card-title>
          <span class="headline">loading data</span>
          <v-progress-linear indeterminate color="blue"/>
        </v-card-title>
        <v-card-text>
          <v-overlay></v-overlay>
          <v-form>
            <v-text-field label="Name*" disabled />
            <v-text-field label="Company*" disabled/>
            <v-text-field label="Password*" disabled/>
            <v-text-field label="Repeat password*" disabled/>
          </v-form>
        </v-card-text>
        </v-card>
      <Form v-else />
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Form from '@/components/Form'
export default {
  name: 'modal',
  components: {
    Form
  },
  computed: {
    ...mapGetters(['getModalStatus', 'getLoadingStatus'])
  }
}
</script>
