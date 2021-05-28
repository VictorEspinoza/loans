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
    pastOffers: {},
  } as State,
  mutations: {
    saveConstraints(state, constraints: Constraints) {
      state.constraints = Object.assign({}, constraints);
    },
    saveCurrentOffer(state, offer: Offer) {
      state.offer = Object.assign({}, offer);
    },
    saveHistoryOffer(
      state,
      {
        params,
        offer,
      }: { params: { amount: number; term: number }; offer: Offer }
    ) {
      const { amount, term } = params;
      const key = `${amount}-${term}`;
      state.pastOffers[key] = Object.assign({}, offer);
    },
    prepareOptions(state, constraints: Constraints) {
      const calculateOptions = (
        minimalValue: number,
        maximalValue: number,
        step: number
      ) => {
        const options: number[] = [];

        for (let i = minimalValue; i <= maximalValue; i += step) {
          options.push(i);
        }

        return options;
      };

      const { amountInterval, termInterval } = constraints;

      state.termOptions = calculateOptions(
        termInterval.min,
        termInterval.max,
        termInterval.step
      );
      state.amountOptions = calculateOptions(
        amountInterval.min,
        amountInterval.max,
        amountInterval.step
      );
    },
  },
  actions: {
    async loadConstraints({ commit }) {
      const result: ApiResult = await LoanService.loadConstraints();
      const { data }: { data: Constraints } = result;

      commit("saveConstraints", data);
      commit("prepareOptions", data);
    },
    async loadOffer(
      { commit, state },
      payload: { amount: number; term: number }
    ) {
      //checking history offers
      const { amount, term } = payload;
      const key = `${amount}-${term}`;
      if (state.pastOffers[key]) {
        commit("saveCurrentOffer", state.pastOffers[key]);
      } else {
        const result: ApiResult = await LoanService.realFirstLoanOffer(payload);
        const { data }: { data: Constraints } = result;

        commit("saveCurrentOffer", data);
        commit("saveHistoryOffer", { params: payload, offer: data });
      }
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
