<template>
  <v-card>
    <v-container>
    <h2>Shirt</h2>

      <v-form ref="form" v-model="valid" lazy-validation>
          <v-select
          v-model="size"
          :items="size_list"
          label="Size Shirt"
          required
        ></v-select>
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

    imageError:'',
    valid: true,
    nextpage:false,
    validate_form: false,
    size:'',
    size_list:["XS","S","M","L","XL","XXL","XXXL"]


  }),
  
  mounted(){
    this.getdraft();
  },
    watch: {
      },
  methods: {
          getdraft(){
      const currentdarft = this.$store.state.running.draft.souvenir;
      console.log(currentdarft)
      this.size =  currentdarft.size



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
    const souvenir = {
     
      'id_user':id,
      "size":this.size,
			},
      currentdarft =JSON.parse(localStorage.getItem('draft'));
      currentdarft.draft.souvenir = souvenir
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

    go_nextpage() {
      this.$router.push("Info_Runing");
    },
    go_previospage() {
      this.$router.push("/Medical");
    },
  },
};
</script>