<template>
<v-app>
        <img :src=personal.photo alt="" :width="300" :height="300">

<v-card-title>
      Personal
    </v-card-title>
    <v-card-text>
  
      <v-row>
      <v-col class="col-12">
            <v-row>Name : {{personal.title}}. {{personal.fname_eng}}    {{personal.lname_eng}}</v-row>
      </v-col>
      <v-col class="col-12">
            <v-row>ชื่อ : {{personal.fname_th}}    {{personal.lname_th}}</v-row>
      </v-col>
          <v-col class="col-12">
            <v-row>Birthday : {{personal.bd}}    </v-row>
            <v-row>Email : {{personal.email}}</v-row>
      </v-col>
      <v-col class="col-12">
            <v-row>{{personal.id_card}}</v-row>
      </v-col>
      <v-col class="col-12">
            <v-row>{{personal.address}}</v-row>
      </v-col>
      <v-col class="col-12">
            <v-row>{{personal.contact}}</v-row>
      </v-col>
        </v-row>
    </v-card-text>
    <v-card-title>
      Contact Emergency
    </v-card-title>
    <v-card-text>
      <v-row>
      Contact 1
      <v-col class="col-12">    
            <v-row>Name : {{emergency[0].fname}} Lastname {{emergency[0].lname}}</v-row>
            <v-row>Relation : {{emergency[0].relation}}</v-row>
            <v-row>Phone : {{emergency[0].phone}}</v-row>
      </v-col>
      Contact 2
 <v-col class="col-12">    
            <v-row>Name : {{emergency[1].fname}} Lastname {{emergency[1].lname}}</v-row>
            <v-row>Relation : {{emergency[1].relation}}</v-row>
            <v-row>Phone : {{emergency[1].phone}}</v-row>
      </v-col>
      </v-row>
    </v-card-text>
        <v-card-title>
      T-Shirt
    </v-card-title>
    <v-card-text>
      <v-row>
      <v-col class="col-12">
            <v-row>Size : {{souvenir.size}}</v-row>
      </v-col>
      </v-row>
    </v-card-text>
          <v-card-title>
      History Applicant
    </v-card-title>
    <v-card-text>
      <v-row>
      <v-col class="col-12">
            <v-row v-for="(applicant,index) in applicant.history" :key="index">{{applicant}}</v-row>

            <v-row>time_expect  : {{applicant.time_expect}}</v-row>
      </v-col>
      </v-row>
    </v-card-text>
        <v-card-title>
Medical information    
</v-card-title>
    <v-card-text>
      <v-row>
      <v-col class="col-12">
            <v-row>Group Bood : {{medical.bood_type}}</v-row>
            <v-row> Medical allergy :{{medical.information.info1.detail}}</v-row>
            <v-row> Chronic health :{{medical.information.info2.detail}}</v-row>
            <v-row> surgery :{{medical.information.info3.detail}}</v-row>
            <v-row> Plan for having a baby  :{{medical.information.info4.detail}}</v-row>
            <v-row> personal medicine to takey  :{{medical.information.info5.detail}}</v-row>
            <v-row> Injured from a Marathon  :{{medical.information.info6.detail}}</v-row>
            <v-row>  Exercise :{{medical.information.info7.detail}}</v-row>
            <v-row> Felt chest tightness or easily tired during working  :{{medical.information.info8.detail}}</v-row>
      </v-col>
      </v-row>
       <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>
    </v-card-text>
         <v-btn class="mr-4" @click="register" :disabled="!checkbox" color="success">
          Register
        </v-btn>
</v-app>
    
</template>
<script>

export default {
  data: () => ({
            checkbox: false,

    //   draft:'',
      personal:'',
      souvenir:'',
      medical:'',
      emergency:'',
      applicant:''


  }),
  mounted(){
    this.get_dataregister();
  },
    methods:{
        get_dataregister(){
            // this.draft = this.$store.state.running.draft
            this.personal = this.$store.state.running.draft.personal;
            // console.log(personal)
            this.applicant = this.$store.state.running.draft.applicant;
            // console.log(applicant)
            this.medical = this.$store.state.running.draft.medical;
            // console.log(medical)
            this.emergency = this.$store.state.running.draft.emergency;
            // console.log(emergency)
            this.souvenir = this.$store.state.running.draft.souvenir;
            // console.log(souvenir)
        },
            register(){
                var draft = this.$store.state.running.draft;

      this.$store.dispatch("running/register",draft)
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

            }
    
}
</script>