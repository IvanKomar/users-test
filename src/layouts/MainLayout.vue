<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" app>
      <SmallProfileCard/>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/users">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Users
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text"> I.Komar 2020</span>
      <Button/>
    </v-footer>
  </v-container>
</template>

<script>
import Button from '@/components/Button'
import SmallProfileCard from '@/components/SmallProfileCard'
export default {
  props: {
    source: String
  },
  components: {
    Button,
    SmallProfileCard
  },
  data: () => ({
    drawer: null
  })
}
</script>
