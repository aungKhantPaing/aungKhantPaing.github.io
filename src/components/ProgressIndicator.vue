<template>
  <!-- Progress Indicator -->
  <v-overlay absolute color="#FFF" opacity="1">
    <v-container style="width: 200px;">
      <v-row align="center" justify="center">
        <v-col align="center">
          <v-chip class="mb-10" color="primary"> version: {{ versionNo }} </v-chip>
          <v-progress-linear
            absolute
            :active="true"
            indeterminate
            color="blue"
            :rounded="true"
            height="8"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { version_number } from '@/constants/version';

@Component
export default class ProgressIndicator extends Vue {
  versionNo = version_number;
}
</script>
