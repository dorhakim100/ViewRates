<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
// import type { Ref } from 'vue'
import { useCurrencyStore } from '../stores/currency'

import { getExchangeRates } from '../services/currency.service/currency.service'
import { formatNumberToString, getDefaultCurrency } from '../services/utils.service'

import { currencyOptions } from '../data/currencies'

import { InputOptions } from '../types/InputOptions/Input.options'

import CurrencyComponent from 'src/components/CurrencyComponent.vue'

const multiply = 0.29
const defaultFlagUrl = 'https://flagcdn.com/w40/un.png'

const store = useCurrencyStore()
const { from, toCurrencies } = store

onMounted(() => updateRates())

watch(() => [from.amount, from.currency, toCurrencies.length], updateRates)

function calcCurrency() {
  toCurrencies.forEach((option) => {
    if (option.multiply) {
      option.amount = +(from.amount * option.multiply).toFixed(2)
    }
  })
}

function onAddCurrency() {
  const available = currencyOptions.find(
    (opt) => !toCurrencies.some((cur) => cur.currency === opt.value),
  )

  if (available) {
    toCurrencies.push({
      amount: 1,
      currency: available.value,
      multiply: 1,
    })
    calcCurrency()
  }
}

function onRemoveCurrency(idx: number) {
  toCurrencies.splice(idx, 1)
}

async function updateRates() {
  const symbols = toCurrencies.map((cur) => cur.currency)
  const rates = await getExchangeRates(from.currency, symbols)

  toCurrencies.forEach((option) => {
    if (!option.multiply) return
    if (option.currency === from.currency) {
      option.multiply = 1
      return
    }
    option.multiply = rates.find(
      (rate) => rate.name === (from.currency + option.currency).toUpperCase(),
    )?.multiply

    if (!option.multiply) return

    option.amount = +(from.amount * option.multiply).toFixed(2)
  })
}
</script>

<template>
  <div class="container">
    <h2 class="q-ma-none">Currency</h2>
    <q-card class="q-pa-md column gap-md" flat bordered>
      <!-- FROM Currency -->
      <CurrencyComponent :option="from" :isFrom="true" @update="updateRates" />
      <!-- TO Currency -->
      <CurrencyComponent
        v-for="(curr, idx) in toCurrencies"
        :key="idx"
        :option="curr"
        :idx="idx"
        @remove="onRemoveCurrency"
        @update="updateRates"
      />

      <div class="q-mt-md" @click="onAddCurrency">
        <q-btn flat icon="add" label="Add currency" class="text-primary" />
      </div>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2 {
  margin-bottom: 1rem;
}
</style>
