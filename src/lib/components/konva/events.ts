import type { KonvaEventObject, Node } from 'konva/lib/Node';

export const KONVA_EVENTS = [
	'mouseover',
	'mouseout',
	'mouseenter',
	'mouseleave',
	'mousemove',
	'mousedown',
	'mouseup',
	'wheel',
	'click',
	'dblclick',
	'touchstart',
	'touchmove',
	'touchend',
	'tap',
	'dbltap',
	'pointerdown',
	'pointermove',
	'pointerup',
	'pointercancel',
	'pointerover',
	'pointerenter',
	'pointerout',
	'pointerleave',
	'pointerclick',
	'pointerdblclick',
	'dragstart',
	'dragmove',
	'dragend',
	'transformstart',
	'transform',
	'transformend'
];

export type KonvaMouseEvent = KonvaEventObject<MouseEvent>;
export type KonvaWheelEvent = KonvaEventObject<WheelEvent>;
export type KonvaTouchEvent = KonvaEventObject<TouchEvent>;
export type KonvaPointerEvent = KonvaEventObject<PointerEvent>;
export type KonvaDragTransformEvent = KonvaEventObject<MouseEvent | PointerEvent | TouchEvent>;

export type KonvaEventHooks = {
	onmouseover?: (e: KonvaMouseEvent) => void;
	onmouseout?: (e: KonvaMouseEvent) => void;
	onmouseenter?: (e: KonvaMouseEvent) => void;
	onmouseleave?: (e: KonvaMouseEvent) => void;
	onmousemove?: (e: KonvaMouseEvent) => void;
	onmousedown?: (e: KonvaMouseEvent) => void;
	onmouseup?: (e: KonvaMouseEvent) => void;
	onwheel?: (e: KonvaWheelEvent) => void;
	onclick?: (e: KonvaMouseEvent) => void;
	ondblclick?: (e: KonvaMouseEvent) => void;
	ontouchstart?: (e: KonvaTouchEvent) => void;
	ontouchmove?: (e: KonvaTouchEvent) => void;
	ontouchend?: (e: KonvaTouchEvent) => void;
	ontap?: (e: KonvaTouchEvent) => void;
	ondbltap?: (e: KonvaTouchEvent) => void;
	onpointerdown?: (e: KonvaPointerEvent) => void;
	onpointermove?: (e: KonvaPointerEvent) => void;
	onpointerup?: (e: KonvaPointerEvent) => void;
	onpointercancel?: (e: KonvaPointerEvent) => void;
	onpointerover?: (e: KonvaPointerEvent) => void;
	onpointerenter?: (e: KonvaPointerEvent) => void;
	onpointerout?: (e: KonvaPointerEvent) => void;
	onpointerleave?: (e: KonvaPointerEvent) => void;
	onpointerclick?: (e: KonvaPointerEvent) => void;
	onpointerdblclick?: (e: KonvaPointerEvent) => void;
	ondragstart?: (e: KonvaDragTransformEvent) => void;
	ondragmove?: (e: KonvaDragTransformEvent) => void;
	ondragend?: (e: KonvaDragTransformEvent) => void;
	ontransformstart?: (e: KonvaDragTransformEvent) => void;
	ontransform?: (e: KonvaDragTransformEvent) => void;
	ontransformend?: (e: KonvaDragTransformEvent) => void;
};

export function registerEvents(props: KonvaEventHooks, node: Node) {
	KONVA_EVENTS.forEach((eventName) => {
		const callback = props[`on${eventName}` as keyof KonvaEventHooks];
		if (callback && typeof callback === 'function') {
			node.on(eventName, (event) => {
				callback(event);
			});
		}
	});
}
