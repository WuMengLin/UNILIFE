<template>
  <v-card
    height="100%"
    class="mx-auto pa-0 rounded-0 height-auto text-left"
    style="min-height: calc(100vh - 48px)"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <router-link class="nav-link text-decoration-none" href="#" to="/">
          <v-list-item class="mb-2" link>
            <v-list-item-icon>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Checkout</v-list-item-title>
            </v-list-item-content>
          </v-list-item></router-link
        >
        <router-link class="nav-link text-decoration-none" href="#" to="/products"
          ><v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-shopping</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Products</v-list-item-title>
            </v-list-item-content>
          </v-list-item></router-link
        >
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      selectedItem: 0,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Products', icon: 'mdi-image' }
      ],
      right: null
    }
  }
}
</script>
