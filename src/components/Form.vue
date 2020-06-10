<template>
      <v-card>
        <v-card-title>
          <span class="headline">{{
            getModalType === "edit" ? "Edit User" : "Create User"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="name"
                :counter="20"
                :rules="nameRules"
                label="Name*"
                required
              />
              <v-text-field
                label="Company*"
                v-model="company"
                :rules="companyRules"
                required
              />
              <v-text-field
                label="Password*"
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  passwordRules.required,
                  passwordRules.min,
                  passwordRules.max
                ]"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :counter="20"
                autocomplete=""
                required
              />
              <v-text-field
                label="Repeat password*"
                v-model="passwordRepeat"
                :append-icon="showRepeat ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  passwordRules.required,
                  passwordRules.min,
                  passwordRules.max,
                  passwordConfirmationRule
                ]"
                :type="showRepeat ? 'text' : 'password'"
                @click:append="showRepeat = !showRepeat"
                :counter="20"
                autocomplete=""
                required
              />
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="formCancel">Close</v-btn>
          <v-btn color="blue darken-1" text @click="formSubmit"> {{getModalType === 'edit' ? 'Update User' : 'Add User'}}</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getModalStatus', 'getModalType', 'getCurrentUser', 'getLoadingStatus']),
    passwordConfirmationRule () {
      return () => this.password === this.passwordRepeat || 'Password must match'
    },
    userInfo () {
      return {
        name: `${this.getCurrentUser.first_name} ${this.getCurrentUser.last_name}`,
        company: this.getCurrentUser.company
      }
    }
  },
  async mounted () {
    if (this.getModalType === 'edit') {
      this.name = await this.userInfo.name
      this.company = await this.userInfo.company
    }
  },
  methods: {
    ...mapMutations(['showModal', 'hideModal']),
    async formSubmit () {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch(this.getModalType === 'edit' ? 'updateUser' : 'addUser', {
          id: this.getModalType === 'edit' ? this.getCurrentUser.id : Date.now(),
          name: this.name,
          job: this.company
        })
        this.hideModal()
      }
    },
    formCancel () {
      this.hideModal()
      this.$refs.form.reset()
    }
  },
  data: () => ({
    name: '',
    company: '',
    showRepeat: false,
    showPassword: false,
    valid: true,
    nameRules: [
      v => !!v || 'Name is required',
      v =>
        (v && (v.length <= 20 || v.length >= 3)) ||
        'Name must be less than 20 characters'
    ],
    password: '',
    passwordRepeat: '',
    passwordRules: {
      required: value => !!value || 'Password is Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      max: v => v.length <= 20 || 'Max 20 characters'
    },
    companyRules: [v => !!v || 'Company is required']
  })
}
</script>
