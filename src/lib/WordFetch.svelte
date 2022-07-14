<script>
  import fetchWord, {fromDictAPI} from "./dictionary";
  import { Button, FormGroup, Input, Row, Col } from "sveltestrap";

  let loading = false;
  let searchWord = "";
  export let onFetch;

  async function getWord() {
    loading = true;
    try {
      const payload = (await fetchWord(searchWord))[0];
      const dictionary = await fromDictAPI(searchWord);

      const meanings = payload.meanings;
      const definitions = [];
      meanings.forEach(({ definitions: ds }) => {
        ds.forEach(({ definition }) => {
          definitions.push(definition);
        });
      });
      if (onFetch) {
        onFetch({
          word: payload.word,
          phonetics: dictionary.phonetics,
          definitions,
        });
      }
      searchWord = "";
    } catch (error) {
      alert(error);
    }
    loading = false;
  }
</script>

<form on:submit|preventDefault={getWord}>
  <Row>
    <Col>
      <FormGroup floating label="Search Dictionary">
        <Input
          placeholder="Enter a value"
          type="text"
          bind:value={searchWord}
          disabled={loading}
        />
      </FormGroup>
    </Col>
    <Col sm="2">
      <Button
        class="mt-1"
        block
        size="lg"
        color="primary"
        disabled={!searchWord || loading}>Search</Button
      >
    </Col>
  </Row>
</form>
