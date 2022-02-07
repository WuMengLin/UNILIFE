<template>
  <div>
    <!-- 表單區塊 -->
    <template>
      <v-container>
        <v-row no-gutters class="pt-4">
          <v-col cols="2"></v-col>
          <v-col cols="8">
            <template>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-combobox
                  v-model="select"
                  :items="personalInformation"
                  item-text="address"
                  item-value="id"
                  dense
                  label="收件地址"
                  return-object
                  class="pt-4"
                ></v-combobox>

                <!--<v-text-field
                  v-model="address"
                  :counter="100"
                  :rules="addressRules"
                  label="收件地址"
                  required
                ></v-text-field>-->

                <v-text-field
                  v-model="name"
                  :counter="50"
                  :rules="nameRules"
                  label="收件人"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="phoneNumber"
                  :rules="phoneNumberRules"
                  :counter="20"
                  label="連絡電話"
                  required
                ></v-text-field>

                <v-checkbox
                  v-model="checkbox"
                  label="將此次寄送資料新增到資訊簿"
                  required
                ></v-checkbox>

                <v-row align="center" justify="start" no-gutters>
                  <v-btn
                    color="primary"
                    class="mr-4"
                    dark
                    @click="dialog = true"
                  >
                    編輯資訊簿
                  </v-btn>

                  <v-btn color="error" class="mr-4" @click="reset">
                    清除重填
                  </v-btn>

                  <v-btn color="warning" @click="resetValidation">
                    確認寄送
                  </v-btn>
                </v-row>
              </v-form>
            </template>
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>
      </v-container>
    </template>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <!-- 編輯資訊簿區塊 -->
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>編輯資訊簿</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> 離開 </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>使用者設定</v-subheader>
          <v-list-item class="text-left">
            <v-list-item-content class="justify-space-between">
              <v-list-item-title>新增收件人</v-list-item-title>
              <v-list-item-subtitle
                >設定資訊簿方便下次結帳選用</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-content>
              <template>
                <div class="my-2">
                  <v-btn
                    class="float-right"
                    color="error"
                    dark
                    large
                    @click="openPersonalInformation(true)"
                  >
                    <v-icon left> mdi-plus-box </v-icon>收件人資訊
                  </v-btn>
                </div>
              </template>
              <!-- 彈出視窗區塊 -->
              <v-dialog
                v-model="openPersonalInformationDialog"
                persistent
                max-width="600px"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">收件人資訊</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="template.name"
                            label="收件人*"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="template.address"
                            label="收件地址*"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="template.email"
                            label="E-mail"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="template.phoneNumber"
                            label="連絡電話*"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-checkbox
                            v-model="template.preset"
                            label="設為預設項目"
                            required
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="openPersonalInformationDialog = false"
                    >
                      關閉
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="updatePersonalInformation"
                    >
                      儲存
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>請選擇預設地址</v-subheader>
          <v-radio-group v-model="radioGroup">
            <v-list-item
              v-for="(item, index) in personalInformation"
              :key="index"
              class="text-left theme--light v-sheet--outlined mx-4 mb-4 rounded-lg"
            >
              <v-card-actions class="pl-0">
                <v-radio
                  name="radioGroup"
                  :value="index"
                  @click="changePreset(index)"
                ></v-radio>
              </v-card-actions>
              <v-list-item-content>
                <v-list-item-title class="mb-2">{{
                  item.name
                }}</v-list-item-title>
                <v-list-item-subtitle
                  >地址 : {{ item.address }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >郵件 : {{ item.email }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >電話 : {{ item.phoneNumber }}</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon @click="openPersonalInformation(false, item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn icon @click="delPersonalInformation(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-list-item>
          </v-radio-group>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    /* 彈出視窗參數 */
    openPersonalInformationDialog: false,
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    /* 預設選擇卡片 */
    radioGroup: null,
    /* 表單內容 */
    valid: true,
    address: '',
    addressRules: [(v) => !!v || '收件地址 是必填項目'],
    name: '',
    nameRules: [(v) => !!v || '收件人姓名 是必填項目'],
    email: '',
    phoneNumber: '',
    phoneNumberRules: [(v) => !!v || '連絡電話 是必填項目'],
    emailRules: [
      (v) => !!v || 'E-mail 是必填項目',
      (v) => /.+@.+\..+/.test(v) || 'E-mail 格式不符'
    ],
    select: null,
    checkbox: false,
    personalInformation: [
      {
        id: '1643251761030',
        name: '統一企業股份有限公司',
        phoneNumber: '06-253-6789',
        address: '710 台南市永康區中正路301號',
        email: 'jlian@mail.pec.com.tw',
        preset: false
      },
      {
        id: '1643251761031',
        name: '台灣糖業股份有限公司',
        phoneNumber: '06-337-8888',
        address: '701 臺南市東區生產路68號',
        email: 'tsc01@taisugar.com.tw',
        preset: false
      },
      {
        id: '1643251761032',
        name: '味全食品工業股份有限公司',
        phoneNumber: '02-2506-5020',
        address: '104台北市中山區松江路125號10樓',
        email: 'service@weichuan.com.tw',
        preset: true
      }
    ],
    isNew: false,
    template: {
      id: '',
      name: '',
      phoneNumber: '',
      address: '',
      email: '',
      preset: false
    }
  }),
  methods: {
    /* 表單按鈕 */
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      if (this.checkbox === true) {
        const timestamp = Math.floor(Date.now())
        let address
        if (typeof this.select === 'object') {
          address = this.select.address
        } else {
          address = this.select
        }
        this.personalInformation.push({
          id: timestamp,
          name: this.name,
          phoneNumber: this.phoneNumber,
          address: address,
          email: this.email,
          preset: false
        })
      }
    },
    clearTemplate () {
      this.template = {
        id: '',
        name: '',
        phoneNumber: '',
        address: '',
        email: '',
        preset: false
      }
    },
    updatePersonalInformation () {
      let newIndex
      if (this.isNew === true) {
        /* 新增 */
        const timestamp = Math.floor(Date.now())
        this.personalInformation.push({
          id: timestamp,
          name: this.template.name,
          phoneNumber: this.template.phoneNumber,
          address: this.template.address,
          email: this.template.email,
          preset: this.template.preset
        })
      } else {
        /* 編輯 */
        this.personalInformation.forEach((item, index) => {
          if (this.template.id === item.id) {
            newIndex = index
          }
        })

        if (this.template.preset === true) {
          this.personalInformation.forEach((item, index) => {
            item.preset = false
          })
          this.personalInformation[newIndex] = Object.assign({}, this.template)
          this.upDateRadioGroup()
        } else {
          this.personalInformation[newIndex] = Object.assign({}, this.template)
        }
      }
      this.openPersonalInformationDialog = false
    },
    openPersonalInformation (isNew, personalItem) {
      this.openPersonalInformationDialog = true
      if (isNew === true) {
        this.clearTemplate()
        this.isNew = true
      } else {
        this.isNew = false
        this.template = Object.assign({}, personalItem)
      }
    },
    delPersonalInformation (personalItem) {
      let newIndex
      this.personalInformation.forEach((item, index) => {
        if (personalItem.id === item.id) {
          newIndex = index
          if (!(item.preset === true && this.personalInformation.length >= 2)) {
            this.personalInformation.splice(newIndex, 1)
            this.upDateRadioGroup()
          } else {
            alert('請先更換預設地址')
          }
        }
      })
    },
    loadPresetPersonalInformation () {
      if (this.personalInformation.length > 0) {
        this.template = this.personalInformation.find((item, index) => {
          return item.preset === true
        })
        this.upDateRadioGroup()
        this.select = Object.assign({}, this.template)
        this.address = this.template.address
        this.name = this.template.name
        this.email = this.template.email
        this.phoneNumber = this.template.phoneNumber
      }
    },
    changePreset (index) {
      this.personalInformation.forEach((item, index) => {
        item.preset = false
      })
      this.personalInformation[index].preset = true
    },
    upDateRadioGroup () {
      this.radioGroup = this.personalInformation
        .map((item, index) => {
          return item.preset
        })
        .indexOf(true)
    }
  },
  computed: {
    personalInformationItem () {
      const array = []
      for (let i = 0; i < this.personalInformation.length; i++) {
        array.push(this.personalInformation[i].id)
      }
      return array
    }
  },
  watch: {
    select () {
      if (typeof this.select === 'object') {
        this.template = this.personalInformation.find((item, index) => {
          return this.select.id === item.id
        })
        this.address = this.template.address
        this.name = this.template.name
        this.email = this.template.email
        this.phoneNumber = this.template.phoneNumber
      }
    }
  },
  created () {
    this.loadPresetPersonalInformation()
  }
}
</script>
