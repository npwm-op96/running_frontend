import RuningService from '../services/runing.service';
const draft = JSON.parse(localStorage.getItem('draft'));
export const running = {
  namespaced: true,
  state: draft,
  actions: {
    savedraft({ commit }, draft) {
        return RuningService.save_draft(draft).then(
            draft => {
            commit('draft', draft);
            return Promise.resolve(draft);
          },
        );
      },
    register({ commit },draft) {
      console.log(draft)
      return RuningService.register_running(draft).then(
        response => {
          commit('draft', draft);
          return Promise.resolve(response.data);
        },
      );
    }
  },
  mutations: {
    draft() {
    },

  }
};