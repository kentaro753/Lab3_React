import { createContext, useContext, useMemo, useReducer } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

firestore().settings({
  cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
});

const MyContext = createContext();
MyContext.displayName = "My store";
//Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userLogin: action.value };
    case "LOGOUT": {
      return { ...state, userLogin: null };
    }
    default: {
      throw new Error("Action ko tồn tại");
    }
  }
};
//My context
const MyContextControllerProvider = ({ children }) => {
  const initialState = {
    userLogin: null,
  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch]);
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
const useMyContextProvider = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useMyContextController phai dat trong MyContextControllerProvider"
    );
  }
  return context;
};

//Tham chieu collections
const USERS = firestore().collection("USERS");
const createAccount = (email, password, fullName, phone, role) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert("Tao tai khoan thanh cong voi email: " + email);
      USERS.doc(email).set({
        email,
        password,
        fullName,
        phone,
        role,
      });
    })
    .catch((e) => console.log(e.message));
};
//Dinh nghia action
const login = (dispatch, email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      USERS.doc(email).onSnapshot((u) => {
        if (u.exists) {
          console.log("Dang nhap thanh cong voi : " + u.id);
          dispatch({ type: "USER_LOGIN", value: u.data() });
        }
      });
    })
    .catch((e) => Alert.alert("Sai tai khoan hoac mat khau!"));
};
const logout = (dispatch) => {
  auth()
    .signOut()
    .then(() => dispatch({ type: "LOGOUT" }));
};

export {
  MyContextControllerProvider,
  useMyContextProvider,
  login,
  logout,
  createAccount,
};
