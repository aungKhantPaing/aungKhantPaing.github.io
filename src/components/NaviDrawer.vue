<template>
  <v-navigation-drawer v-model="drawer" absolute temporary app width="300">
    <v-list nav subheader>
      <v-subheader>Places</v-subheader>
      <v-list-group
        v-for="placeGroup in placeGroups"
        :key="placeGroup.name"
        :prepend-icon="placeGroup.icon"
      >
        <template v-slot:activator>
          <v-list-item-title class="subtitle-1">{{ placeGroup.name }}</v-list-item-title>
        </template>

        <template v-slot:default>
          <v-list-item
            v-for="place in placeGroup.placeList"
            @click="goTo(place)"
            :key="place.properties.id"
          >
            <v-list-item-title
              style="margin-left: 56px;"
              class="body-1"
              v-text="place.properties.name"
            >
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list-group>
    </v-list>
    <template v-slot:append>
      <div class="pa-2 text-center" style="font-size: 0.8em;">
        {{ versionNo }}
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PlaceGroup from '@/models/placeGroup';
import place_types from '@/constants/placeType';
import eventBus from '@/eventBus';
import store from '@/store';
import { Place } from '@/models/place';
import kPlaceToTheme from '@/constants/placeToTheme';
import { version_number } from '@/constants/version';

@Component
export default class NaviDrawer extends Vue {
  versionNo = version_number;

  // as v-model do both getting and setting the value...
  // ...computed setter is a handy way to link v-model with vuex
  set drawer(value: boolean) {
    this.$store.commit('SET_DRAWER', value);
  }
  get drawer() {
    return this.$store.state.drawer;
  }

  getColorOf(value: place_types) {
    return kPlaceToTheme[value].color;
  }

  goTo(place: Place) {
    this.$router.push(`/place/${place.properties.id}`);
  }

  placeGroups: PlaceGroup[] = [
    new PlaceGroup('Department', 'mdi-bank', [place_types.department]),
    // new PlaceGroup('Canteen', 'mdi-silverware', [place_types.canteen]),
    new PlaceGroup('Bus Stop', 'mdi-bus', [place_types.bus_stop]),
    new PlaceGroup('Sport and Activities', 'mdi-run', [
      place_types.rc,
      place_types.library,
      place_types.stadium,
    ]),
    // new PlaceGroup('Copier', 'mdi-content-copy', [place_types.copier]),
    new PlaceGroup('Hostel', 'mdi-bed', [place_types.hostel]),
    new PlaceGroup('Other', 'mdi-domain'),
  ];

  mounted() {
    this.$store.state.map.places.forEach((place: Place) => {
      for (const placeGroup of this.placeGroups) {
        if (placeGroup.types.includes(place.properties.type) || placeGroup.types.length == 0) {
          placeGroup.placeList.push(place);
          break;
        }
      }
    });
  }
}
</script>

<style></style>
