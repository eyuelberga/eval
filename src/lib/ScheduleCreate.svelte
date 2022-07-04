<script>
  import { db } from "./db";
  import { liveQuery } from "dexie";
  import { Button, FormGroup, Input, Row, Col } from "sveltestrap";

  let students = liveQuery(() => db.students.toArray());

  let scheduleName = "";
  let student = "";

  async function addSchedule() {
    try {
      if (scheduleName && student) {
        // Add the new schedule!
        const id = await db.schedules.add({
          name: scheduleName,
          student,
        });
      }

      // Reset form:
      scheduleName = "";
      student = "";
    } catch (error) {
      alert(error);
    }
  }
</script>

<form on:submit|preventDefault={addSchedule}>
  <Row>
    <Col>
      <FormGroup floating label="Schedule name">
        <Input
          placeholder="Enter a value"
          type="text"
          bind:value={scheduleName}
        />
      </FormGroup>
    </Col>
    <Col>
      <FormGroup floating label="Select student">
        <Input type="select" bind:value={student}>
       
          {#if $students}
          <option disabled selected value> -- select an option -- </option>
            {#each $students as student (student.id)}
              <option value={student.name}>{student.name}</option>
            {/each}
          {/if}
        </Input>
      </FormGroup>
    </Col>
    <Col sm="1">
      
      <Button  class="mt-1"  block size="lg" color="primary" disabled={!scheduleName || !student} >Add</Button>
    </Col>
  </Row>
</form>
