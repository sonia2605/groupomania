<template>
  <div class="profile">

<form @submit.prevent="modifyProfile" class="profile__display__form__input">
<label for="mail" class="profile__display__form__input__label"
>Email</label >

<input
      type="email"
      id="mail"
      placeholder="modifier votre email" 
      v-model="email"
      name="mail"
      aria-label= "modifier l'email"
      />

<button class="profile__display__form__button">Enregistrer</button>

</form>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "EmailVue",
  data() {
    return {
      email: "",
    };
  },
   methods: {
    modifyProfile() {
      axios
        .put("http://localhost:3000/api/user/:id/", {
          email: this.email,
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        } )
        .then((response) => {
        this.$router.push("put");
        console.log(response);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("changement effectué !");
        }
      }); 
    },
  },
};
</script>