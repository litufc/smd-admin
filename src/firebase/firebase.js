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
    
    this.firebase = app
    this.auth = app.auth();
    this.firestore = app.firestore();
    this.firestore.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // Snackbar erro de múltiplas abas
        } else if (err.code == 'unimplemented') {
            // Snackbar erro de browser
        }
    });
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

  /* ADMIN */

  getAdmin = () => this.firestore.collection('admins').doc(this.auth.currentUser.uid)

  //Checar se é admin ou supervisor/usuário
  checkAdmin = () => {}

  /* OFFER */

  addLesson = lesson => this.firestore.collection('lessons').add(lesson)

  addDynamicLesson = lesson => this.firestore.collection('dynamicLessons').add(lesson)

  deleteLesson = lessonId => this.firestore.collection('lessons').doc(lessonId).delete()

  deleteDynamicLesson = lessonId => this.firestore.collection('dynamicLessons').doc(lessonId).delete()

  updateLesson = lesson => 
    this.firestore.collection('lessons').doc(lesson.id).update({
      name: lesson.name,
      lessonCode: lesson.lessonCode,
      startTime: lesson.startTime,
      endTime: lesson.endTime,
      teacher: lesson.teacher,
      day: lesson.day,
      room: lesson.room
    })

  updateDynamicLesson = lesson => 
    this.firestore.collection('dynamicLessons').doc(lesson.id).update({
      name: lesson.name,
      lessonCode: lesson.lessonCode,
      startTime: lesson.startTime,
      endTime: lesson.endTime,
      teacher: lesson.teacher,
      specificDay: lesson.specificDay,
      room: lesson.room
    })

  getLesson = lessonId => this.firestore.collection('lessons').doc(lessonId)

  getDynamicLesson = lessonId => this.firestore.collection('dynamicLessons').doc(lessonId)

  getLessons = () => this.firestore.collection('lessons').orderBy("startTime")

  getDynamicLessons = () => this.firestore.collection('dynamicLessons').orderBy("startTime")

  /* LOAN */

  addKeyLoan = loan => this.firestore.collection('keyLoans').add(loan)

  addResourceLoan = loan => this.firestore.collection('resourceLoans').add(loan)

  updateKeyLoan = (loanId, now) => this.firestore.collection('keyLoans').doc(loanId).update({
    devolutionTime: now
  })

  updateResourceLoan = (loanId, now) => this.firestore.collection('resourceLoans').doc(loanId).update({
    devolutionTime: now
  })

  getKeyLoans = () => this.firestore.collection('keyLoans').orderBy("timestamp", "desc")
  
  getResourceLoans = () => this.firestore.collection('resourceLoans').orderBy("timestamp", "desc")

 
  /* LOAN REQUESTS */

  deleteKeyRequest = (requestId, place)  => this.firestore.collection(place+'KeyRequests').doc(requestId).delete()

  deleteResourceRequest = (requestId, place)  => this.firestore.collection(place+'ResourceRequests').doc(requestId).delete()

  getKeyRequest = (requestId, place)  => this.firestore.collection(place+'KeyRequests').doc(requestId)

  getResourceRequest = (requestId, place)  => this.firestore.collection(place+'ResourceRequests').doc(requestId)

  getKeyRequests = place => this.firestore.collection(place+'KeyRequests').orderBy("timestamp", "desc")

  getResourceRequests = place => this.firestore.collection(place+'ResourceRequests').orderBy("timestamp", "desc")

  /* USERS */

  registerUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

  addUser = (userId, user) => this.firestore.collection('users').doc(userId).set(user)

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

  getUsers = () => this.firestore.collection('users').orderBy("name")

  /* RESOURCES */

  addResource = resource => this.firestore.collection('resources').add(resource)

  updateResource = resource =>
    this.firestore.collection('resources').doc(resource.id).set({
        name: resource.name,
        place: resource.place,
        status: resource.status,
        user: resource.user,
        userId: resource.userId,
        loanId: resource.loanId
    })

  updateResourceWithOutUser = resource =>
    this.firestore.collection('resources').doc(resource.id).update({
      name: resource.name,
      place: resource.place,
      status: resource.status
    })
  
  updateResourceDeletingUser = resourceId =>
    this.firestore.collection('resources').doc(resourceId).update({
      status: true,
      user: this.firebase.firestore.FieldValue.delete(),
      userId: this.firebase.firestore.FieldValue.delete(),
      loanId: this.firebase.firestore.FieldValue.delete()
    })

  deleteResource = resourceId => this.firestore.collection('resources').doc(resourceId).delete()

  getResource = resourceId => this.firestore.collection('resources').doc(resourceId)

  getResources = () => this.firestore.collection('resources').orderBy("name")

  /* KEYS */

  addKey = key => this.firestore.collection('keys').add(key) 

  updateKey = key => 
    this.firestore.collection('keys').doc(key.id).set({
      name: key.name,
      place: key.place,
      status: key.status,
      user: key.user,
      userId: key.userId,
      loanId: key.loanId
    })

  updateKeyWithOutUser = key =>
    this.firestore.collection('keys').doc(key.id).update({
      name: key.name,
      place: key.place,
      status: key.status
    })

  updateKeyDeletingUser = keyId =>
    this.firestore.collection('keys').doc(keyId).update({
      status: true,
      user: this.firebase.firestore.FieldValue.delete(),
      userId: this.firebase.firestore.FieldValue.delete(),
      loanId: this.firebase.firestore.FieldValue.delete()
    })

  deleteKey = keyId => this.firestore.collection('keys').doc(keyId).delete()

  getKey = keyId => this.firestore.collection('keys').doc(keyId)

  getKeys = () => this.firestore.collection('keys').orderBy("name")

  /* ROOMS */

  addRoom = room => this.firestore.collection('rooms').add(room)

  updateRoom = room => 
    this.firestore.collection('rooms').doc(room.id).update({
        name: room.name,
        status: room.status
    })

  deleteRoom = roomId => this.firestore.collection('rooms').doc(roomId).delete()

  getRoom = roomId => this.firestore.collection('rooms').doc(roomId)

  getRooms = () => this.firestore.collection('rooms').orderBy("name")

  /* PLACES */

  addPlace = place => this.firestore.collection('places').add(place)

  updatePlace = place =>
    this.firestore.collection('places').doc(place.id).update({
        name: place.name
    })

  deletePlace = placeId => this.firestore.collection('places').doc(placeId).delete()

  getPlace = placeId => this.firestore.collection('places').doc(placeId)

  getPlaces = () => this.firestore.collection('places').orderBy("name")
}

export default Firebase;