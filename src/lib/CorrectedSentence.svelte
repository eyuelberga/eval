<script>
  import { Button, FormGroup, Input, Row, Col } from "sveltestrap";

export let onSubmit;
  let incorrect = "";
  let correct = "";

  async function add() {
    try {
      if(incorrect && correct){
      if(onSubmit){
        onSubmit({incorrect,correction:correct})
      }
    }
      // Reset form:
      incorrect = "";
      correct = "";
    } catch (error) {
      alert(error);
    }
  }
</script>

<form on:submit|preventDefault={add}>
  <Row>
    <Col>
      <FormGroup floating label="Incorrect">
        <Input
          placeholder="Enter a value"
          type="text"
          bind:value={incorrect}
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col>
      <FormGroup floating label="Correction">
        <Input
          placeholder="Enter a value"
          type="textarea"
          bind:value={correct}
        />
      </FormGroup>
    </Col>
   
  </Row>
  <Row>
     <Col></Col>
    <Col sm="2">
      <Button  class="mt-1"  block size="lg" color="secondary" disabled={!incorrect || !correct} >Add</Button>
    </Col>
  </Row>
</form>
