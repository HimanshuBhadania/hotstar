<template>
  <div class="header">
    <div class="container nav">
      <div class="left-nav">
        <router-link to="/" class="img-logo">
          <img src="../assets/logo.png" alt="logo" class="img-fluid" />
        </router-link>
        <ul class="nav-link">
          <router-link v-for="navLink in navLinks" :key="navLink.id" :to="navLink.path">
            <li>
              {{ navLink.name }}
            </li>
          </router-link>
        </ul>
      </div>
      <div class="right-nav">
        <input class="search-input" placeholder="Search" type="text" v-model="search" />
        <div>
          <button class="btn sub-btn">SUBCRIBE</button>
          <button v-if="loginORLogout === 'login'" class="btn login-btn">
            LOGIN
          </button>
          <button v-if="loginORLogout === 'logout'" @click="logoutHandle" class="btn login-btn">
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseAuth } from "@/data/fireBase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  data() {
    return {
      search: "",
      loginORLogout: "login",
      navLinks: [
        {
          id: 1,
          name: "TV",
          path: "/tv",
        },
        {
          id: 2,
          name: "Movies",
          path: "/",
        },
        {
          id: 3,
          name: "Sports",
          path: "/",
        },
        {
          id: 4,
          name: "Favourite List",
          path: "/favourite",
        },
      ],
    };
  },
  methods: {
    logoutHandle() {
      signOut(firebaseAuth);
    },
  },
  beforeCreate() {
    this.$store.dispatch("fatchMovieData");
  },
  mounted() {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        this.loginORLogout = "logout";
      } else {
        this.loginORLogout = "login";
      }
    });
  },
  watch: {
    search: {
      deep: true,
      handler(val) {
        this.$store.dispatch("searchData", val)
      }
    }
  }
};
</script>

<style scoped>
.header {
  background: linear-gradient(#0c111b 30%, rgba(255, 255, 255) 400%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 2px;
}

.nav-link {
  display: flex;
  list-style: none;
  gap: 16px;
}

.nav-link a {
  color: whitesmoke;
  text-decoration: none;
}

.left-nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.img-logo {
  display: block;
  width: 70px;
}

.right-nav {
  display: flex;
  gap: 16px;
}

.sub-btn {
  color: whitesmoke;
  background-color: #1f80e0;
  font-weight: 600;
  font-size: 16px;
}

.login-btn {
  color: whitesmoke;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  background-color: transparent;
}

.search-input {
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid white;
  width: 200px;
  transition: all ease-in-out 0.25s;
  font-size: 16px;
  padding: 4px 8px;
  color: whitesmoke;
}

.search-input:focus {
  width: 300px;
}
</style>