import firebase from "firebase";
export default {
  namespaced: true,

  state: {
    authId: null,
    unsubscribeAuthObserver: null
  },

  getters: {
    authUser(state: any, getters: any, rootState: any) {
      return state.authId ? rootState.users.items[state.authId] : null;
    }
  },

  actions: {
    initAuthentication({ dispatch, commit, state }: any) {
      return new Promise((resolve, reject) => {
        // unsubscribe observer if already listening
        if (state.unsubscribeAuthObserver) {
          state.unsubscribeAuthObserver();
        }

        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          console.log("👣 the user has changed");
          if (user) {
            dispatch("fetchAuthUser").then((dbUser: any) => resolve(dbUser));
          } else {
            resolve(null);
          }
        });
        commit("setUnsubscribeAuthObserver", unsubscribe);
      });
    },

    registerUserWithEmailAndPassword(
      { dispatch }: any,
      { email, name, username, password, avatar = null }: any
    ) {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(data => {
          const user: any = data.user;
          return dispatch(
            "users/createUser",
            { id: user.uid, email, name, username, password, avatar },
            { root: true }
          );
        })
        .then(() => dispatch("fetchAuthUser"));
    },

    signInWithEmailAndPassword(context: any, { email, password }: any) {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    },

    signInWithGoogle({ dispatch }: any) {
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase
        .auth()
        .signInWithPopup(provider)
        .then(data => {
          const user: any = data.user;
          firebase
            .database()
            .ref("users")
            .child(user.uid)
            .once("value", snapshot => {
              if (!snapshot.exists()) {
                return dispatch(
                  "users/createUser",
                  {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    username: user.email,
                    avatar: user.photoURL
                  },
                  { root: true }
                ).then(() => dispatch("fetchAuthUser"));
              }
            });
        });
    },

    signOut({ commit }: any) {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setAuthId", null);
        });
    },

    fetchAuthUser({ dispatch, commit }: any) {
      const userId = firebase.auth().currentUser!.uid;
      return new Promise((resolve, reject) => {
        // check if user exists in the database
        firebase
          .database()
          .ref("users")
          .child(userId)
          .once("value", snapshot => {
            if (snapshot.exists()) {
              return dispatch(
                "users/fetchUser",
                { id: userId },
                { root: true }
              ).then((user: any) => {
                commit("setAuthId", userId);
                resolve(user);
              });
            } else {
              resolve(null);
            }
          });
      });
    }
  },

  mutations: {
    setAuthId(state: any, id: any) {
      state.authId = id;
    },

    setUnsubscribeAuthObserver(state: any, unsubscribe: any) {
      state.unsubscribeAuthObserver = unsubscribe;
    }
  }
};
