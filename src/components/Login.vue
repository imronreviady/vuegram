<template>
	<div id="login">
		<section>
			<div class="col1">
				<h1>Vuegram</h1>
				<p>Welcome to the <a href="#" target="_blank">Vuegram</a> sample social media web app powered by Vue.js and Firebase.</p>
			</div>
			<div class="col2">
				<form @submit.prevent>
                    <h1>Welcome Back</h1>

                    <label for="email1">Email</label>
                    <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />

                    <label for="password1">Password</label>
                    <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />

                    <button @click="login" class="button">Log In</button>

                    <div class="extras">
                        <a>Forgot Password</a>
                        <a>Create an Account</a>
                    </div>
                </form>
                <form @submit.prevent>
                	<h1>Get Started</h1>

                	<label for="name">Name</label>
                	<input v-model.trim="signupForm.name" type="text" placeholder="Vuegram" id="name" />

                	<label for="title">Title</label>
                	<input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />

                	<label for="email2">Email</label>
                	<input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />

                	<label for="password2">Password</label>
                	<input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />

                	<button @click="signup" class="button">Sign Up</button>

                	<div class="extras">
                		<a>Back to Log In</a>
                	</div>
                </form>
			</div>
		</section>
	</div>
</template>

<script>
	const fb = require('../firebaseConfig.js')

	export default {
		data() {
			return {
				loginForm: {
					email: '',
					password: ''
				},
				signupForm: {
					name: '',
					title: '',
					email: '',
					password: ''
				}
			}
		},
		methods: {
			login() {
				fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
					this.$store.commit('setCurrentUser', user)
					this.$store.dispatch('fetchUserProfile')
					this.$router.push('/dashboard')
				}).catch(err => {
					console.log(err)
				})
			},
			signup() {
				fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
					this.$store.commit('setCurrentUser', user)

					// create user obj
					fb.usersCollection.doc(user.uid).set({
						name: this.signupForm.name,
						title: this.signupForm.title
					}).then(() => {
						this.$store.dispatch('fetchUserProfile')
						this.$router.push('/dashboard')
					}).catch(err => {
						console.log(err)
					})
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>