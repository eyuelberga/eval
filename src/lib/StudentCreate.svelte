<script>
  import { Button, FormGroup, Input, Row, Col } from "sveltestrap";
  import { db } from "./db";

  let studentName = "";

  async function addStudent() {
    try {
      if(studentName){
      // Add the new student!
      const id = await db.students.add({
        name: studentName,
      });
    }

      // Reset form:
      studentName = "";
    } catch (error) {
      alert(error);
    }
  }
</script>

<form on:submit|preventDefault={addStudent}>
  <Row>
    <Col>
      <FormGroup floating label="Add new student">
        <Input
          placeholder="Enter a value"
          type="text"
          bind:value={studentName}
        />
      </FormGroup>
    </Col>
    <Col sm="1">
      
      <Button  class="mt-1"  block size="lg" color="primary" disabled={!studentName} >Add</Button>
    </Col>
  </Row>
</form>
