<template>
	<div class="newProfile__info__text__change">
		<input
          type="email"
          id="mail" 
          v-model="email"
          name="mail"/>
          </div>
</template>


<script>
	export default {
		name: 'EmailVue',
		props: ['input']
	}
</script>