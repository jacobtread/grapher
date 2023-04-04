<script lang="ts">
	import { onMount } from "svelte";



let canvas: HTMLCanvasElement;

let canvasWidth: number = 800;
let canvasHeight: number = 600;

function init() {
    if (!canvas) return;
    let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) {
        console.error("Failed to create 2D context");
        return;
    }

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    // Fill in the canvas with a clear color
    ctx.clearRect(0,0, canvasWidth, canvasHeight);

}

function renderGraph() {

}

function computeData() {
    
}

onMount(init)

</script>

<canvas bind:this={canvas} width={canvasWidth} height={canvasHeight}></canvas>