<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'
import { useCurrencyStore } from '../stores/currency'

import { currencyOptions } from '../data/currencies'

import { InputOptions } from '../types/InputOptions/Input.options'

const defaultFlagUrl = 'https://flagcdn.com/w40/un.png'

const store = useCurrencyStore()
const { from, toCurrencies } = store

defineProps<{
  option: InputOptions
  isFrom: boolean
  idx?: number
}>()

const emit = defineEmits()

function _findIcon(value: string) {
  const currency = currencyOptions.find((currency) => currency.value === value)
  if (!currency) return defaultFlagUrl
  return currency.img
}
</script>

<template>
  <div class="to-container">
    <div :class="{ 'bg-blue-1': isFrom }" class="currecy-container q-mt-md q-pa-sm rounded-borders">
      <q-avatar size="32px">
        <img :src="_findIcon(option.currency)" alt="To flag" />
      </q-avatar>
      <q-select
        v-model="option.currency"
        :options="currencyOptions"
        dense
        outlined
        class="currency-code q-ml-sm"
        emit-value
        map-options
        popup-content-class="currency-dropdown"
        @update:model-value="emit('update')"
      />
      <q-input
        v-model="option.amount"
        type="number"
        dense
        outlined
        input-class="text-right"
        class="q-ml-md"
        min="0"
        @update:model-value="emit('update')"
      />
      <q-btn
        v-if="!isFrom"
        @click="emit('remove', idx)"
        round
        color="red"
        size="sm"
        icon="delete"
      />
    </div>
    <div v-if="!isFrom" class="text-caption text-grey-7 q-mt-xs q-ml-lg">
      {{ `1 ${from.currency.toUpperCase()} = ${option.multiply} ${option.currency.toUpperCase()}` }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.currecy-container {
  // display: flex;
  display: grid;
  grid-template-columns: 32px auto auto 30px;
  align-items: center;
  // justify-content: space-around;
  // justify-items: center;
  gap: 8px;
  padding: 0.5rem;

  img {
    object-fit: cover;
  }
}

.currency-code {
  font-weight: 500;
  font-size: 1.2rem;
}
</style>
