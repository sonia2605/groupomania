<template>
  <div>
    <Navbar/>

    <div>
      <h1 v-if="user">Bienvenue {{ user.username }} !</h1>

      <div class="profile">
      <h2>Vos informations</h2>

        <div class="profile__info">
          <p class="profile__info__title">Pseudo</p>
          <div class="profile__info__text">{{ user.username }}</div>

          <p class="profile__info__title">Email</p>
          <div class="profile__info__text">{{ user.email }}</div>
        </div>

      </div>

      <ModaleDeleteAccount
        v-bind:revele="revele"
        v-bind:displayModale="displayModale"
      />

      <button 
      class="profile__bigButton" 
      v-on:click="displayModale">
      Supprimer mon compte 
      <i class="far fa-trash-alt"></i>
      </button>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import Navbar from "@/components/Navbar.vue";
import ModaleDeleteAccount from "@/components/ModaleDeleteAccount.vue";

export default {
  name: "ProfileVue",
  components: {
    Navbar,
    ModaleDeleteAccount,
  },
  data() {
    return {
      revele: false,
      user: "",
    };
  },
  created() {
    this.displayProfile();
			this.notyf = new Notyf({
			duration: 2000,
			position: {
				x: 'center',
				y: 'top'
			}
			}); 
		},
  
    // Permet d'afficher les informations de profil
methods: {
			displayProfile() {
				const userId = localStorage.getItem('userId');
				axios.get('http://localhost:3000/api/user/' + userId, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					}
				})
				.then(response => {
					this.user = response.data;
				})
				.catch(error => {
					const msgerror = error.response.data
					this.notyf.error(msgerror.error)
				})
			},
    // Permet d'afficher la boîte modale pour la suppression du compte
    displayModale() {
      this.revele = !this.revele;
    },
  },
};
</script>

<style scoped lang="scss">
h1,
h2 {
  margin-top: 2rem;
}
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 40%;
  max-width: 60%;
  margin: 3rem auto;
  background: #ffb1b1;
  border-radius: 25px;
  @media (max-width: 500px) {
    min-width: 80%;
  }
  &__info {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 1rem;
    &__title {
      font-weight: bold;
      margin: 1rem 0 0.4rem 0;
    }
    &__text {
      background: white;
      border-radius: 10px;
      padding: 0.5rem;
      width: 15rem;
    }
  }

  &__bigButton {
    border: 3px solid #3f3d56;
    border-radius: 25px;
    color: #3f3d56;
    font-size: 15px;
    font-weight: bold;
    padding: 0.9rem;
    margin: 1rem;
    outline-style: none;
    &:hover,
    &:focus {
      border: 3px solid #ff6363;
      color: #ff6363;
      cursor: pointer;
    }
  }
}
</style>
