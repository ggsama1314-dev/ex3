export default {
  namespaced: true,
  state: () => ({
    items: [] // { id, name, price, stock, image, quantity, selected }
  }),
  getters: {
    totalCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    selectedCount: (state) => {
      return state.items.filter(i => i.selected).reduce((total, item) => total + item.quantity, 0)
    },
    totalPrice: (state) => {
      return state.items.filter(i => i.selected).reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    isAllSelected: (state) => {
      return state.items.length > 0 && state.items.every(i => i.selected)
    }
  },
  mutations: {
    ADD_ITEM(state, product) {
      const existingItem = state.items.find(i => i.id === product.id)
      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity += 1
        }
      } else {
        state.items.push({
          ...product,
          quantity: 1,
          selected: true
        })
      }
    },
    UPDATE_QUANTITY(state, { id, quantity }) {
      const item = state.items.find(i => i.id === id)
      if (item) {
        item.quantity = quantity
      }
    },
    TOGGLE_SELECT(state, { id, selected }) {
      const item = state.items.find(i => i.id === id)
      if (item) {
        item.selected = selected
      }
    },
    TOGGLE_ALL(state, selected) {
      state.items.forEach(item => {
        item.selected = selected
      })
    },
    REMOVE_ITEM(state, id) {
      state.items = state.items.filter(i => i.id !== id)
    },
    CLEAR_SELECTED(state) {
      state.items = state.items.filter(i => !i.selected)
    }
  },
  actions: {}
}
