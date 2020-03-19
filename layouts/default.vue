<template>
  <v-app>
    <v-app-bar
            absolute
            app
            tile
            clipped-left
            color="accent"
    >
      <v-toolbar-title
              v-text="title"
              class="mr-6"/>

      <v-toolbar-items>
        <v-tabs height="100%"
                optional
                background-color="accent"
                v-model="selectedTab"
                >
                  <v-tab v-for="tab in navigation"
                         :key="tab.id"
                  >
                    {{tab.name}}
                  </v-tab>
        </v-tabs>

      </v-toolbar-items>

      <div class="flex-grow-1"></div>

      <v-col sm="2">
        <v-text-field
                rounded
                max-width="20px"
                flat
                hide-details
                label="Search"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
        />
      </v-col>
    </v-app-bar>

    <v-content>
      <v-container>

<!--          clipped-->
<!--          -->

        <v-navigation-drawer
                app
                permanent
                clipped
                dark
                v-if="selectedTab != undefined">
          <v-list flat>
              <v-list-item-group
                      active-class="accent--text"
              >

              <v-list-group
                      v-if="navigation[selectedTab] &&
                      navigation[selectedTab].children.length &&
                      navigation[selectedTab].children[0].children &&
                      navigation[selectedTab].children[0].children.length > 0"
                      v-for="navi in navigation[selectedTab].children"
                      :key="navi.id"
                      no-action
              >
                  <template v-slot:activator>
                      <v-list-item @click="setRoute(navi.route)">
                          <v-list-item-title v-text="'1'+navi.title">
                          </v-list-item-title>
                      </v-list-item>
                  </template>


                  <!-- navigation level 2 -->
                  <template v-for="naviChild in navi.children">

                        <!-- if there are children(it's a sub folder) -->
                        <v-list-group
                                v-if="naviChild.children && naviChild.children.length > 0"
                                no-action
                                sub-group
                        >
                            <template v-slot:activator>
                                  <v-list-item-content  @click="setRoute(naviChild.route)">
                                      <v-list-item-title v-text="'2'+naviChild.title">
                                      </v-list-item-title>
                                  </v-list-item-content>
                            </template>

                            <!-- create the children in the sub folder -->
                            <v-list-item v-for="naviChildChild in naviChild.children"
                                         :key="naviChildChild.id"
                                         link>

                                <v-list-item-content @click="setRoute(naviChildChild.route)">
                                    <v-list-item-title v-text="'3'+naviChildChild.title">
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                      </v-list-group>

                      <!-- this is not a sub folder -->
                      <v-list-item v-if="!naviChild.children" link>
                          <v-list-item-content @click="setRoute(naviChild.route)">
                          <v-list-item-title v-text="'4'+naviChild.title">
                          </v-list-item-title>
                          </v-list-item-content>
                      </v-list-item>

                  </template>
              </v-list-group>
              </v-list-item-group>
              <!-- this is not a sub folder -->
              <v-list-item-group
                            active-class="accent--text">
                  <v-list-item v-if="navigation[selectedTab] &&
                           navigation[selectedTab].children.length &&
                           !navigation[selectedTab].children[0].children"
                               link>
                      <v-list-item-content @click="setRoute(navigation[selectedTab].children[0].route)">
                          <v-list-item-title v-text="'1'+navigation[selectedTab].children[0].title">
                          </v-list-item-title>
                      </v-list-item-content>
                  </v-list-item>
              </v-list-item-group>

          </v-list>
          </v-navigation-drawer>
          <div v-if="selectedRoute != '/'">
              <HeaderPanel />
              <PageContent />
          </div>
          <nuxt />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>

    import { mapState , mapMutations} from 'vuex';
    import HeaderPanel from "../components/HeaderPanel";
    import PageContent from "../components/PageContent";
    export default {
        components: {PageContent, HeaderPanel},
        computed: {
            ...mapState([
              'navigation',
              'selectedTab',
              'selectedRoute',
              'hierarchy',
            ]),
            selectedTab: {
                get() {
                    return this.$store.state.selectedTab;
                },
                set(index) {

                 // this.setSelectedTab( {index: index, value: this.navigation[index].id});
                  this.setSelectedTab(index);

                  if (this.navigation[index] && this.navigation[index].route) {

                      this.setRoute(this.navigation[index].route);
                  }
                  else {
                      this.setRoute('/');
                  }
                }
            }
        },
        methods: {
            ...mapMutations(['setSelectedTab',
            'setSelectedRoute']),
            setRoute : function(value) {

                if (value) {
                   var splitResults = value.split("/").slice(1);

                   this.$store.state.hierarchy =splitResults.map(
                        function(x, i) {
                            var href= '';
                            // if (i==splitResults.length-1) {
                            //     href = value;
                            // }
                            // else {
                            //     for(var j=0; j<i;j++) {
                            //         href+=splitResults[j];
                            //     }
                            // }
                            return {
                                text: x,
                                disabled: false,
                                href: href
                            }
                        });

                    this.$router.push(value);
                    this.setSelectedRoute(value);
                }
            }
        },
        data () {
            return {
              title: 'Hatraa Docs',
            }
        },
    }
</script>
