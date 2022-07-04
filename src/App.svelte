<script>
  import { onMount } from "svelte";
  import {
    TabContent,
    Container,
    TabPane,
    Navbar,
    NavbarBrand,
  } from "sveltestrap";
  import StudentCreate from "./lib/StudentCreate.svelte";
  import StudentList from "./lib/StudentList.svelte";
  import TopicCreate from "./lib/TopicCreate.svelte";
  import TopicList from "./lib/TopicList.svelte";
  import ScheduleCreate from "./lib/ScheduleCreate.svelte";
  import TeacherCreate from "./lib/TeacherCreate.svelte";
  import ScheduleList from "./lib/ScheduleList.svelte";
  import WordFetch from "./lib/WordFetch.svelte";
  import Daily from "./lib/Daily.svelte";
</script>

<main>
  <Navbar class="mb-4" color="secondary" dark>
    <NavbarBrand href="/">Evaluation Generator</NavbarBrand>
  </Navbar>
  <Container fluid>
    <TabContent>
      <TabPane tabId="daily" tab="Daily Evaluation" active>
        <Navbar class="mb-1" color="light" light>
          <NavbarBrand>Daily Evaluation</NavbarBrand>
        </Navbar>
        <Daily />
      </TabPane>
      <TabPane tabId="students" tab="Students">
        <Navbar class="mb-4" color="light" light>
          <NavbarBrand>Students</NavbarBrand>
        </Navbar>
        <StudentCreate />
        <StudentList />
      </TabPane>
      <TabPane tabId="topics" tab="Topics">
        <Navbar class="mb-4" color="light" light>
          <NavbarBrand>Topics</NavbarBrand>
        </Navbar>
        <TopicCreate />
        <TopicList />
      </TabPane>

      <TabPane tabId="schedules" tab="Schedules">
        <Navbar class="mb-4" color="light" light>
          <NavbarBrand>Schedules</NavbarBrand>
        </Navbar>
        <ScheduleCreate />
        <ScheduleList />
      </TabPane>

      <TabPane tabId="teacher" tab="Teacher">
        <Navbar class="mb-4" color="light" light>
          <NavbarBrand>Teacher</NavbarBrand>
        </Navbar>
        <TeacherCreate />
      </TabPane>
    </TabContent>
  </Container>
</main>
