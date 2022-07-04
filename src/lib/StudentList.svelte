<script>
   import { ListGroup, ListGroupItem, Button, Row, Col, Icon } from 'sveltestrap';
    import { liveQuery } from "dexie";
    import { db } from "./db";

    let students = liveQuery(
      () => db.students.toArray()
    );
  

    /**
* @param {any} id
*/
    async function remove(id) {
    try {
      await db.students.delete(id)

    } catch (error) {
      alert(error)
    }
  }


  </script>
    <ListGroup>
      <ListGroupItem disabled>All Students</ListGroupItem>
      {#if $students}
      {#each $students as student (student.id)}
      <ListGroupItem><Row><Col><h5 class="mt-1">{student.name}</h5></Col> <Col sm="1"> <Button color="danger" on:click={()=>{remove(student.id)}}><Icon name="trash" /></Button></Col> </Row></ListGroupItem>
       
      {/each}
    {/if}
   
    </ListGroup>
 
  