<script>
	import { onMount } from "svelte";

	let name ='';
  let email='';
  let id='';
	let users = [];

	onMount(async function(){
		const response = await fetch('http://127.0.0.1:5000/api');
		const data = await response.json();
		users = data;
	});

  async function getuser(getid){
    const response = await fetch(`http://127.0.0.1:5000/api/${getid}`);
		const data = await response.json();
    name = data['name'];
    email=data['email'];
    id = data['id'];
  }





</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
		    <div class="container">
        <div class="row justify-content-center shadow mt-2 mb-4">
           <h3 class="text-center text-danger">User Data</h3>
        </div>

        <table class="table shadow text-center">
            <thead>
              <tr>

				
				<th scope="col">Id </th>
                <th scope="col">Name </th>
                <th scope="col">Email</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
                
			
				
                
           
              </tr>
            </thead>
            <tbody> 
            
				{#each users as user}
                <tr>
				    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                 
                    <td>
                        

                      <button type="button" on:click={()=>getuser(user.id)} data-bs-toggle="modal" data-bs-target="#UpdateEmployeeModal"> <i class="bi bi-pen-fill"></i></button>
                      
                       
                  </td>
                    <td>
						
                      <a href="http://127.0.0.1:5000/api/delete/{user.id}">
                      <i class="bi bi-trash3-fill"></i>
                    </a></td>
                
                  </tr>

              
              <tr>
				{/each}
            
            </tbody>
          </table>

          <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddEmployeeModal">
    Add User
  </button>
  
  <!-- Modal -->
  <form action="http://127.0.0.1:5000/api/" method="POST" enctype="application/x-www-form-urlencoded">
  <div class="modal fade" id="AddEmployeeModal" tabindex="-1" aria-labelledby="AddEmployeeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="AddEmployeeModalLabel">Add New User</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
			
		
      
            <div class="form-group mt-2">
                <input type="text" class="form-control" required placeholder="Enter Name " name="name"/>
            </div>
            <div class="form-group mt-2">
                <input type="text" class="form-control" required placeholder="Enter email" name="email"/>
            </div>
           
      
        </div>
        <div class="modal-footer">
            <div class="form-group mt-2">
          <button class="btn btn-primary" type="submit">Submit</button>
          </div>
		
      
        </div>
	
      </div>
    </div>
  </div>

</form>


<form action="http://127.0.0.1:5000/api/{id}" method="POST" enctype="application/x-www-form-urlencoded">
    <div class="modal fade" id="UpdateEmployeeModal" tabindex="-1" aria-labelledby="UpdateEmployeeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="UpdateEmployeeModalLabel">Update User</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="form-group mt-2">
                <input type="text" class="form-control" id="name" required placeholder="Enter Name " name="name" bind:value={name}/>
            </div>
            <div class="form-group mt-2">
                <input type="text" class="form-control" id="designation" required placeholder="Enter email" name="email" bind:value={email}/>
            </div>
           
            <input type="hidden" class="form-control" id="id" required placeholder="Enter designation" name="id" bind:value={id}/>
        </div>
        <div class="modal-footer">
            <div class="form-group mt-2">
          <button class="btn btn-primary" type="submit">Submit</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</form>
    </div>
</section>
