import Vue from "vue";
import Vuex from "vuex";

import * as LoanService from '@/api/LoanService';
import ApiResult from "@/api/ApiResult";
import {Constraints} from "@/types/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      constraints: {}
  },
  mutations: {
      saveConstraints(state, constraints:Constraints) {
          state.constraints = constraints;
      }
  },
  actions: {
      async loadConstraints({commit}) {
          const result:ApiResult = await  LoanService.loadConstraints();
          const { data }: {data: Constraints} = result;

          commit('saveConstraints', data);
      },
      async loadOffer({commit}, payload: {amount: number; term:number}) {
          const result:ApiResult = await  LoanService.realFirstLoanOffer(payload);
          const { data }: {data: Constraints} = result;

          commit('saveCurrentOffer', data);
      }
  },
  getters: {
    constraints(state) {
        return state.constraints;
    }
  },
  modules: {},
});
