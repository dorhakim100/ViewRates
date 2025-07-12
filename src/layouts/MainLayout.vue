<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> ViewRates </q-toolbar-title>
        <DarkModeSwitch />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <!-- <q-item-label header> Essential Links </q-item-label> -->

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue'
import DarkModeSwitch from '../components/DarkModeSwitch.vue'

const linksList: EssentialLinkProps[] = [
  {
    title: 'Home',
    // caption: 'Real Time Currency',
    icon: 'home',
    link: '/',
    exact: true,
  },
  {
    title: 'Convert',
    caption: 'Real Time Currency',
    icon: 'attach_money',
    link: '/convert',
  },
]

const leftDrawerOpen = ref(false)
const route = useRoute()

watch(
  () => route.path,
  () => (leftDrawerOpen.value = false),
)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
