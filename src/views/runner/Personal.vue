<template>
  <v-card>
    <v-container>
    <h2>Personal</h2>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-select
          v-model="title_name"
          :items="title"
          label="Title"
          required
        ></v-select>
        <v-text-field
          v-model="fname_th"
          value="currentDraft"
          :counter="50"
          v-validate="'required|min:5|max:50'"
          name="fname_th"
          label="FristName TH"
          required
        ></v-text-field>
        <v-text-field
          v-model="lname_th"
          :counter="50"
          label="LastName TH"
          required
        ></v-text-field>
        <v-text-field
          v-model="fname_eng"
          :counter="50"
          label="FristName ENG"
          required
        ></v-text-field>
        <v-text-field
          v-model="lname_eng"
          label="LastName ENG"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="rulesemail"
          label="E-mail"
          required
        ></v-text-field>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="bd"
              label="Birthday date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="bd"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>

        <v-text-field
          type="number"
          v-model="id_card"
          :maxlength="10"
          :counter="13"
          :rules="rulesid_card"
          label="ID"
          @keyup="check_id"
          required
        ></v-text-field>
        <v-text-field
          v-model="address"
          :counter="100"
          label="Address"
          required
        ></v-text-field>
       <v-img

  :src="profile_img"
></v-img>
        <v-text-field
          type="number"
          v-model="phone"
          :maxlength="10"
          :counter="10"
          :rules="rulesphone"
          label="Phone"
          required
        ></v-text-field>
          <v-file-input
    @change="selectedimg"
    accept="image/png, image/jpeg, image/bmp"
    placeholder="Pick an avatar"
    prepend-icon="mdi-camera"
  ></v-file-input>

      <v-text-field 
      v-model="name_applicant" 
      :maxlength="10"
      :counter="10" label="Name Applicant"></v-text-field>

  <div v-if="imageError" class="imageError error">
    {{imageError}}
  </div>
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

        <v-btn @click="go_nextpage" :disabled="!nextpage" color="success">
          ถัดไป
        </v-btn>
      </v-form>
    </v-container>

  </v-card>
  
</template>
<script>
export default {

  data: () => ({
      image:{
      size:'',
      height:'',
      width:''
    },
    imageLoaded:true,

    name_applicant:'',
    title_name:'',
    draft: "",
    profile:'',
    fname_eng: "",
    fname_th: "",
    lname_th: "",
    lname_eng: "",
    id_card: "",
    address: "",
    phone: "",
    valid: true,
    email: "",
    bd: null,
    menu: false,
    nextpage: false,
    localdraft: "",
    profile_img:"",

    imageError:'',
    validate_form: false,
    rulesemail: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    rulesid_card: [
      (v) => !!v || "ID_card is required",
      (v) => (v && v.length == 13) || "ID must be less than 13 Number",
    ],
    rulesphone: [
      (v) => v.length <=10 || "10 Number",
    ],

    select: null,
    title: ["Miss", "Mrs.", "Mr", "Miss"],
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
       uppername_applicant: (str) => {
       str = str.replace(/[^a-zA-Z0-9]/g, '');
          return str.toUpperCase() 
        },
    selectedimg(e){
      this.imageLoaded = false;
      
      let file = e
      console.log(file)
      this.imageError = '';     
      if(!file || file.type.indexOf('image/') !== 0) return;
      this.image.size = file.size;
      let reader = new FileReader();
      
      reader.readAsDataURL(file);
      reader.onload = evt => {
        let img = new Image();
        img.onload = () => {
          this.image.width = img.width;
          this.image.height = img.height;
          console.log(this.image);
          
          if(this.image.height!=this.image.width) {
            this.imageError = `Please upload Square Resolution`;
            this.profile_img=null
            return;
          }
          if(this.image.width < 300) {
            this.imageError = `The image width (${this.image.width}px) your img less 300px.`;
            this.profile_img=null

            return;
          }
          if(this.image.height < 300) {
            this.imageError = `The image height (${this.image.height}px) your img less 300px`;
            this.profile_img=null
            return;
          }
          else{
            this.createBase64Img(file)
          }
        }
        img.src = evt.target.result;
      }

      reader.onerror = evt => {
        console.error(evt);
      }
    },

    createBase64Img(fileObject){
      console.log('createBase64Img')
      const reader = new FileReader();
  
      reader.onload=(e)=>{
      console.log(fileObject)
      // this.encodedStr = btoa(this.str);
        console.log((e.target.result))
        this.profile_img = e.currentTarget.result;
      };
      reader.readAsDataURL(fileObject);
      console.log(fileObject)
    },

    getdraft(){
      const currentdarft = this.$store.state.running.draft.personal;
      console.log(currentdarft)
      this.title_name =  currentdarft.title
      this.fname_th =  currentdarft.fname_th
      this.lname_th =  currentdarft.lname_th
      this.fname_eng =  currentdarft.fname_eng
      this.lname_eng =  currentdarft.lname_eng
      this.address =  currentdarft.address
      this.phone = currentdarft.contact
      this.bd = currentdarft.bd
      this.email = currentdarft.email
      this.name_applicant = currentdarft.name_applicant

    },
    check_id() {
      if (this.id_card != "" && this.id_card.length == 13) {
        // this.nextpage = true;
      }
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
    console.log(this.profile_img)
    const draft={

	'draft':{
    'id_user':id,
		'personal':{
      'id_user':id,
      "title":this.title_name,
      "fname_eng":this.fname_eng,
      "lname_eng":this.lname_eng,
      "fname_th":this.fname_th,
      "email":this.email,
      "lname_th":this.lname_th,
      "bd":this.bd,
      "id_card":this.id_card,
      "address":this.address,
      "contact":this.phone,
      "photo":this.profile_img,
      "name_applicant":this.name_applicant
			},
      }
    }
      localStorage.setItem('draft', JSON.stringify(draft));
      this.$store.dispatch("running/savedraft",draft)
      .then(
        (draft) => {
          this.localdraft = (draft.data.draft.personal.id_card);
          //  = draft;
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
      this.$router.push("/History");
    },
 
  },
};
</script>