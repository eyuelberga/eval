<script>
 import { onMount } from 'svelte';
 import { Button, FormGroup, Input, Row, Col } from "sveltestrap";



  let teacherName = "";

  onMount(()=>{
   teacherName =  localStorage.getItem("teacher");
  });

  


  async function addTeacher() {
    try {
      if(teacherName){
      localStorage.setItem("teacher",teacherName);
      alert("Successfully updated!")

      }
    } catch (error) {
     alert(error)
    }
  }
</script>

<form on:submit|preventDefault={addTeacher}>
  <Row>
    <Col>
      <FormGroup floating label="Update teacher name">
        <Input
          placeholder="Enter a value"
          type="text"
          bind:value={teacherName}
        />
      </FormGroup>
    </Col>
    <Col sm="1">
      
      <Button  class="mt-1"  block size="lg" color="primary" disabled={!teacherName} >Update</Button>
    </Col>
  </Row>
</form>

