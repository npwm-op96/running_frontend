<template>
  <v-card>
    <v-container>
    <h2>Emergency Contact</h2>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-col>
        Contact 1 
         <v-text-field
        v-model="contact1.fname"
          :counter="50"
          label="Frist Name"
          required
        ></v-text-field>
        <v-text-field
        v-model="contact1.lname"
          :counter="50"
          label="Last Name"
          required
        >  </v-text-field>

          <v-text-field
          v-model="contact1.relation"
          :counter="50"
          label="Relation"
          required
        >
          </v-text-field>
            <v-text-field
            v-model="contact1.no"
          :maxlength="10"
          :counter="10"
          label="Phone"
          required
        >
          </v-text-field>
               Contact 2 
        <v-text-field
        v-model="contact2.fname"
          :counter="50"
          label="Frist Name"
          required
        ></v-text-field>
        <v-text-field
        v-model="contact2.lname"
          :counter="50"
          label="Last Name"
          required
        >  </v-text-field>

          <v-text-field
            v-model="contact2.relation"

          :counter="50"
          label="Relation"
          required
        >
          </v-text-field>
               <v-text-field
            v-model="contact2.no"
          :maxlength="10"
          :counter="10"
          label="Phone"
          required
        >
          </v-text-field>

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
      name: 'Emergency',

  data: () => ({
    id_user:"",
    fname:"",
    lname:"",
    relation:"",
    no:"",
    emergencylist:[],
    contact1:{
        id_user:'',
        fname:'',
        lname:'',
        relation:'',
        no:''
    },
    contact2:{
        id_user:'',
        fname:'',
        lname:'',
        relation:'',
        bo:''
    },

    imageError:'',
    valid: true,
    nextpage:false,
    validate_form: false,

  }),
  
  mounted(){
        this.contact1.id_user= this.$store.state.auth.user.id;
        this.contact2.id_user= this.$store.state.auth.user.id;
      console.log(this.contact1)
      console.log(this.contact2)

    this.getdraft();
  },
    watch: {

        name_applicant: function(newValue) {
          this.name_applicant = this.uppername_applicant(newValue);
        },
      },
  methods: {
          getdraft(){
      const currentdarft = this.$store.state.running.draft.emergency;
      console.log(currentdarft)
      var test = this.contact1.fname =  currentdarft[0].fname
      console.log(test)
      this.contact1.fname =  currentdarft[0].fname
      this.contact1.lname =  currentdarft[0].lname
      this.contact1.relation =  currentdarft[0].relation
      this.contact1.no =  currentdarft[0].no
      this.contact2.fname =  currentdarft[1].fname
      this.contact2.lname =  currentdarft[1].lname
      this.contact2.relation =  currentdarft[1].relation
      this.contact2.no =  currentdarft[1].no
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
    this.emergencylist[0]=this.contact1
    this.emergencylist[1]=this.contact2

    const emergency = this.emergencylist

      var currentdarft =JSON.parse(localStorage.getItem('draft'));

      console.log(currentdarft)
      console.log(emergency)
      currentdarft.draft.emergency = emergency
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
      this.$router.push("/Medical");
    },
    go_previospage() {
      this.$router.push("/History");
    },
  },
};
</script>