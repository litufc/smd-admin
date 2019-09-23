import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCo4CN1uHb1uQaQuKo5lsOMFZIfLEP7MlQ",
  authDomain: "app-smd.firebaseapp.com",
  databaseURL: "https://app-smd.firebaseio.com",
  projectId: "app-smd",
  storageBucket: "971764024469",
  messagingSenderId: "1:971764024469:web:5f6969bf3798e969",
}

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.firestore = app.firestore();
  }

  signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

  signOut = () => this.auth.signOut()

  resetPassword = email => this.auth.sendPasswordResetEmail(email)

  isLogged = () => {
      this.auth.onAuthStateChanged(user => {
          if(user) {
              return true
          } else {
              return false
          }
      })
  }

  /* OFFER */

  addLesson = lesson => {} 

  addDynamicLesson = lesson => {} 

  deleteLesson = lessonId => {}

  deleteDynamicLesson = lessonId => {}

  getLesson = lessonId => {}

  getLessons = () => {}

  /* USERS */

  registerUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

  addUser = (userId, student) => this.firestore.collection('users').doc(userId).set(student)

  updateUser = user => 
    this.firestore.collection('users').doc(user.id).update({
        name: user.name,
        code: user.code,
        course: user.course,
        phone: user.phone,
        email: user.email,
        role: user.role
    })

  deleteUser = userId => this.firestore.collection('users').doc(userId).delete()

  getUser = userId => this.firestore.collection('users').doc(userId)

  getUsers = () => this.firestore.collection('users')

  /* RESOURCES */

  addResource = resource => this.firestore.collection('resources').add(resource)

  updateResource = resource =>
    this.firestore.collection('resources').doc(resource.id).update({
        name: resource.name,
        place: resource.place
    })

  deleteResource = resourceId => this.firestore.collection('resources').doc(resourceId).delete()

  getResource = resourceId => this.firestore.collection('resources').doc(resourceId)

  getResources = () => this.firestore.collection('resources')

  /* KEYS */

  addKey = key => this.firestore.collection('keys').add(key) 

  updateKey = key =>
    this.firestore.collection('keys').doc(key.id).update({
        name: key.name,
        place: key.place
    })

  deleteKey = keyId => this.firestore.collection('keys').doc(keyId).delete()

  getKey = keyId => this.firestore.collection('keys').doc(keyId)

  getKeys = () => this.firestore.collection('keys')

  /* ROOMS */

  addRoom = room => this.firestore.collection('rooms').add(room)

  updateRoom = room => 
    this.firestore.collection('rooms').doc(room.id).update({
        name: room.name
    })

  deleteRoom = roomId => this.firestore.collection('rooms').doc(roomId).delete()

  getRoom = roomId => this.firestore.collection('rooms').doc(roomId)

  getRooms = () => this.firestore.collection('rooms')

  /* PLACES */

  addPlace = place => this.firestore.collection('places').add(place)

  updatePlace = place =>
    this.firestore.collection('places').doc(place.id).update({
        name: place.name
    })

  deletePlace = placeId => this.firestore.collection('places').doc(placeId).delete()

  getPlace = placeId => this.firestore.collection('places').doc(placeId)

  getPlaces = () => this.firestore.collection('places')
}

export default Firebase;