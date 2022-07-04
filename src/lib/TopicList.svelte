<script>
  import { ListGroup, ListGroupItem, Button, Row, Col, Icon } from 'sveltestrap';
   import { liveQuery } from "dexie";
   import { db } from "./db";

   let topics = liveQuery(
     () => db.topics.toArray()
   );
 

   /**
* @param {any} id
*/
   async function remove(id) {
   try {
     await db.topics.delete(id)

   } catch (error) {
     alert(error)
   }
 }


 </script>
   <ListGroup>
     <ListGroupItem disabled>All Topics</ListGroupItem>
     {#if $topics}
     {#each $topics as topic (topic.id)}
     <ListGroupItem><Row><Col><h5 class="mt-1">{topic.name}</h5></Col> <Col sm="1"> <Button color="danger" on:click={()=>{remove(topic.id)}}><Icon name="trash" /></Button></Col> </Row></ListGroupItem>
      
     {/each}
   {/if}
  
   </ListGroup>

 