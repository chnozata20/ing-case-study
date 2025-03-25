export const connect = (store) => (superClass) => {
  return class extends superClass {
    constructor() {
      super();
      this._storeUnsubscribe = store.subscribe(() => {
        this.stateChanged(store.getState());
      });
      // İlk state'i al
      this.stateChanged(store.getState());
    }

    disconnectedCallback() {
      if (this._storeUnsubscribe) {
        this._storeUnsubscribe();
      }
      super.disconnectedCallback();
    }

    stateChanged(state) {
      // Alt sınıflar bu metodu override edebilir
    }
  };
}; 