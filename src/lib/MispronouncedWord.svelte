<script>
  import { Button, FormGroup, Input, Row, Col } from "sveltestrap";
  import WordFetch from "./WordFetch.svelte";

  export let onSubmit;
  let word = "";

  async function add() {
    try {
      if (word) {
        if (onSubmit) {
          onSubmit(word);
        }
      }
      // Reset form:
      word = "";
    } catch (error) {
      alert(error);
    }
  }
</script>

<form on:submit|preventDefault={add}>
  <Row>
    <Col>
      <WordFetch
        onFetch={({ word: w, phonetics }) => {
          word = `${w}[${phonetics}]`;
        }}
      />
    </Col>
  </Row>
  <Row>
    <Col>
      <FormGroup floating label="Word">
        <Input placeholder="Enter a value" type="text" bind:value={word} />
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col></Col>
    <Col sm="2">
      <Button class="mt-1" block size="lg" color="secondary" disabled={!word}
        >Add</Button
      >
    </Col>
  </Row>
</form>
