<template>
    <v-card flat>
      <v-toolbar flat dense dark color="cyan" >

        <v-toolbar-title>Inbox</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>



      </v-toolbar>

      <v-list three-line flat>
        <v-list-item-group
          v-model="selected"
          multiple
          active-class="cyan--text"
        >
          <template v-for="(item, index) in items">
            <v-list-item :key="item.time">



              <template v-slot:default="{ active, toggle }">
                <v-list-item-avatar >
                  <v-img v-if="item.avatar" :src="item.avatar"></v-img>
                  <v-icon v-else>{{item.action}}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.msg"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text v-text="item.time"></v-list-item-action-text>
                  <v-icon
                    v-if="!active"
                    color="grey lighten-1"
                  >
                    mdi-checkbox-marked-circle
                  </v-icon>

                  <v-icon
                    v-else
                    color="cyan"
                  >
                    mdi-checkbox-marked-circle
                  </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider
              v-if="index + 1 < items.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list-item-group>
      </v-list>




<!--      <v-expansion-panels  accordion>-->
<!--        <v-expansion-panel-->
<!--          v-for="(item,i) in items"-->
<!--          :key="i"-->
<!--          class="textcolor&#45;&#45;text"-->
<!--        >-->
<!--          <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>-->
<!--          <v-expansion-panel-content>{{item.msg}}</v-expansion-panel-content>-->
<!--        </v-expansion-panel>-->
<!--      </v-expansion-panels>-->
    </v-card>
</template>

<script>
  export default {
    name: 'systemMsg',
    props:{items:Array},
    data(){
      return{
        selected: [2],
      }
    }
  }
</script>

<style scoped>

</style>
