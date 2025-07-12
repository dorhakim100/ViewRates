<script setup lang="ts">
import { ref } from 'vue'

import { outlinedNightlightRound } from '@quasar/extras/material-icons-outlined'
import { outlinedWbSunny } from '@quasar/extras/material-icons-outlined'

const isDarkMode = ref(false)
</script>

<template>
  <div class="container">
    <div>
      <q-toggle
        v-model="isDarkMode"
        :checked-icon="outlinedNightlightRound"
        color="black"
        :unchecked-icon="outlinedWbSunny"
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
