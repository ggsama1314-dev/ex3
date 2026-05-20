import { createStore } from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
import product from './modules/product'

export default createStore({
  modules: {
    user,
    cart,
    product
  }
})
