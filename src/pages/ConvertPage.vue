<script setup lang="ts">
import { ref, reactive } from 'vue'
// import type { Ref } from 'vue'

interface InputOptions {
  amount: number
  currency: string
  multiply?: number
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
    multiply: multiply,
  },
])

const currencyOptions = [
  { label: 'USD', value: 'usd', img: 'https://flagcdn.com/w40/us.png' },
  { label: 'EUR', value: 'eur', img: 'https://flagcdn.com/w40/eu.png' },
  { label: 'ILS', value: 'ils', img: 'https://flagcdn.com/w40/il.png' },
]

function calcCurrecy() {
  toCurrencies.forEach((option) => {
    if (option.multiply) option.amount = from.amount * option.multiply
    // option.amount = from.amount * multiply
  })
}

function _findIcon(value: string) {
  const currency = currencyOptions.find((currency) => currency.value === value)
  if (!currency) return defaultFlagUrl
  return currency.img
}

function onAddCurrency() {
  toCurrencies.push(_getDefaultCurrency())
}

function onRemoveCurrency(idx: number) {
  toCurrencies.splice(idx, 1)
}

function _getDefaultCurrency() {
  return {
    amount: 1,
    currency: 'usd',
    multiply: multiply,
  }
}
</script>

<template>
  <div class="container">
    <q-card class="q-pa-md column gap-md" flat bordered>
      <!-- FROM Currency -->
      <div class="currecy-container bg-blue-1">
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

        <!-- <q-btn round color="primary" size="sm" /> -->

        <!-- <q-btn flat icon="more_vert" size="sm" class="q-ml-sm" /> -->
      </div>

      <!-- TO Currency -->
      <div v-for="(option, idx) in toCurrencies" :key="idx" class="to-container">
        <div class="currecy-container q-mt-md q-pa-sm rounded-borders">
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
          <q-btn @click="onRemoveCurrency(idx)" round color="red" size="sm" icon="delete" />
        </div>
        <div class="text-caption text-grey-7 q-mt-xs q-ml-lg">
          {{ `1 ${option.currency.toUpperCase()} = ${option.multiply} ILS` }}
        </div>
      </div>
      <div class="q-mt-md" @click="onAddCurrency">
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
