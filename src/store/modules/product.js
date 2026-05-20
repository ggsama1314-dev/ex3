export default {
  namespaced: true,
  state: () => ({
    recommendedProducts: [],
    banners: []
  }),
  mutations: {
    SET_RECOMMENDED(state, payload) {
      state.recommendedProducts = payload
    },
    SET_BANNERS(state, payload) {
      state.banners = payload
    }
  },
  actions: {
    fetchHomeData({ commit }) {
      // Mock Data
      const mockBanners = [
        { image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop', title: '夏季狂欢购', subtitle: '全场满300减50' },
        { image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop', title: '潮鞋首发', subtitle: '限量尖货 抢先体验' },
        { image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop', title: '智能数码专场', subtitle: '新品直降，享24期免息' }
      ]
      
      const mockProducts = [
        { id: '1', name: 'Sony 降噪耳机 WH-1000XM5', description: '旗舰级主动降噪，30小时超长续航，AI智能音频通话体验。', price: 2499.00, stock: 50, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop' },
        { id: '2', name: 'Apple MacBook Pro M3', description: '强悍的 M3 芯片，惊艳的 Liquid 视网膜 XDR 显示屏。', price: 12999.00, stock: 5, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop' },
        { id: '3', name: 'Bose SoundLink Flex', description: '防水防尘便携式蓝牙音箱，震撼音效伴你随行。', price: 1399.00, stock: 0, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop' },
        { id: '4', name: 'Herman Miller 办公椅', description: '人体工学设计，提供全天候的舒适背部支撑。', price: 9800.00, stock: 20, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&auto=format&fit=crop' },
        { id: '5', name: 'DJI Mini 3 Pro', description: '不到 249g 的超轻便设计，支持 4K HDR 视频拍摄。', price: 4788.00, stock: 8, image: 'https://images.unsplash.com/photo-1579820010410-c10411aaaa88?w=500&auto=format&fit=crop' },
        { id: '6', name: '徕卡 Q3 数码相机', description: '配备 6000 万像素全画幅传感器与微距模式，影像艺术巅峰。', price: 48500.00, stock: 2, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop' },
      ]
      
      commit('SET_BANNERS', mockBanners)
      commit('SET_RECOMMENDED', mockProducts)
    }
  }
}
