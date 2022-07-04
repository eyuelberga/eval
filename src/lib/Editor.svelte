<script>
    import Editor from "@tinymce/tinymce-svelte";
    export let value;
</script>

<Editor scriptSrc="tinymce/tinymce.min.js" conf={{height:"80vh"}} value={value} />
