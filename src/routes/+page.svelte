<script lang="ts">

	import Graph from "$lib/components/Graph.svelte";
import { columnNames } from "$lib/data";

</script>

{$columnNames}

<Graph/>