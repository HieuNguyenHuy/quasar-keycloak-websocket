import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false
    }
  },
  mutations: {
    SOCKET_ONOPEN (state, event) {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
      console.log('SOCKET_ONOPEN')
    },
    SOCKET_ONCLOSE (state, event) {
      state.socket.isConnected = false
      console.log('SOCKET_ONCLOSE')
    },
    SOCKET_ONERROR (state, event) {
      console.log('SOCKET_ONERROR')
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message) {
      state.socket.message = message
      console.log('SOCKET_ONMESSAGE', message)
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT (state, count) {
      console.info(state, count)
      console.log('SOCKET_RECONNECT')
    },
    SOCKET_RECONNECT_ERROR (state) {
      state.socket.reconnectError = true
      console.log('SOCKET_RECONNECT_ERROR')
    }
  },
  actions: {
    sendMessage: function (context, message) {
      Vue.prototype.$socket.send(message)
    }
  }
})
