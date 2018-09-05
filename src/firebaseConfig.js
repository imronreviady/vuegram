import firebase from 'firebase'
import 'firebase/firestore'

// firebase init
var config = {
	apiKey: "AIzaSyACmOOdmSsa0i4e96Z_8xRRwKgf2cz-7kM",
	authDomain: "vuegram-d415c.firebaseapp.com",
	databaseURL: "https://vuegram-d415c.firebaseio.com",
	projectId: "vuegram-d415c",
	storageBucket: "vuegram-d415c.appspot.com",
	messagingSenderId: "227649207574"
};
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// data issue fix according the firebase
const settings = {
	timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollections = db.collection('users')
const postsCollections = db.collection('posts')
const commentsCollections = db.collection('comments')
const likeCollections = db.collection('likes')

export {
	db,
	auth,
	currentUser,
	usersCollections,
	postsCollections,
	commentsCollections,
	likeCollections
}