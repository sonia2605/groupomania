<template>
  <div class="home">
    <img
      class="home__title"
      src="../assets/iconLong450.png"
      alt="Logo de Groupomania"
    />

    <div class="home__display">
      <div class="home__display__picture">
        <img
          class="home__display__picture"
          src="../assets/bottomImage450.png"
          alt="Représentation de trois personnes qui discutent via un chat"
        />
      </div>

      <form @submit.prevent="login" class="home__display__form">
        <h1 class="home__display__form__title">Se connecter</h1>

        <div class="home__display__form__input">
          <label for="mail" class="home__display__form__input__label"
            >Email</label
          >
          <input type="email" v-model="email" id="mail" name="mail" />
        </div>

        <div class="home__display__form__input">
          <label for="password" class="home__display__form__input__label"
            >Mot de passe</label
          >
          <input
            type="password"
            v-model="password"
            id="password"
            name="password"
          />
        </div>

        <button class="home__display__form__button">Connexion</button>

        <p>
          Vous n'avez pas encore de compte ?
          <router-link to="/signup" class="home__display__form__signup"
            >S'inscrire</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  
  methods: {
    // Permet de se connecter et de recharger la page sans que l'utilisateur soit déconnecté
    login() {
      axios
        .post("http://localhost:3000/api/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          this.$router.push("post");
        })
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  &__title {
    @media (max-width: 930px) {
      max-width: 400px;
      width: 90%;
    }
  }
  &__display {
    margin-top: 3rem;
    display: flex;
    justify-content: space-around;
    @media (max-width: 930px) {
      display: flex;
      flex-direction: column-reverse;
    }
  /*  &__picture {
      float: left;
      padding-top: 4rem;
      margin: 0 0 0 3rem;
      @media (max-width: 1170px) {
        max-width: 350px;
      }
      @media (max-width: 930px) {
        max-width: 250px;
        margin: auto;
        padding-top: 2rem;
      }
    }*/
    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 840px;
      width: 40%;
      border: 3px solid #3f3d56;
      border-radius: 25px;
      margin-top: 2rem;
      margin-left: -2rem;
      padding: 1rem;
      @media (max-width: 930px) {
        min-width: 250px;
        margin: auto;
      }
      &__title {
        margin-bottom: 3rem;
        font-size: 27px;
      }
      &__input {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
        width: 70%;
        &__label {
          text-align: start;
          font-weight: bolder;
        }
      }
      &__button {
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
      &__signup {
        font-weight: bold;
        text-decoration: none;
        color: #e60a0a;
        // color: #ff6363;
      }
    }
  }
}
</style>
