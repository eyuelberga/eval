<script>
  import { db } from "./db";
  import { onMount } from "svelte";
  import { liveQuery } from "dexie";
  import {generateDailyEvaluation} from "./generator";

  import {
    Navbar,
    NavbarBrand,
    Button,
    FormGroup,
    Card,
    CardBody,
    CardHeader,
    Icon,
    CardTitle,
    Input,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    TabContent,
    TabPane,
  } from "sveltestrap";
  import CorrectedSentence from "./CorrectedSentence.svelte";
  import MispronouncedWord from "./MispronouncedWord.svelte";
  import LearnedVocabulary from "./LearnedVocabulary.svelte";
  import Editor from "./Editor.svelte";

  let students = liveQuery(() => db.students.toArray());
  let topics = liveQuery(() => db.topics.toArray());

  let schedules = liveQuery(() => db.schedules.toArray());

  let scheduleList = [];

  onMount(() => {
    schedules.subscribe((x) => {
      scheduleList = x;
    });
  });
  let payload = {
    teacherNickname: localStorage.getItem("teacher"),
    correctedSentences: [],
    mispronouncedWords: [],
    learnedVocabulary: [],
  };

  $: evaluation = generateDailyEvaluation(payload)
  /**
   * @param {any} s
   */
  function removeCorrection(s) {
    payload.correctedSentences = payload.correctedSentences.filter(
      ({ incorrect }) => s.incorrect !== incorrect
    );
  }
  /**
   * @param {any} s
   */
  function addCorrection(s) {
    payload.correctedSentences = [...payload.correctedSentences, s];
  }

  /**
   * @param {any} s
   */
  function removeWord(s) {
    payload.mispronouncedWords = payload.mispronouncedWords.filter(
      (/** @type {any} */ w) => s !== w
    );
  }
  /**
   * @param {any} s
   */
  function addWord(s) {
    payload.mispronouncedWords = [...payload.mispronouncedWords, s];
  }
  /**
   * @param {any} e
   */
  function autoFillSchedule(e) {
    const s = e.target.value;
    const found = scheduleList.find(({ student }) => student === s);
    payload.schedule = found ? found.name : "";
  }

  /**
   * @param {any} s
   */
  function removeVocabulary(s) {
    payload.learnedVocabulary = payload.learnedVocabulary.filter(
      ({ word }) => s.word !== word
    );
  }
  /**
   * @param {any} s
   */
  function addVocabulary(s) {
    payload.learnedVocabulary = [...payload.learnedVocabulary, s];
  }
</script>

<TabContent>
  <TabPane tabId="form" tab="Form" active>
    <Navbar class="mb-2" color="light" light>
      <NavbarBrand>Evaluation Form</NavbarBrand>
    </Navbar>
    <Row>
      <Col>
        <FormGroup floating label="Select student">
          <Input
            type="select"
            bind:value={payload.student}
            on:change={autoFillSchedule}
          >
            {#if $students}
              <option disabled selected value> -- select an option -- </option>
              {#each $students as student (student.id)}
                <option value={student.name}>{student.name}</option>
              {/each}
            {/if}
          </Input>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup floating label="Select schedule">
          <Input type="select" bind:value={payload.schedule}>
            {#if $schedules}
              <option disabled selected value> -- select an option -- </option>
              {#each $schedules as schedule (schedule.id)}
                <option value={schedule.name}>{schedule.name}</option>
              {/each}
            {/if}
          </Input>
        </FormGroup>
      </Col>
    </Row>

    <Row>
      <Col>
        <FormGroup floating label="Select topic">
          <Input type="select" bind:value={payload.topic}>
            {#if $topics}
              <option disabled selected value> -- select an option -- </option>
              {#each $topics as topic (topic.id)}
                <option value={topic.name}>{topic.name}</option>
              {/each}
            {/if}
          </Input>
        </FormGroup>
      </Col>

      <Col sm="2">
        <FormGroup floating label="Book page">
          <Input
            placeholder="Enter a value"
            type="number"
            bind:value={payload.bookPage}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <FormGroup floating label="Teacher Nickname">
          <Input
            placeholder="Enter a value"
            type="text"
            bind:value={payload.teacherNickname}
          />
        </FormGroup>
      </Col>
    </Row>
    <Row class="mb-3">
      <Col>
        <ListGroup>
          <Card class="mb-1">
            <CardHeader>
              <CardTitle>Add Corrected Sentences</CardTitle>
            </CardHeader>
            <CardBody>
              <CorrectedSentence onSubmit={addCorrection} />
            </CardBody>
          </Card>
          {#if payload.correctedSentences}
            {#each payload.correctedSentences as s, index (s.incorrect + s.correction)}
              <ListGroupItem>
                <Row>
                  <Col sm="1"><h4>{index + 1}</h4></Col>
                  <Col>
                    <ListGroup>
                      <ListGroupItem class="bg-danger text-white" style="opacity:0.9;"
                        ><strong>Incorrect:</strong>
                        {s.incorrect}</ListGroupItem
                      >
                      <ListGroupItem class="bg-success text-white" style="opacity:0.9;"
                        ><strong>Correction:</strong> {s.correction}</ListGroupItem
                      >
                    </ListGroup>
                  </Col>
                  <Col sm="1"
                    ><Button
                      class="mt-3"
                      color="danger"
                      size="lg"
                      on:click={() => {
                        removeCorrection(s);
                      }}><Icon name="trash" /></Button
                    ></Col
                  >
                </Row>
              </ListGroupItem>
            {/each}
          {/if}
        </ListGroup>
      </Col>
    </Row>

    <Row class="mb-3">
      <Col>
        <ListGroup>
          <Card class="mb-1">
            <CardHeader>
              <CardTitle>Add Mispronounced Word</CardTitle>
            </CardHeader>
            <CardBody>
              <MispronouncedWord onSubmit={addWord} />
            </CardBody>
          </Card>
          {#if payload.mispronouncedWords}
            {#each payload.mispronouncedWords as w, index (w)}
              <ListGroupItem>
                <Row>
                  <Col sm="1"><h4>{index + 1}</h4></Col>
                  <Col>
                    <h5 class="mt-2">{w}</h5>
                  </Col>
                  <Col sm="1"
                    ><Button
                      color="danger"
                      size="lg"
                      on:click={() => {
                        removeWord(w);
                      }}><Icon name="trash" /></Button
                    ></Col
                  >
                </Row>
              </ListGroupItem>
            {/each}
          {/if}
        </ListGroup>
      </Col>
    </Row>

    <Row class="mb-3">
      <Col>
        <ListGroup>
          <Card class="mb-1">
            <CardHeader>
              <CardTitle>Add Learned Vocabulary</CardTitle>
            </CardHeader>
            <CardBody>
              <LearnedVocabulary onSubmit={addVocabulary} />
            </CardBody>
          </Card>
          {#if payload.learnedVocabulary}
            {#each payload.learnedVocabulary as w, index (w)}
              <ListGroupItem>
                <Row>
                  <Col sm="1"><h4>{index + 1}</h4></Col>
                  <Col>
                    <ListGroup>
                      <ListGroupItem><strong>{w.word}</strong></ListGroupItem>
                      <ListGroupItem>{w.definition}</ListGroupItem>
                    </ListGroup>
                  </Col>
                  <Col sm="1"
                    ><Button
                      color="danger"
                      size="lg"
                      on:click={() => {
                        removeVocabulary(w);
                      }}><Icon name="trash" /></Button
                    ></Col
                  >
                </Row>
              </ListGroupItem>
            {/each}
          {/if}
        </ListGroup>
      </Col>
    </Row>

    <Row>
      <Col>
        <FormGroup floating label="Next Topic">
          <Input type="select" bind:value={payload.nextTopic}>
            {#if $topics}
              <option disabled selected value> -- select an option -- </option>
              {#each $topics as topic (topic.id)}
                <option value={topic.name}>{topic.name}</option>
              {/each}
            {/if}
          </Input>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup floating label="Next Page">
          <Input
            placeholder="Enter a value"
            type="number"
            bind:value={payload.nextPage}
          />
        </FormGroup>
      </Col>
    </Row>

    <Row>
      <Col>
        <FormGroup floating label="Reminder/Feedback">
          <Input
            placeholder="Enter a value"
            type="textarea"
            style="height:150px;"
            bind:value={payload.reminder}
          />
        </FormGroup>
      </Col>
    </Row>

  </TabPane>
  <TabPane tabId="editor" tab="Text Editor">
    <Navbar class="mb-2" color="light" light>
      <NavbarBrand>Text Editor</NavbarBrand>
    </Navbar>
    <Editor value={evaluation} />
  </TabPane>
</TabContent>
