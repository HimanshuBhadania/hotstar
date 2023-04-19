<template>
  <div class="wrapper relative">
    <div class="bgimg"><img src="../assets/bgimg.webp" /></div>
    <div class="login">
      <main class="logo">
        <img src="../assets/logo.png" />
      </main>
      <h1>Welcome to Hotstar!</h1>
      <div>
        <label for="email">Email</label>
        <input type="email" placeholder="Email" id="email" v-model="email" />
      </div>
      <div>
        <label for="Password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="Password"
          v-model="password"
        />
      </div>
      <div class="btns">
        <button @click="AuthHandle" class="login-btn">LOGIN</button>
        <div class="or">or</div>
        <button @click="AuthHandle" class="sign-btn">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "@/data/fireBase.config";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async AuthHandle(e) {
      if (this.email == "" || this.password == "") return;
      if (e.target.innerText === "LOGIN") {
        try {
          await signInWithEmailAndPassword(
            firebaseAuth,
            this.email,
            this.password
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await createUserWithEmailAndPassword(
            firebaseAuth,
            this.email,
            this.password
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  mounted() {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) this.$router.push("/");
    });
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999;
}
.wrapper .bgimg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
  filter: brightness(40%);
}

.bgimg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.logo {
  width: 120px;
  margin: 0 auto;
}
.logo img {
  width: 100%;
  height: 100%;
  margin: 0;
}
.login {
  position: relative;
  padding: 10px 40px;
  background: black linear-gradient(black, rgba(255, 255, 255, 0.8) 600%);
  border-radius: 24px;
}
.login h1 {
  color: whitesmoke;
  text-align: center;
  margin-top: -20px;
}
.login > div {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

label {
  color: whitesmoke;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 16px;
}

input {
  height: 52px;
  width: 450px;
  border-radius: 8px;
  padding: 0 20px;
  font-size: 20px;
  outline: none;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: whitesmoke;
}
input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.btns {
  padding: 20px 0 40px 0;
  gap: 24px;
}
button {
  height: 52px;
  font-weight: 600;
  font-size: 18px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.login-btn {
  background: #a00;
  color: white;
}
.sign-btn {
  color: white;
  background-color: #1f80e0;
}

.login-btn:hover {
  background-image: linear-gradient(#a00, rgba(255, 255, 255, 0.8) 200%);
}
.sign-btn:hover {
  background-image: linear-gradient(#1f80e0, rgba(255, 255, 255, 0.8) 200%);
}
.or {
  color: whitesmoke;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  position: relative;
}
.or::after,
.or::before {
  position: absolute;
  content: "";
  height: 2px;
  background: white;
  width: 42%;
  top: 50%;
  transform: translateY(-50%);
}
.or::after {
  left: 0;
}
.or::before {
  right: 0;
}
</style>