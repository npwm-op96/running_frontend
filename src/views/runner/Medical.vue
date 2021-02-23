<template>
  <v-card>
    <v-container>
    <h2>Medical Information</h2>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-col>
              <v-select
          :items="bood_list"
          v-model="bood_group"
          label="Bood Group"
          required
        ></v-select>
        <v-checkbox
      v-model="info1.status"
      @click="info1_check=true"
      
      :label="'1. Do you have a medical allergy?'"
    ></v-checkbox>
        <v-text-field 
        v-if="info1.status"
        v-model="info1.detail"
          :counter="100"
          label="Detail"
          required
        >  </v-text-field>
  
      <v-checkbox
      v-model="info2.status"
      @click="info2_check=true"
      
      :label="'2. Do you have any chronic health?'"
    ></v-checkbox>
        <v-text-field 
        v-if="info2.status"
        v-model="info2.detail"
          :counter="100"
          label="Detail"
          required
        >  </v-text-field>
        <v-checkbox
      v-model="info3.status"
      @click="info3_check=true"
      
      :label="'3. Have you had surgery before?'"
    ></v-checkbox>
        <v-text-field 
        v-if="info3.status"
        v-model="info3.detail"
          :counter="100"
          label="Detail"
          required
        >  </v-text-field>
              <v-select
         v-if="info3.status"
          :items="year"
          v-model="info3.surgery_year"
          label="Year"
          required
        ></v-select>
        <v-checkbox
      v-model="info4.status"
      @click="info4_check=true"
      
      :label="'4. Do you have any plan for having a baby or are you pregnant before joining this event?'"
    ></v-checkbox>
        <!-- <v-text-field 
        v-if="info4_data"
        v-model="info4"
          :counter="100"
          label="Detail"
          required
        >  </v-text-field> -->
        <v-checkbox
      v-model="info5.status"
      @click="info5_check=true"
      
      :label="'5. Do you have any personal medicine to take?'"
    ></v-checkbox>
        <v-text-field 
        v-if="info5.status"
        v-model="info5.detail"
          :counter="100"
          label="Detail"
          required
        >  </v-text-field>
        <v-checkbox
      v-model="info6.status"
      @click="info6_check=true"
      
      :label="'6. Have you ever gotten injured from a Marathon event?'"
    ></v-checkbox>
        <v-checkbox
      v-model="info7.status"
      @click="info7_check=true"
      
      :label="'7. Do you often exercise? (at least 2-3 times / week)'"
    ></v-checkbox>
        <v-checkbox
      v-model="info8.status"
      @click="info8_check=true"
      
      :label="'8. Have you ever felt chest tightness or easily tired during working out?'"
    ></v-checkbox>
  </v-col>
  <br>
   <br>

        <v-btn
          :disabled="!valid"
          color="warning"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>

        <v-btn color="error" class="mr-4" @click="Dratf"> Dratf </v-btn>

        <v-btn color="error" class="mr-4" @click="resetValidation">
          Reset Validation
        </v-btn>
        <v-btn class="mr-4" @click="go_previospage"  color="success">
          กลับไป
        </v-btn>

        <v-btn class="mr-4" @click="go_nextpage" :disabled="!nextpage" color="success">
          ถัดไป
        </v-btn>
      </v-form>
    </v-container>

  </v-card>
  
</template>
<script>
export default {
  data: () => ({
    id_user:"",
    bood_group:'',
    info1:{status:false,detail:''},
    info2:{status:false,detail:''},
    info3:{status:false,detail:'',surgery_year:''},
    info4:{status:false,detail:''},
    info5:{status:false,detail:''},
    info6:{status:false,detail:''},
    info7:{status:false,detail:''},
    info8:{status:false,detail:''},
    info1_data:'',
    info2_data:'',
    info3_data:'',
    info4_data:'',
    info5_data:'',
    info6_data:'',
    info7_data:'',
    info8_data:'',
    data_info1:'',

    bood_list: ["A", "B", "O", "AB"],
    year:[],
    medical:{id_user:'',bood_type:'',information:{
      info1:''
    }},
    imageError:'',
    valid: true,
    nextpage:false,
    validate_form: false,
  }),
  
  mounted(){
    this.getyearlist();
    this.getdraft();
  },
    watch: {
        name_applicant: function(newValue) {
          this.name_applicant = this.uppername_applicant(newValue);
        },
      },
  methods: {
 
    getyearlist(){
              const today = new Date();
        var date = today.getFullYear()
        for(var i = 0; i < 100; i++){
          this.year.push(date--)
        }
    },
    getdraft(){
      const currentdarft = this.$store.state.running.draft.medical;
            this.bood_group =  currentdarft.bood_type

      this.bood_group =  currentdarft.bood_type
      this.info1 = currentdarft.information.info1
      this.info2 = currentdarft.information.info2
      this.info3 = currentdarft.information.info3
      this.info4 = currentdarft.information.info4
      this.info5 = currentdarft.information.info5
      this.info6 = currentdarft.information.info6
      this.info7 = currentdarft.information.info7
      this.info8 = currentdarft.information.info8
    },
    validate() {
      this.validate_form = true;
      this.$refs.form.validate();
      this.nextpage = true;

      this.Dratf()
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    Dratf() {
      var id = this.$store.state.auth.user.id;
        this.medical.id_user = id
        this.medical.bood_type = this.bood_group
        this.medical.information.info1 = this.info1
        this.medical.information.info2 = this.info2 
        this.medical.information.info3 = this.info3 
        this.medical.information.info4 = this.info4 
        this.medical.information.info5 = this.info5 
        this.medical.information.info6 = this.info6 
        this.medical.information.info7 = this.info7 
        this.medical.information.info8 = this.info8 
      console.log(this.medical)
      var currentdarft =JSON.parse(localStorage.getItem('draft'));
      console.log(currentdarft)
      console.log(this.medical)
      currentdarft.draft.medical = this.medical
      var _currentdarft = currentdarft
      localStorage.setItem('draft', JSON.stringify(_currentdarft));
      var draft = this.$store.state.running;

      this.$store.dispatch("running/savedraft",draft)
      .then(
        (draft) => {
          console.log(draft)
        },
        error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },

    save() {
      
    },
    go_nextpage() {
      this.$router.push("/Souvenir");
    },
    go_previospage() {
      this.$router.push("/History");
    },
  },
};
</script>