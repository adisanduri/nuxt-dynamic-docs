<template>
  <v-app>
    <v-app-bar
            app
            tile
            clipped
            color="accent"
    >
      <v-toolbar-title
              v-text="title"
              class="mr-6"/>

      <v-toolbar-items>
        <v-tabs height="100%"
                optional
                background-color="accent"
                v-model="selectedTab">
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
        <v-navigation-drawer absolute permanent dark
            v-if="selectedTab">
          <v-list>
              <!-- navigation level 1 -->

<!--              v-if="navigation[selectedTab.index].children && navigation[selectedTab.index].children > 0"-->
              <v-list-group
                      v-if="navigation[selectedTab.index] &&
                      navigation[selectedTab.index].children.length &&
                      navigation[selectedTab.index].children[0].children &&
                      navigation[selectedTab.index].children[0].children.length > 0"
                      v-for="navi in navigation[selectedTab.index].children"
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
                                         link
                            >

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

              <!-- this is not a sub folder -->
              <v-list-item v-if="navigation[selectedTab.index] &&
                           navigation[selectedTab.index].children.length &&
                           !navigation[selectedTab.index].children[0].children"
                  link>
                  <v-list-item-content @click="setRoute(navigation[selectedTab.index].children[0].route)">
                      <v-list-item-title v-text="'1'+navigation[selectedTab.index].children[0].title">
                      </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>

          </v-list>
        </v-navigation-drawer>
        <nuxt />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
    import { mapState , mapMutations} from 'vuex';
    export default {
        computed: {
            ...mapState([
              'navigation',
              'selectedTab',
              'selectedRoute',
            ]),
            selectedTab: {
                get() {
                    return this.$store.state.selectedTab;
                },
                set(index) {
                  this.setSelectedTab( {index: index, value: this.navigation[index].id});

                  if (this.navigation[index].route) {
                      this.setRoute(this.navigation[index].route);
                  }
                }
            }
        },
        methods: {
            ...mapMutations(['setSelectedTab',
            'setSelectedRoute']),
            setRoute : function(value) {

                if (value) {
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
