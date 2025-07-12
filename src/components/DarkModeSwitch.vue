<script setup lang="ts">
import { ref, watch } from 'vue'

import { useSystemStore } from 'src/stores/system'
import { storeToRefs } from 'pinia'

import { outlinedNightlightRound } from '@quasar/extras/material-icons-outlined'
import { outlinedWbSunny } from '@quasar/extras/material-icons-outlined'

const store = useSystemStore()
const { setPrefs } = store
const { prefs, isDarkMode } = storeToRefs(store)

function onToggle() {
  setPrefs({ ...prefs.value, isDarkMode: !isDarkMode.value })
}
</script>

<template>
  <div class="container">
    <div>
      <q-toggle
        :model-value="isDarkMode"
        :checked-icon="outlinedNightlightRound"
        color="black"
        :unchecked-icon="outlinedWbSunny"
        @update:model-value="onToggle"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
}
</style>
