<template>
  <v-card>
    <v-container>
    <h2>History Running</h2>
      <v-form ref="form" v-model="valid" lazy-validation>
          <v-checkbox
      v-model="MiniMarathon"
      @click="fn_MiniMarathon"
      :label="`Mini-Marathon 1: `"
    ></v-checkbox>
    <v-checkbox
    @click="fn_HalfMarathon"
      v-model="HalfMarathon"
      :label="`HalfMarathon 2:`"
    ></v-checkbox>
       <v-checkbox
       @click="fn_FullMarathon"
      v-model="FullMarathon"
      :label="`Full-Marathon 2:`"
    ></v-checkbox>

        <v-col>
     <v-text-field
          v-model="hour"
          :counter="2"
          type="number"
          :maxlength="2"
          label="Hour"
          required
        ></v-text-field>
             <v-text-field
          v-model="minute"
          :counter="2"
          :maxlength="2"
          type="number"
          label="Minute"
          required
        ></v-text-field>
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

    hour:'',
    minute:'',
    
    imageError:'',
    valid: true,
    nextpage:false,
    validate_form: false,
    MiniMarathon:'',
    HaftMarathon:'',
    FullMarathon:'',
    HalfMarathon:'',
    history_lists :[],
  }),
  
  mounted(){
    this.getdraft();
  },
    watch: {

        name_applicant: function(newValue) {
          this.name_applicant = this.uppername_applicant(newValue);
        },
      },
  methods: {
          getdraft(){
      const currentdarft = this.$store.state.running.draft.applicant;
      console.log(currentdarft)
      const historys = currentdarft.history
      console.log(historys[0])
      if(historys[0]!=null){
        console.log(this.FullMarathon)
        this.FullMarathon = true
      }
         if(historys[1]!=null){
        console.log(this.HalfMarathon)
        this.HalfMarathon = true
      }
         if(historys[2]!=null){
        console.log(this.MiniMarathon)
        this.MiniMarathon = true
      }



      // for(currentdarft.history)
      const time_expect = currentdarft.time_expect
      var time = time_expect.split(":");
      this.hour = time[0]
      this.minute = time[1]
      this.fname_th =  currentdarft.fname_th


    },
    fn_FullMarathon(){
      if(this.FullMarathon==true){
      this.history_lists[0] = 'Full Marathon'
      }
      else
      this.history_lists[0]= null
    },
    fn_MiniMarathon(){
      if(this.MiniMarathon==true)
      {
       this.history_lists[2] = 'Mini Marathon'
      }
        else
      this.history_lists[2]= null      
    },
    fn_HalfMarathon(){
      if(this.HalfMarathon==true)
      {
      this.history_lists[1]= 'Half Marathon'
      }
      else
      this.history_lists[1]= null


  


      
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
    // console.log(this.profile_img)
    const applicant={
     
      'id_user':id,
      "history":this.history_lists,
      "time_expect":this.hour+':'+this.minute,
			},
      currentdarft =JSON.parse(localStorage.getItem('draft'));

      console.log(currentdarft)
      console.log(applicant)
      currentdarft.draft.applicant = applicant
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
      this.$router.push("/Emergency");
    },
    go_previospage() {
      this.$router.push("/Personal");
    },
  },
};
</script>