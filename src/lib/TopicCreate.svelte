<script>
  import { Button, FormGroup, Input, Row, Col } from "sveltestrap";
  import { db } from "./db";

  let topicName = "";

  async function addTopic() {
    try {
      if(topicName){
      // Add the new topic!
      const id = await db.topics.add({
        name: topicName,
      });
    }

      // Reset form:
      topicName = "";
    } catch (error) {
      alert(error);
    }
  }
</script>

<form on:submit|preventDefault={addTopic}>
  <Row>
    <Col>
      <FormGroup floating label="Add new topic">
        <Input
          placeholder="Enter a value"
          type="text"
          bind:value={topicName}
        />
      </FormGroup>
    </Col>
    <Col sm="1">
      
      <Button  class="mt-1"  block size="lg" color="primary" disabled={!topicName} >Add</Button>
    </Col>
  </Row>
</form>
