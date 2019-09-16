import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCo4CN1uHb1uQaQuKo5lsOMFZIfLEP7MlQ",
    authDomain: "app-smd.firebaseapp.com",
    databaseURL: "https://app-smd.firebaseio.com",
    projectId: "app-smd",
    messagingSenderId: "971764024469",
    appId: "1:971764024469:web:5f6969bf3798e969"
}

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.firestore = app.firestore();
    }

    /* AUTH */

    signUp = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password)
    }

    signIn = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password)
    }

    signOut = () => {
        this.auth.signOut();
    }

    resetPassword = email => {
        this.auth.sendPasswordResetEmail(email);
    }

    updatePassword = password => {
        this.auth.currentUser.updatePassword(password);
    }

    /* OFFER */

    addLesson = lesson => {

    } 

    addDynamicLesson = lesson => {

    } 

    deleteLesson = lessonId => {

    }

    deleteDynamicLesson = lessonId => {

    }

    getLesson = lessonId => {

    }

    getLessons = () => {

    }

    /* STUDENTS */

    registerStudent = student => {
        this.firestore.collection('students').add(student)
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    } 

    updateStudent = student => {
        this.firestore.collection('students').doc(student.id).set({
            name: student.name,
            code: student.code,
            course: student.course,
            phone: student.phone,
            email: student.email
        })
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    deleteStudent = studentId => {
        this.firestore.collection('students').doc(studentId).delete()
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    getStudent = studentId => {
        this.firestore.collection('students').doc(studentId).get()
        .then((student) => {
            if (student.exists) {
                return student
            } else {
                return null
            }
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    getStudents = () => {
        this.firestore.collection('students').get()
        .then((students) => {
            if (students.exists) {
                return students
            } else {
                return null
            }
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    /* RESOURCES */

    registerResource = resource => {
        this.firestore.collection('resources').add(resource)
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    } 

    updateResource = resource => {
        this.firestore.collection('resources').doc(resource.id).set({
            name: resource.name,
            status: resource.code,
            place: resource.place
        })
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    deleteResource = resourceId => {
        this.firestore.collection('resources').doc(resourceId).delete()
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    getResource = resourceId => {
        this.firestore.collection('resources').doc(resourceId).get()
        .then((resource) => {
            if (resource.exists) {
                return resource
            } else {
                return null
            }
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    getResources = () => {
        this.firestore.collection('resources').get()
        .then((resources) => {
            if (resources.exists) {
                return resources
            } else {
                return null
            }
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    /* KEYS */

    registerKey = key => {
        this.firestore.collection('keys').add(key)
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    } 

    updateKey = key => {
        this.firestore.collection('keys').doc(key.id).set({
            name: key.name,
            status: key.status,
            place: key.place
        })
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    deleteKey = keyId => {
        this.firestore.collection('keys').doc(keyId).delete()
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    getKey = keyId => {
        this.firestore.collection('keys').doc(keyId).get()
        .then((key) => {
            if (key.exists) {
                return key
            } else {
                return null
            }
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    getKeys = () => {
        this.firestore.collection('keys').get()
        .then((keys) => {
            if (keys.exists) {
                return keys
            } else {
                return null
            }
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    /* ROOMS */

    registerRoom = room => {
        this.firestore.collection('rooms').add(room)
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    } 

    updateRoom = room => {
        this.firestore.collection('rooms').doc(room.id).set({
            name: room.name,
            status: room.status
        })
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    deleteRoom = roomId => {
        this.firestore.collection('rooms').doc(roomId).delete()
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    getRoom = roomId => {
        this.firestore.collection('rooms').doc(roomId).get()
        .then((room) => {
            if (room.exists) {
                return room
            } else {
                return null
            }
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    getRooms = () => {
        this.firestore.collection('rooms').get()
        .then((rooms) => {
            if (rooms.exists) {
                return rooms
            } else {
                return null
            }
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    /* PLACES */

    registerPlace = place => {
        this.firestore.collection('places').add(place)
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    } 

    updatePlace = place => {
        this.firestore.collection('places').doc(place.id).set({
            name: place.name
        })
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    deletePlace = placeId => {
        this.firestore.collection('places').doc(placeId).delete()
        .then(() => {
            console.log('Deu Certo')
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    getPlace = placeId => {
        this.firestore.collection('places').doc(placeId).get()
        .then((place) => {
            if (place.exists) {
                return place
            } else {
                return null
            }
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

    getPlaces = () => {
        this.firestore.collection('places').get()
        .then((places) => {
            if (places.exists) {
                return places
            } else {
                return null
            }
        })
        //Não deu certo
        .catch(() => {
            console.log('Deu Errado')
        });
    }

}

export default Firebase;

