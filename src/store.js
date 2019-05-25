import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
/* eslint-disable no-new */
Vue.use(Vuex);
Vue.use(axios);

export const store = new Vuex.Store({
    state: {
        comments: [],
        currentSession: '',
        test: "hello Wold"
    },
    getters: {
        getTest: (state) => {
            return state.test;
        },
        getComments: (state) => {
            return state.comments;
        }
    },
    mutations: {
        setComments: (state, comments) => {
            state.comments = comments;
        },
        unshiftComment : (state , comment)=>{
            state.comment.unshift(comment);
        }
    },
    actions: {
        GET_COMMENTS_BY_POOLEVENT_ID: ({ commit }, id) => {
            axios
                .get("http://localhost/api/comment/" + id)
                .then(resp => {
                    commit('setComments', resp.data.data.comments);
                })
                .catch(err => {
                    return err.message;
                });
        },
        POST_COMMENT: ({ commit }, comment) => {
            axios.post("http://localhost/api/comment", comment)
                .then(resp => {
                    commit('unshiftComment', resp.data.data);
                })
                .catch(err => {

                });
        },




    }
})

