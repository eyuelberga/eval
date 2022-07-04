<script>
  import { ListGroup, ListGroupItem, Button, Row, Col, Icon } from 'sveltestrap';
   import { liveQuery } from "dexie";
   import { db } from "./db";

   let schedules = liveQuery(
     () => db.schedules.toArray()
   );
 

   /**
* @param {any} id
*/
   async function remove(id) {
   try {
     await db.schedules.delete(id)

   } catch (error) {
     alert(error)
   }
 }


 </script>
   <ListGroup>
     <ListGroupItem disabled>All Schedules</ListGroupItem>
     {#if $schedules}
     {#each $schedules as schedule (schedule.id)}
     <ListGroupItem><Row><Col><h5 class="mt-1">{schedule.name} [{schedule.student}]</h5></Col> <Col sm="1"> <Button color="danger" on:click={()=>{remove(schedule.id)}}><Icon name="trash" /></Button></Col> </Row></ListGroupItem>
      
     {/each}
   {/if}
  
   </ListGroup>

 