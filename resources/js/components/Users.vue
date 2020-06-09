<template>
    <div class="container">
        <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Table</h3>

                <div class="card-tools">
                    <button class="btn btn-primary" @click="newModal">Add New <i class="fas fa-user-plus fa-fw"></i>
                    </button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registration Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td>{{user.id}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.email}}</td>                
                      <td>{{user.type | upText}}</td>
                      <td>{{user.created_at | createdDate}}</td>
                      
                      
                      <td>
                        <a @click="editModal(user)" >
                            <i class="fa fa-edit blue">                                 
                            </i>
                               
                        </a>
                        /
                        <a @click="deleteUser(user.id)">
                            <i class="fa fa-trash red ">                                 
                            </i>
                        </a>
                      </td>
                    </tr>
                   
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>

                <!-- Modal -->
        
            <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNew" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addNew" v-show="!editMode">Create New User</h5>
                        <h5 class="modal-title" id="addNew" v-show="editMode">Update User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form @submit.prevent="editMode ? updateUser() : createUser()">

                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.name" type="text" name="name"
                            placeholder="Name"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name"></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.email" type="email" name="email"
                            placeholder="E-mail Address"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email"></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.password" type="password" name="password" id="password"
                            placeholder="Password"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>

                        <div class="form-group">
                            <select name="type" v-model="form.type" id="type" 
                            class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                <option value="">Select User Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">Standard User</option>
                                <option value="author">Author</option>
                            </select>
                            <has-error :form="form" field="type"></has-error>
                        </div>

                        <div class="form-group">
                            <textarea v-model="form.bio" type="text" name="bio" id="bio"
                            placeholder="Short Bio for User (Optional)"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                            <has-error :form="form" field="bio"></has-error>
                        </div>

                        <div class="form-group">
                            <input v-model="form.photo" type="text" name="photo"
                            placeholder="Photo"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('photo') }">
                            <has-error :form="form" field="photo"></has-error>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button :disabled="form.busy" v-show="editMode" type="submit" class="btn btn-success">Upate</button>
                        <button :disabled="form.busy" v-show="!editMode" type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    </form>

                    </div>
                </div>
            </div>
    </div>
</template>

<script>

    export default {
        data ()  {
            return {

                editMode: false,
                users: {},

                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: '',
                
                })
            }
        },        
       
         methods: {

            updateUser (){

                this.$Progress.start();
                this.form.put('api/user/'+ this.form.id)
                    .then( () => {

                    $('#addNew').modal('hide');

                        swal.fire(
                            'Updated',
                            'Information has been updated.',
                            'success'
                            );

                        Fire.$emit('afterUserCreated');
                            this.$Progress.finish()
                    })
                    .catch( () => {
                        this.$Progress.fail();
                    });

            },
             
            editModal (user) 
            {
                this.editMode = true;
                this.form.reset();
                $('#addNew').modal('show');
                this.form.fill(user);
            },

            newModal () 
            {
                this.editMode = false;
                this.form.reset();
                $('#addNew').modal('show');
            },

            deleteUser (id) {

                swal.fire({
                title: 'Are you sure you want to delete ?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then( (result) => {

                    if(result.value)
                    {
                        this.form.delete('api/user/'+id)
                        .then( () => {

                            Fire.$emit('afterUserCreated');
                           
                            swal.fire(
                            'Deleted!',
                            'User has been deleted.',
                            'success'
                            )
                        })                      
                        .catch( ()=> {
                            swal("Failed", "There was something wrong!", "warning");

                        })
                    }
                })                   

            },

            createUser () {
                this.$Progress.start();

                this.form.post('api/user')
                    .then( () => {
                        Fire.$emit('afterUserCreated');

                        $('#addNew').modal('hide');

                        toast.fire({
                            icon: 'success',
                            title: 'User Created Successfully!'
                            })

                        this.$Progress.finish()

                    })
                    .catch( ()=> {

                    })

                
            
            },

            loadUsers()  {
                axios.get("api/user").then(({ data }) => (this.users = data.data)); 
            }
        },

        created() {
            this.loadUsers();
            Fire.$on('afterUserCreated',() => {
                this.loadUsers();
            });
        }
    }
</script>
