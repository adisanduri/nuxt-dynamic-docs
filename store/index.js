//import Vuex from 'vuex';

//     getters: {
// new Vuex.Store({
//
//     state: {
//         navigation: [
//             {
//                 "key" : "meser",
//                 "value" : {
//                     "id": "1",
//                     "title": "main",
//                     "route": "/meser/index",
//                     "children":
//                         [
//                             {
//                                 "id": "1.1",
//                                 "title": "installs",
//                                 "route": "/meser/installs/install",
//                                 "children": [
//                                     {
//                                         "id": "1.1.1",
//                                         "title": "fedora",
//                                         "route": "/meser/installs/fedora",
//                                     },
//                                     {
//                                         "id": "1.1.2",
//                                         "title": "chrome",
//                                         "route": "/meser/installs/chrome",
//                                     }
//                                 ]
//                             },
//                             {
//                                 "id": "1.2",
//                                 "title": "scripts",
//                                 "route": "/meser/scripts/script",
//                                 "children": [
//                                     {
//                                         "id": "1.2.1",
//                                         "title": "linux",
//                                         "route": "/meser/scripts/linux/ntpdate",
//                                         "children" : [
//                                             {
//                                                 "id": "1.2.1.1",
//                                                 "title": "try",
//                                                 "route": "/meser/scripts/linux/try/sub2",
//                                             },{
//                                                 "id": "1.2.1.2",
//                                                 "title": "certificates",
//                                                 "route": "/meser/scripts/linux/certificates",
//                                             },{
//                                                 "id": "1.2.1.3",
//                                                 "title": "ntpdate",
//                                                 "route": "/meser/scripts/linux/ntpdate",
//                                             }
//                                         ]
//                                     },
//                                     {
//                                         "id": "1.2.2",
//                                         "title": "script",
//                                         "route": "/meser/scripts/linux/script",
//                                     }
//                                 ],
//                             }
//                         ]
//                 },
//             }
//         ],
//         outboxMessages: [],
//         trashboxMessages: [],
//         selectedMessage: undefined,
//         selectedOption: undefined,
//         openDialog: false,
//     },
//     },
//     actions: {
//         toggleFavourite({ commit }, id) {
//             commit('toggleFavourite', id);
//         },
//         toggleNewMail({ commit }, value) {
//             commit('toggleNewMail', value);
//         },
//     },
//     mutations: {
//         toggleFavourite(state, id) {
//             state.inboxMessages[id].favourite = !state.inboxMessages[id].favourite;
//         },
//         toggleNewMail(state, value) {
//             state.openDialog = value;
//         },
//     },
// });

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

 const state = () => ({
    selectedTab: undefined,
    selectedRoute: '/',
    navigation: [
            {
                id : "meser",
                name: 'Meser Leumi',
                route: "/meser/index",
                children:
                        [
                            {
                                id: "1.1",
                                title: "installs",
                                route: "/meser/installs/install",
                                children: [
                                    {
                                        id: "1.1.1",
                                        title: "fedora",
                                        route: "/meser/installs/fedora",
                                    },
                                    {
                                        id: "1.1.2",
                                        title: "chrome",
                                        route: "/meser/installs/chrome",
                                    }
                                ]
                            },
                            {
                                id: "1.2",
                                title: "scripts",
                                route: "/meser/scripts/index",
                                children: [
                                    {
                                        id: "1.2.1",
                                        title: "linux",
                                        route: "/meser/scripts/linux/ntpdate",
                                        children : [
                                            {
                                                id: "1.2.1.1",
                                                title: "certificates",
                                                route: "/meser/scripts/linux/certificates",
                                            },{
                                                id: "1.2.1.2",
                                                title: "ntpdate",
                                                route: "/meser/scripts/linux/ntpdate",
                                            }
                                        ]
                                    },
                                    {
                                        id: "1.2.2",
                                        title: "script",
                                        route: "/meser/scripts/script",
                                    }
                                ],
                            }
                        ]
                ,
            },
            {
                id: "horizon",
                name: "Horizon",
                route: "/horizon/index",
                children: [
                    {
                        id: "2.1",
                        title: "simulator",
                        children: [
                            {
                                id: "2.1.1",
                                title: "installs",
                                route: "/horizon/simulator/installs",
                            },
                            {
                                id: "2.1.2",
                                title: "sender",
                                route: "/horizon/simulator/sender",
                            }
                        ]
                    },
                ]

            },
            {
                id: "engineer",
                name: "Engineer",
                route: '/engineer/index',
                children: [{
                    id: "3.1",
                    title: "automation",
                    route: '/engineer/automation'
                }]
            }
        ]
})

 const mutation = () => ({
    setSelectedTab(state, value) {
        state.selectedTab = value;
    },
     setSelectedRoute(state, value) {
        state.selectedRoute = value;
    },
})

const store = () => {
    return new Vuex.Store({
        state: state(),
        mutations: mutation()
    })
}

export default store;