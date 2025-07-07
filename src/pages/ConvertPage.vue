<script setup lang="ts">
import { ref, reactive } from 'vue'
// import type { Ref } from 'vue'

interface InputOptions {
  amount: number
  currency: string
  // state: string
}

const multiply = 3.3
const defaultFlagUrl = 'https://flagcdn.com/w40/un.png'

const from = reactive<InputOptions>({
  amount: 0,
  currency: 'usd',
})

const toCurrencies = reactive<InputOptions[]>([
  {
    amount: 0,
    currency: 'ils',
  },
])

const currencyOptions = [
  { label: 'USD', value: 'usd', img: 'https://flagcdn.com/w40/us.png' },
  { label: 'EUR', value: 'eur', img: 'https://flagcdn.com/w40/eu.png' },
  { label: 'ILS', value: 'ils', img: 'https://flagcdn.com/w40/il.png' },
]

function calcCurrecy() {
  const updated = toCurrencies.map((option) => {
    // option.amount = from.amount * option.multiply
    option.amount = from.amount * multiply
  })
}

function _findIcon(value: string) {
  const currency = currencyOptions.find((currency) => currency.value === value)
  if (!currency) return defaultFlagUrl
  return currency.img
}
</script>

<template>
  <div class="container">
    <q-card class="q-pa-md column gap-md" flat bordered>
      <!-- FROM Currency -->
      <div class="currecy-container">
        <q-avatar size="32px">
          <img :src="_findIcon(from.currency)" alt="From flag" />
        </q-avatar>
        <q-select
          v-model="from.currency"
          :options="currencyOptions"
          dense
          outlined
          class="currency-code q-ml-sm"
          emit-value
          map-options
        />

        <q-input
          v-model="from.amount"
          type="number"
          class="q-ml-md"
          dense
          outlined
          input-class="text-right"
          @update:model-value="calcCurrecy"
        />

        <!-- <q-btn flat icon="more_vert" size="sm" class="q-ml-sm" /> -->
      </div>

      <div class="text-caption text-grey-7 q-mt-xs q-ml-lg">1 USD = 3.3358 ILS</div>

      <!-- TO Currency -->
      <div
        v-for="(option, idx) in toCurrencies"
        :key="idx"
        class="currecy-container q-mt-md q-pa-sm rounded-borders"
      >
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
        />
        <q-input
          v-model="option.amount"
          type="number"
          dense
          outlined
          input-class="text-right"
          class="q-ml-md"
        />
      </div>

      <div class="q-mt-md">
        <q-btn flat icon="add" label="Add currency" class="text-primary" />
      </div>
    </q-card>
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
  // background-color: red;

  display: flex;
  align-items: center;
  justify-content: space-around;
  justify-items: center;
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
