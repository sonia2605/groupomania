<template>
  <div>
    <Navbar />
    <div>
      <h1 v-if="user">Bienvenue {{ user.username }} !</h1>

      <div class="profile">
        <h2>Vos informations</h2>
        <div class="profile__info">
          <p class="profile__info__title">Pseudo</p>
          <div class="profile__info__text">{{ user.username }}</div>

          <p class="profile__info__title"> Email</p>
          <div class="profile__info__text"><!--{{ user.email }}</div>-->
          <label for="email" class = "profile__info__text__change"></label>
          <input
          type="email"
          id="mail" 
          v-model="email"
          name="mail"/>
          </div>
      <button v-on:click.prevent="ModifyProfile" class="profile__smallButton"
      >Enregister <i class="fas fa-check"></i></button>
      
      </div>
</div>
      <ModaleDeleteAccount
        v-bind:revele="revele"
        v-bind:displayModale="displayModale"
      />
      <button class="profile__bigButton" v-on:click="displayModale">
        Supprimer mon compte <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EmailVue from "@/components/ModifyProfile.vue";
import Navbar from "@/components/Navbar.vue";
import ModaleDeleteAccount from "@/components/ModaleDeleteAccount.vue";
export default {
  name: "ProfileVue",
  components: {
    Navbar,
    EmailVue,
    ModaleDeleteAccount,
  },
  data() {
    return {
      revele: false,
      user: "",
      EmailVue: null,
    };
  },
  created() {
    this.displayProfile();
  },
  methods: {
    // Permet d'afficher les informations de profil
    displayProfile() {
      const userId = localStorage.getItem("userId");
      axios
        .get("http://localhost:3000/api/user/" + userId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.user = response.data;
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
	h1, h2 {
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
      input {
      border: none;
      &:focus {
        outline: none;
      }
		}}
		&__smallButton {
			border: 2px solid #3f3d56;
			border-radius: 25px;
			color: #3f3d56;
			font-size: 15px;
			font-weight: bold;
			padding: 0.4rem;
			margin: 1rem;
			outline-style: none;
			background: white;
			&:hover, &:focus {
			color: #ff6363;
			cursor: pointer;
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
			&:hover, &:focus {
			border: 3px solid #ff6363;
			color: #ff6363;
			cursor: pointer;
			}
		}
  }
</style>