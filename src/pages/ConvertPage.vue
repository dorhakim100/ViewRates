<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
// import type { Ref } from 'vue'

import { getExchangeRates } from '../services/currency.service/currency.service'
import { formatNumberToString } from '../services/utils.service'

import { currencyOptions } from '../data/currencies'

import { InputOptions } from '../types/InputOptions/Input.options'

const multiply = 0.29
const defaultFlagUrl = 'https://flagcdn.com/w40/un.png'

const from = reactive<InputOptions>({
  amount: 1,
  currency: 'ils',
})

const toCurrencies = reactive<InputOptions[]>([_getDefaultCurrency()])

onMounted(() => updateRates())

watch(() => [from.amount, from.currency, toCurrencies.length], updateRates)

function calcCurrency() {
  toCurrencies.forEach((option) => {
    if (option.multiply) {
      option.amount = +(from.amount * option.multiply).toFixed(2)
    }
  })
}

function _findIcon(value: string) {
  const currency = currencyOptions.find((currency) => currency.value === value)
  if (!currency) return defaultFlagUrl
  return currency.img
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

function _getDefaultCurrency(): InputOptions {
  return {
    amount: 1,
    currency: 'usd',
    multiply: multiply,
  }
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
          @update:model-value="updateRates"
          popup-content-class="currency-dropdown"
        />

        <q-input
          v-model="from.amount"
          type="number"
          class="q-ml-md"
          dense
          outlined
          input-class="text-right"
          @update:model-value="calcCurrency"
          min="0"
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
            popup-content-class="currency-dropdown"
            @update:model-value="updateRates"
          />
          <q-input
            v-model="option.amount"
            type="number"
            dense
            outlined
            input-class="text-right"
            class="q-ml-md"
            min="0"
          />
          <q-btn @click="onRemoveCurrency(idx)" round color="red" size="sm" icon="delete" />
        </div>
        <div class="text-caption text-grey-7 q-mt-xs q-ml-lg">
          {{
            `1 ${from.currency.toUpperCase()} = ${option.multiply} ${option.currency.toUpperCase()}`
          }}
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
