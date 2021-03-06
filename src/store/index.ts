/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import { Place } from '@/models/place';
import { App } from '@/models/appState';
import mapModule from './mapModule';
import searchModule from './searchModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appState: App.loading,
    drawer: false,
    offline: false,
    installable: false,
    deferredPrompt: null,
  },
  getters: {
    isLoading: (state) => state.appState == App.loading,
    isLoaded: (state) => state.appState == App.loaded,
    isOffline: (state) => state.appState == App.offline,
  },
  mutations: {
    SET_DRAWER(context, value: boolean) {
      context.drawer = value;
    },
    SET_APP_STATE(context, value: App) {
      context.appState = value;
    },
    SET_DEFERRED_PROMPT(context, value: any) {
      context.deferredPrompt = value;
    },
    SET_INSTALLABLE(context, value: boolean) {
      context.installable = value;
    },
    SET_OFFLINE(state, value: boolean) {
      state.offline = value;
    },
  },
  actions: {
    openDrawer(context) {
      context.commit('SET_DRAWER', true);
    },
    removeHighLight(context) {
      context.commit('REMOVE_HIGHLIGHT');
    },
    highLightPlace({ commit, dispatch }, place: Place) {
      dispatch('closeSearch');
      commit('HIGHLIGHT_PLACE', place);
      // router.push(`/place/${place.properties.id}`);
    },
    setDeferredPrompt(context, deferredPrompt: Event) {
      context.commit('SET_DEFERRED_PROMPT', deferredPrompt);
    },
    showInstall(context) {
      context.commit('SET_INSTALLABLE', true);
    },
    installPWA({ state, commit }) {
      if (state.deferredPrompt) {
        (state.deferredPrompt as any).prompt();
        // Wait for the user to respond to the prompt
        (state.deferredPrompt as any).userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
            commit('SET_INSTALLABLE', false);
          } else {
            console.log('User dismissed the install prompt');
          }
        });
      }
    },
  },
  modules: {
    map: mapModule,
    search: searchModule,
  },
});
