<script setup lang="ts">
  import AuthPagesTemplate from '../Templates/AuthPages.vue';
  import AuthPagesSignInForm from '../organisms/AuthPagesSignInForm.vue';
  import { ref } from 'vue';
  import { useNotificationsStore } from '../../stores/notifications';
  import validateSignInForm from '../../utils/validateSignInForm';
  import { signInUser } from '../../services/auth';
  import { routes } from './../../router.ts';

  const email = ref('');
  const password = ref('');
  const isSubmitting = ref(false);
  const notification = ref(null);
  const notificationsStore = useNotificationsStore();

  //functions

  function openModal() {
    isModalOpen.value = true;
  }

  function closeModal() {
    isModalOpen.value = false;
  }
  async function onSubmit() {
    /* Prevents double clicking */
    if (isSubmitting.value) return;

    try {
      const localEmail = email.value;
      const localPassword = password.value;

      const { success, message } = validateSignInForm({
        email: localEmail,
        password: localPassword
      });

      if (!success) {
        notificationsStore.showNotification(message as string, 'error');
        return;
      }

      isSubmitting.value = true;
      const signInUserResult = await signInUser({ email: localEmail, password: localPassword });

      if (!signInUserResult.success) {
        notificationsStore.showNotification(signInUserResult.data.message as string, 'error');
        return;
      }

      router.push({ name: 'home' });
    } catch (error) {
      console.error('Erro:', error);
      notificationsStore.showNotification('Failed to sign in! Try again later.', 'error');
    } finally {
      isSubmitting.value = false;
    }
  }
</script>

<template>
  <AuthPagesTemplate
    formTitle="Sign In"
    formButtonText="Sign In"
    :onFormSubmit="onSubmit"
    headerText="Don't have an account yet?"
    headerLinkText="Sign Up"
    headerLinkUrl="/sign-up"
    :isLoading="isSubmitting"
  >
    <AuthPagesSignInForm
      :email="email"
      :password="password"
      @update:email="email = $event"
      @update:password="password = $event"
    />
  </AuthPagesTemplate>
</template>

<style></style>
