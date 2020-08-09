<template>
  <v-container>
    <v-row class="mt-3 mb-3" justify="center">
      <v-card color="e1000Form" dark>
        <v-card-text>
          <h1 class="text-md-center">ClusterStor E1000 Configurator</h1>
        </v-card-text>
      </v-card>
    </v-row>

    <!-- Input Form -->

    <v-form @submit.prevent="handleAddFileSystem" v-model="formValid" lazy-validation ref="form">
      <!-- Configuration Panels  -->

      <v-expansion-panels multiple>
        <!-- File System  -->

        <v-expansion-panel>
          <v-expansion-panel-header>File System</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row justify="center">
              <v-col cols="2" lg="2">
                <v-text-field v-model="config.fsIndex" value="1" type="number" :rules="numberRule" shaped filled background-color="select" label="File System Index "></v-text-field>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="4" lg="3">
                <v-select v-if="element.smuNIC" :items="JSON.parse(element.smuNIC.options)" item-text="label" item-value="value" :value="element.smuNIC.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.smuNIC.label" v-model="config.smuNIC" :prepend-icon="element.smuNIC.icon">
                </v-select>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- MDU  -->

        <v-expansion-panel>
          <v-expansion-panel-header>MDU</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row justify="center">
              <v-col cols="2" lg="2">
                <v-text-field v-model="config.mduCount" value="1" :rules="numberRule" type="number" shaped filled background-color="select" label="Server Qty"></v-text-field>
              </v-col>
              <v-col cols="6" lg="3">
                <v-select v-if="element.mduMemory" :items="JSON.parse(element.mduMemory.options)" item-text="label" item-value="value" :value="element.mduMemory.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.mduMemory.label" v-model="config.mduMemory" :prepend-icon="element.mduMemory.icon">
                </v-select>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="6" lg="3">
                <v-select v-if="element.mduNIC" :items="JSON.parse(element.mduNIC.options)" item-text="label" item-value="value" :value="element.mduNIC.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.mduNIC.label" v-model="config.mduNIC" :prepend-icon="element.mduNIC.icon">
                </v-select>
              </v-col>
              <v-col cols="4" lg="3">
                <v-select v-if="element.mduSSD" :items="JSON.parse(element.mduSSD.options)" item-text="label" item-value="value" :value="element.mduSSD.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.mduSSD.label" v-model="config.mduSSD" :prepend-icon="element.mduSSD.icon">
                </v-select>
              </v-col>
              <v-col cols="6" lg="6">
                <div v-if="config.mduSSD == '1'">
                  <v-select v-if="element.mduSize1DWPD" :items="JSON.parse(element.mduSize1DWPD.options)" item-text="label" item-value=" value" :value="element.mduSize1DWPD.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.mduSize1DWPD.label" v-model="config.mduSize1DWPD" :prepend-icon="element.mduSize1DWPD.icon">
                  </v-select>
                </div>
                <div v-else-if="config.mduSSD == '3'">
                  <v-select v-if="element.mduSize3DWPD" :items="JSON.parse(element.mduSize3DWPD.options)" item-text="label" item-value=" value" :value="element.mduSize3DWPD.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.mduSize3DWPD.label" v-model="config.mduSize3DWPD" :prepend-icon="element.mduSize3DWPD.icon">
                  </v-select>
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- SSU-F  -->

        <v-expansion-panel>
          <v-expansion-panel-header>SSU-F</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row justify="center">
              <v-col cols="2" lg="2">
                <v-text-field v-model="config.ssufCount" value="1" :rules="numberRule" type="number" shaped filled background-color="select" label="Server Qty "></v-text-field>
              </v-col>
              <v-col cols="6" lg="3">
                <v-select v-if="element.ssufNIC" :items="JSON.parse(element.ssufNIC.options)" item-text="label" item-value="value" :value="element.ssufNIC.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssufNIC.label" v-model="config.ssufNIC" :prepend-icon="element.ssufNIC.icon">
                </v-select>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="4" lg="3">
                <v-select v-if="element.ssufSSD" :items="JSON.parse(element.ssufSSD.options)" item-text="label" item-value="value" :value="element.ssufSSD.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssufSSD.label" v-model="config.ssufSSD" :prepend-icon="element.ssufSSD.icon">
                </v-select>
              </v-col>
              <v-col cols="6" lg="3">
                <div v-if="config.ssufSSD == '1'">
                  <v-select v-if="element.ssufSize1DWPD" item-text="label" item-value="value" :items="JSON.parse(element.ssufSize1DWPD.options)" :value="element.ssufSize1DWPD.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssufSize1DWPD.label" v-model="config.ssufSize" :prepend-icon="element.ssufSize1DWPD.icon">
                  </v-select>
                </div>
                <div v-else-if="config.ssufSSD == '3'">
                  <v-select v-if="element.ssufSize3DWPD" :items="JSON.parse(element.ssufSize3DWPD.options)" item-text="label" item-value="value" :value="element.ssufSize3DWPD.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssufSize3DWPD.label" v-model="config.ssufSize" :prepend-icon="element.ssufSize3DWPD.icon">
                  </v-select>
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- SSU-D  -->

        <v-expansion-panel>
          <v-expansion-panel-header>SSU-D</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row justify="center">
              <v-col cols="2" lg="2">
                <v-text-field v-model="config.ssudCount" value="1" :rules="numberRule" type="number" shaped filled background-color="select" label="Server Qty "></v-text-field>
              </v-col>
              <v-col cols="6" lg="3">
                <v-select v-if="element.ssuMemory" :items="JSON.parse(element.ssuMemory.options)" item-text="label" item-value="value" :value="element.ssuMemory.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssuMemory.label" v-model="config.ssuMemory" :prepend-icon="element.ssuMemory.icon">
                </v-select>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="4" lg="3">
                <v-select v-if="element.ssuEnclosures" :items="JSON.parse(element.ssuEnclosures.options)" item-text="label" item-value="value" :value="element.ssuEnclosures.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssuEnclosures.label" v-model="config.ssuEnclosures" :prepend-icon="element.ssuEnclosures.icon">
                </v-select>
              </v-col>
              <v-col cols="4" lg="3">
                <v-select v-if="element.ssudNIC" :items="JSON.parse(element.ssudNIC.options)" item-text="label" item-value="value" :value="element.ssudNIC.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssudNIC.label" v-model="config.ssudNIC" :prepend-icon="element.ssudNIC.icon">
                </v-select>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="4" lg="3">
                <v-select v-if="element.ssudSize" :items="JSON.parse(element.ssudSize.options)" item-text="label" item-value="value" :value="element.ssudSize.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssudSize.label" v-model="config.ssudSize" :prepend-icon="element.ssudSize.icon">
                </v-select>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row justify="space-around">
        <v-btn :loading="loading" :disabled="!formValid || loading" color="button" type="submit" class="mt-3">
          <span slot="loader" class="custom-loader">
            <v-icon color="button">loop</v-icon>
          </span>
          Submit
        </v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'e1000',

  data() {
    return {
      formValid: false,
      config: {},
      numberRule: [(v) => !!v || 'Number is required', (v) => v >= 0 || 'Postive number required'],
      selectRule: [(v) => !!v || 'Selection is required']
    };
  },

  mounted() {
    this.getElements();
  },

  computed: {
    ...mapGetters(['element', 'loading'])
  },
  methods: {
    getElements() {
      this.$store.dispatch('getElements', {
        product: 'e1000'
      });
    },
    handleAddFileSystem() {
      if (this.$refs.form.validate()) {
        var jsonConfig = JSON.stringify(this.config);
        this.$store.dispatch('addConfig', {
          jsonConfig: jsonConfig
        });
        console.log('submit', jsonConfig);
      }
    }
  }
};
</script>
