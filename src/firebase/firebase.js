import app from 'firebase/app';
import 'firebase/auth';

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
  }

  signUp = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

  signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

  signOut = () => this.auth.signOut()

  resetPassword = email => this.auth.sendPasswordResetEmail(email)

  updatePassword = password => this.auth.currentUser.updatePassword(password)

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

  /* STUDENTS */

  registerStudent = student => this.firestore.collection('students').add(student)

  updateStudent = student => 
      this.firestore.collection('students').doc(student.id).set({
          name: student.name,
          code: student.code,
          course: student.course,
          phone: student.phone,
          email: student.email
      })

  deleteStudent = studentId => this.firestore.collection('students').doc(studentId).delete()

  getStudent = studentId => this.firestore.collection('students').doc(studentId).get()

  getStudents = () => this.firestore.collection('students').get()

  /* RESOURCES */

  registerResource = resource => this.firestore.collection('resources').add(resource)

  updateResource = resource =>
      this.firestore.collection('resources').doc(resource.id).set({
          name: resource.name,
          status: resource.code,
          place: resource.place
      })

  deleteResource = resourceId => this.firestore.collection('resources').doc(resourceId).delete()

  getResource = resourceId => this.firestore.collection('resources').doc(resourceId).get()

  getResources = () => this.firestore.collection('resources').get()

  /* KEYS */

  registerKey = key => this.firestore.collection('keys').add(key) 

  updateKey = key =>
      this.firestore.collection('keys').doc(key.id).set({
          name: key.name,
          status: key.status,
          place: key.place
      })

  deleteKey = keyId => this.firestore.collection('keys').doc(keyId).delete()

  getKey = keyId => this.firestore.collection('keys').doc(keyId).get()

  getKeys = () => this.firestore.collection('keys').get()

  /* ROOMS */

  registerRoom = room => this.firestore.collection('rooms').add(room)

  updateRoom = room => 
      this.firestore.collection('rooms').doc(room.id).set({
          name: room.name,
          status: room.status
      })

  deleteRoom = roomId => this.firestore.collection('rooms').doc(roomId).delete()

  getRoom = roomId => this.firestore.collection('rooms').doc(roomId).get()

  getRooms = () => this.firestore.collection('rooms').get()

  /* PLACES */

  registerPlace = place => this.firestore.collection('places').add(place)

  updatePlace = place =>
      this.firestore.collection('places').doc(place.id).set({
          name: place.name
      })

  deletePlace = placeId => this.firestore.collection('places').doc(placeId).delete()

  getPlace = placeId => this.firestore.collection('places').doc(placeId).get()

  getPlaces = () => this.firestore.collection('places').get()
}

export default Firebase;