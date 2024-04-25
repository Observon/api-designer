<script setup="ts">
  import InputWithLabel from '../molecules/InputWithLabel.vue';

  // Props & Emitters
  defineProps(['email', 'password']);
  defineEmits(['update:email', 'update:password']);
</script>

<template>
  <InputWithLabel
    :value="email"
    @update:value="$emit('update:email', $event)"
    id="login-email"
    type="email"
    label="Email"
    placeholder="email@exampl.com"
  />
  <InputWithLabel
    :value="password"
    @update:value="$emit('update:password', $event)"
    id="login-password"
    type="password"
    label="Password"
    placeholder="Enter your password"
  />
</template>
