<template>
  
    <div>
               
        <div class="card">
            <div class="card-header">

                <div class="card-tools">
                    <div class="form-group form-inline">
                        <select name="cm_mode" v-model="cmOptions.mode" @change="onSelectLanguage" id="cm_mode" 
                            class="form-control">
                                <option value="">Select Language</option>
                                <option value="text/x-csrc" >C</option>
                                <option value="text/x-c++src">C++</option>
                                <option value="text/x-java">Java</option>
                                <option value="text/x-python">Python</option>
                        </select>   
                        <button class="btn btn-primary" type='button' @click="createNewFile" >New Project <i class="fas fa-plus-square"></i>
                        </button>
                    </div>
                </div>

            </div>              
                 <form @submit.prevent="onRun" >

                        <div v-show="editorEnabled" class="card-body">
                           
                                <div class="form-group form-inline">
                                       

                                    <div>
                                        <button class="btn btn-primary" type='submit' >Run <i class="fas fa-play fa-fw"></i>
                                        </button>
                                    </div>
                                            
                                </div>             
                            
                                <codemirror v-model="code" :options="cmOptions">               
                                </codemirror> 

                            
                        </div>                     
                        
                </form>   
        </div>    

        <!-- Modal -->
        <div class="modal fade" id="newFileModal" tabindex="-1" role="dialog" aria-labelledby="newFileModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Write name of your project.</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <input v-model="filename" type="text" name="filename" 
                     class="form-control"
                    placeholder="Write your filename here">
                </div>           
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="saveFile">Save</button>
            </div>
            </div>
        </div>
        </div>                   

    </div>  
 
 
</template>


<script>



export default {

  data () {

    return {

        editorEnabled: false,
        newFile: true,
        filename: '',
        extension: '',
        
        form: new Form({
            language: '',
            srcCode: ''
        }),
        
        output: {},          
        code: '',  
              
        cmOptions: {
            // codemirror options
            tabSize: 4,
            mode: '',
            theme: 'base16-dark',
            lineNumbers: true,
            line: true,
        
      }
    }
  },

  methods: {

    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    },

    onRun () {
        this.form.srcCode = this.code
        this.form.post('api/user/runCode')

            .then( () => {
                console.log('this is a response from run code controller', this.output);
            })
            .catch( () => {
                console.log('this is a response from run code controller: ERROR....');
            })

    },

    onSelectLanguage() {

        this.cmOptions.mode = event.target.value;
        
        switch(event.target.value){

            case "text/x-csrc": this.form.language = 'c';
                                this.extension = 'c'
                                break;

            case "text/x-c++src": this.form.language = 'c++';
                                this.extension = 'cpp'
                                break;

            case "text/x-java": this.form.language = 'java';
                                this.extension = 'java'
                                break;

            case "text/x-python": this.form.language = 'python';
                                    this.extension = 'py'
                                break;
            default: this.form.language = "default"
                    break;
        }        
            
    },

    createNewFile() {
        
        $('#newFileModal').modal('show');
    },
    saveFile() {

        //var FileSaver = require('file-saver');

        var blob = new Blob();
        FileSaver.saveAs(blob,this.filename+"."+this.extension);
        $('#newFileModal').modal('hide');
        this.editorEnabled = true;
        
    }    
  },
/*  
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
*/
  mounted() {
    console.log('this is current codemirror object', this.codemirror)
    // you can use this.codemirror to do something...
  }
}
</script>