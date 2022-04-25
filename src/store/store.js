import { applyMiddleware, compose, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","authReducer"], //only user and tenant will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(promiseMiddleware, thunk)
  )
);

export const persistor = persistStore(store);
