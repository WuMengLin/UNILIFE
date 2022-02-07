<template>
  <v-app id="inspire">
  <v-row no-gutters>
    <v-col cols="12">
        <Navbar/>
    </v-col>
  </v-row>
    <v-container fluid class="pa-0">
      <v-row no-gutters style="flex-wrap:no-wrap">
        <div style="width:fit-content">
          <Sidebar></Sidebar>
        </div>
        <div style="flex:1 0">
          <router-view></router-view>
        </div>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
export default {
  components: {
    Navbar, Sidebar
  }
}
</script>
