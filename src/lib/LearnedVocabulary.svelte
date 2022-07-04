<script>
  import { Button, FormGroup, Input, Row, Col } from "sveltestrap";
  import WordFetch from "./WordFetch.svelte";

  export let onSubmit;
  let word = "";
  let definition = "";
  let definitions = [];

  async function add() {
    try {
      if (word && definition) {
        if (onSubmit) {
          onSubmit({ word, definition });
        }
      }
      // Reset form:
      word = "";
      definition = "";
    } catch (error) {
      alert(error);
    }
  }
</script>

<form on:submit|preventDefault={add}>
  <Row>
    <Col>
      <WordFetch
        onFetch={({ word: w, definitions: d }) => {
          word = `${w}`;
          definitions = [...d];
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
    <Col>
      <FormGroup floating label="Definition">
        <Input
          placeholder="Enter a value"
          type="select"
          bind:value={definition}
        >
          {#if definitions}
            <option disabled selected value> -- select an option -- </option>
            {#each definitions as d (d)}
              <option value={d}>{d}</option>
            {/each}
          {/if}
        </Input>
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col />
    <Col sm="2">
      <Button
        class="mt-1"
        block
        size="lg"
        color="secondary"
        disabled={!word || !definition}>Add</Button
      >
    </Col>
  </Row>
</form>
