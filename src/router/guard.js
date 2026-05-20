import store from '../store'

export function setupGuards(router) {
  router.beforeEach((to, from, next) => {
    // Check if route requires auth
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // Check vuex store for token
      // if (!store.state.user.token) {
      //   // Redirect to login page
      //   next({
      //     path: '/login',
      //     query: { redirect: to.fullPath }
      //   })
      // } else {
      //   next()
      // }
      next() // Bypass login verification temporarily
    } else {
      next()
    }
  })
}
