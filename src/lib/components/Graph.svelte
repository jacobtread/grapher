<script lang="ts">
	import { rows, type Row } from "$lib/data";
	import { GRAPHS, defaultSettings, type GraphType, type SettingsCollection, type DerivedSettings, type CanvasData } from "$lib/graph/graph";
import { onMount } from "svelte";



let canvas: HTMLCanvasElement;

let context: CanvasRenderingContext2D | null;

let canvasWidth: number = 800;
let canvasHeight: number = 600;

let graph: GraphType<any, any> = GRAPHS[0];
let settings: DerivedSettings<any> | null = null;
let computedData: any | null = null;
let canvasData: CanvasData = {width: canvasWidth, height: canvasHeight};

function init() {
    if (!canvas) return;
    context = canvas.getContext("2d");
    if (!context) {
        console.error("Failed to create 2D context");
        return;
    }

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    canvasData = {width: canvasWidth, height: canvasHeight};

    settings = defaultSettings(graph.settings);
    computedData = graph.compute($rows, settings);
}



onMount(init);

$: {
    settings = defaultSettings(graph.settings);
}

$: if (settings != null) {
    graph.compute($rows, settings);
}

$: if (computedData != null && context != null && settings != null) {
    // Fill in the canvas with a clear color
    context.clearRect(0,0, canvasWidth, canvasHeight);
    graph.render(computedData, settings, context, canvasData);
}

</script>

{#each GRAPHS as graph}
    <h2>{graph.name}</h2>
{/each}

<canvas bind:this={canvas} width={canvasWidth} height={canvasHeight}></canvas>