import type Konva from 'konva';
import { getContext, setContext } from 'svelte';

const stageKey = Symbol('konva-stage');
const layerKey = Symbol('konva-layer');

export function setStageContext(getStage: () => Konva.Stage) {
	setContext(stageKey, getStage);
}
export function getStageContext() {
	const getStage = getContext<() => Konva.Stage>(stageKey);
	if (!getStage) throw new Error('A Layer must have a Stage as a parent.');
	const stage = getStage();
	return stage;
}

export function setLayerContext(layer: Konva.Layer) {
	setContext(layerKey, layer);
}

export function getLayerContext() {
	const layer = getContext<Konva.Layer>(layerKey);
	if (!layer) throw new Error('A Component must have a Layer as a Parent.');

	return layer;
}
