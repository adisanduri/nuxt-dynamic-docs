<template>
  <v-app>
      <!--clipped-->
      <!---->
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
          <v-tab v-for="tab in tabs"
                 :key="tab.id">
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

        <v-navigation-drawer absolute permanent dark>
          <v-list>
              <!-- navigation level 1 -->
              <v-list-group
                      v-for="navi in navigation[0].value.children"
                      :key="'adi1 ' + navi.id"
                      no-action
              >
                  <template v-slot:activator>
                      <v-list-item>
                          <v-list-item-title v-text="navi.title">
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
                                  <v-list-item-content>
                                      <v-list-item-title v-text="naviChild.title">
                                      </v-list-item-title>
                                  </v-list-item-content>
                            </template>

                            <!-- create the children in the sub folder -->
                            <v-list-item v-for="naviChildChild in naviChild.children"
                                         :key="naviChildChild.id"
                                         link
                            >

                                <v-list-item-content>
                                    <v-list-item-title v-text="naviChildChild.title">
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                      </v-list-group>

                      <!-- this is not a sub folder -->
                      <v-list-item v-if="!naviChild.children" link>
                          <v-list-item-content>
                          <v-list-item-title v-text="naviChild.title">
                          </v-list-item-title>
                          </v-list-item-content>
                      </v-list-item>

                  </template>
              </v-list-group>
          </v-list>
        </v-navigation-drawer>

        <nuxt />

      </v-container>
    </v-content>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      group: undefined,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'Hatraa Docs',
      tabs: [
        {
          id: 'meser',
          name: 'Meser Leumi'
        },
        {
          id: 'horizon',
          name: 'Horzion'
        },
        {
          id: 'engineer',
          name: 'Engineer'
        },
      ],
      navigation: [
        {
          "key" : "meser",
          "value" : {
            "id": "1",
            "title": "main",
            "route": "/meser/index.md",
            "children":
                    [
                      {
                        "id": "1.1",
                        "title": "installs",
                        "route": "/meser/installs/install.md",
                        "children": [
                          {
                            "id": "1.1.1",
                            "title": "fedora",
                            "route": "/meser/installs/fedora.md",
                          },
                          {
                            "id": "1.1.2",
                            "title": "chrome",
                            "route": "/meser/installs/chrome.md",
                          }
                        ]
                      },
                      {
                        "id": "1.2",
                        "title": "scripts",
                        "route": "/meser/scripts/script.md",
                        "children": [
                            {
                              "id": "1.2.1",
                              "title": "linux",
                              "route": "/meser/scripts/linux/ntpdate.md",
                              "children" : [
                                  {
                                      "id": "1.2.1.1",
                                      "title": "try",
                                      "route": "/meser/scripts/linux/try/sub2.md",
                                  },{
                                      "id": "1.2.1.2",
                                      "title": "certificates",
                                      "route": "/meser/scripts/linux/certificates.md",
                                  },{
                                      "id": "1.2.1.3",
                                      "title": "ntpdate",
                                      "route": "/meser/scripts/linux/ntpdate.md",
                                  }
                              ]
                            },
                            {
                              "id": "1.2.2",
                              "title": "script",
                              "route": "/meser/scripts/linux/script.md",
                            }
                          ],
                      }
                    ]
              },
          }
      ],
        selectedTab: undefined,
    }
  }
}
</script>
