// LocalStorage yardımcı fonksiyonları

// State'i localStorage'a kaydet
export const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('State localStorage\'a kaydedilemedi:', error);
  }
};

// State'i localStorage'dan yükle
export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('State localStorage\'dan yüklenemedi:', error);
    return undefined;
  }
};

// State'i localStorage'dan sil
export const removeState = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('State localStorage\'dan silinemedi:', error);
  }
}; 