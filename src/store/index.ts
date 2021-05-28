import Vue from "vue";
import Vuex from "vuex";

import * as LoanService from "@/api/LoanService";
import ApiResult from "@/api/ApiResult";
import { Constraints, State, Offer } from "@/types/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    constraints: null,
    offer: null,
    amountOptions: [],
    termOptions: [],
  } as State,
  mutations: {
    saveConstraints(state, constraints: Constraints) {
      state.constraints = Object.assign({}, constraints);
    },
    saveCurrentOffer(state, offer: Offer) {
      state.offer = Object.assign({}, offer);
    },
    prepareOptions(state, constraints: Constraints) {
      const termOptions = [];
      const amountOptions = [];

      const { amountInterval, termInterval } = constraints;
      for (
        let i = amountInterval.min;
        i <= amountInterval.max;
        i += amountInterval.step
      ) {
        amountOptions.push(i);
      }
      for (
        let i = termInterval.min;
        i <= termInterval.max;
        i += termInterval.step
      ) {
        termOptions.push(i);
      }

      state.termOptions = termOptions;
      state.amountOptions = amountOptions;
    },
  },
  actions: {
    async loadConstraints({ commit }) {
      const result: ApiResult = await LoanService.loadConstraints();
      const { data }: { data: Constraints } = result;

      commit("saveConstraints", data);
      commit("prepareOptions", data);
    },
    async loadOffer({ commit }, payload: { amount: number; term: number }) {
      const result: ApiResult = await LoanService.realFirstLoanOffer(payload);
      const { data }: { data: Constraints } = result;

      commit("saveCurrentOffer", data);
    },
  },
  getters: {
    termInterval(state) {
      return state.constraints?.termInterval ?? {};
    },
    amountInterval(state) {
      return state.constraints?.amountInterval ?? {};
    },
    offer(state) {
      return state.offer;
    },
    options(state) {
      return {
        termOptions: state.termOptions,
        amountOptions: state.amountOptions,
      };
    },
  },
  modules: {},
});
