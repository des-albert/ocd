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
                <v-select v-if="element.fsNetwork" :items="element.fsNetwork.options" :placeholder="element.fsNetwork.value" :value="element.fsNetwork.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.fsNetwork.label" v-model="config.fsNetwork" :prepend-icon="element.fsNetwork.icon">
                </v-select>
              </v-col>
              <v-col cols="4" lg="3">
                <v-select v-if="element.fsSSD" :items="element.fsSSD.options" :value="element.fsSSD.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.fsSSD.label" v-model="config.fsSSD" :prepend-icon="element.fsSSD.icon">
                </v-select>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="4" lg="3">
                <v-select v-if="element.fsProtection" :items="element.fsProtection.options" :value="element.fsProtection.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.fsProtection.label" v-model="config.fsProtection" :prepend-icon="element.fsProtection.icon">
                </v-select>
              </v-col>
              <v-col cols="4" lg="3" v-if="
                  config.fsNetwork == '200 Gb HDR IB' ||
                    config.fsNetwork == '200 Gb Ethernet'
                ">
                <v-select v-if="element.smuNIC" :items="element.smuNIC.options" :value="element.smuNIC.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.smuNIC.label" v-model="config.smuNIC" :prepend-icon="element.smuNIC.icon">
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
                <v-select v-if="element.mduMemory" :items="element.mduMemory.options" :value="element.mduMemory.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.mduMemory.label" v-model="config.mduMemory" :prepend-icon="element.mduMemory.icon">
                </v-select>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="6" lg="3">
                <v-select v-if="element.mduNIC" :items="element.mduNIC.options" :value="element.mduNIC.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.mduNIC.label" v-model="config.mduNIC" :prepend-icon="element.mduNIC.icon">
                </v-select>
              </v-col>
              <v-col cols="6" lg="6">
                <div v-if="config.fsSSD == '1 DWPD'">
                  <v-select v-if="element.mduDrive1DWPD" :items="element.mduDrive1DWPD.options" :value="element.mduDrive1DWPD.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.mduDrive1DWPD.label" v-model="config.mduDriveSize" :prepend-icon="element.mduDrive1DWPD.icon">
                  </v-select>
                </div>
                <div v-else-if="config.fsSSD == '3 DWPD'">
                  <v-select v-if="element.mduDrive3DWPD" :items="element.mduDrive3DWPD.options" :value="element.mduDrive3DWPD.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.mduDrive3DWPD.label" v-model="config.mduDriveSize" :prepend-icon="element.mduDrive3DWPD.icon">
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
                <v-select v-if="element.ssufNIC" :items="element.ssufNIC.options" :value="element.ssufNIC.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssufNIC.label" v-model="config.ssufNIC" :prepend-icon="element.ssufNIC.icon">
                </v-select>
              </v-col>
              <v-col cols="6" lg="3">
                <div v-if="config.fsSSD == '1 DWPD'">
                  <v-select v-if="element.ssufSize1DWPD" :items="element.ssufSize1DWPD.options" :value="element.ssufSize1DWPD.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssufSize1DWPD.label" v-model="config.ssufSize" :prepend-icon="element.ssufSize1DWPD.icon">
                  </v-select>
                </div>
                <div v-else-if="config.fsSSD == '3 DWPD'">
                  <v-select v-if="element.ssufSize3DWPD" :items="element.ssufSize3DWPD.options" :value="element.ssufSize3DWPD.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssufSize3DWPD.label" v-model="config.ssufSize" :prepend-icon="element.ssufSize3DWPD.icon">
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
                <v-select v-if="element.ssuMemory" :items="element.ssuMemory.options" :value="element.ssuMemory.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssuMemory.label" v-model="config.ssuMemory" :prepend-icon="element.ssuMemory.icon">
                </v-select>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="4" lg="3">
                <v-select v-if="element.ssuEnclosures" :items="JSON.parse(ssu)" item-text="field" item-value="value" :value="element.ssuEnclosures.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssuEnclosures.label" v-model="config.ssuEnclosures" :prepend-icon="element.ssuEnclosures.icon">
                </v-select>
              </v-col>
              <v-col cols="4" lg="3">
                <v-select v-if="element.ssudNIC" :items="element.ssudNIC.options" :value="element.ssudNIC.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssudNIC.label" v-model="config.ssudNIC" :prepend-icon="element.ssudNIC.icon">
                </v-select>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="4" lg="3">
                <v-select v-if="element.ssudSize" :items="element.ssudSize.options" :value="element.ssudSize.value" :rules="selectRule" shaped filled background-color="select" item-color="selected" :label="element.ssudSize.label" v-model="config.ssudSize" :prepend-icon="element.ssudSize.icon">
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
      ssu:
        '[{"field": "1 Enclosure", "value": "1"}, {"field": "2 Enclosures", "value": "2"}, {"field": "4 Enclosures", "value": "4"}]',
      numberRule: [
        v => !!v || 'Number is required',
        v => v >= 0 || 'Postive number required'
      ],
      selectRule: [v => !!v || 'Selection is required']
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
