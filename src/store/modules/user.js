export default {
  namespaced: true,
  state: () => ({
    userInfo: {
      name: '体验用户',
      avatar: '😎'
    },
    token: 'mock-token-for-dev',
    addresses: [
      { id: '1', name: '张三', phone: '13800138000', province: '广东省', city: '广州市', district: '天河区', detail: '珠江新城某某大厦101室', isDefault: true },
      { id: '2', name: '李四', phone: '13900139000', province: '北京市', city: '北京市', district: '朝阳区', detail: '国贸三期999室', isDefault: false }
    ]
  }),
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    },
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    REMOVE_ADDRESS(state, id) {
      state.addresses = state.addresses.filter(a => a.id !== id)
    },
    SET_DEFAULT_ADDRESS(state, id) {
      state.addresses.forEach(a => {
        a.isDefault = a.id === id
      })
    }
  },
  actions: {
    // TODO: login action
  }
}
