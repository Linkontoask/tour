import CSS from 'csstype';
export declare type TourEvent = Partial<{
    [key in keyof HTMLElementEventMap]: EventListener;
}>;
export interface Options {
    footer: boolean;
    compulsory: boolean;
    maskClosable: boolean;
}
export interface Steps {
    content: string | HTMLElement;
    DOMString: string | HTMLElement;
    on: TourEvent;
    contentStyles: CSS.Properties;
    timeout: number;
}
export interface Cache {
    tourContainer: null | HTMLElement;
    targetContainer: null | HTMLElement;
    contentContainer: null | HTMLElement;
}
export default class Tour {
    index: number;
    steps: Steps[];
    doc: Document;
    options: Options;
    cache: Cache;
    constructor(options?: {});
    get isComplete(): boolean;
    get isDestoryd(): boolean;
    addStep(step: Steps): this;
    setOptions(options: Options): void;
    show(): this;
    hide(): this;
    next(): this;
    prev(): this;
    start(): this;
    complete(): this;
    clear(): this;
    destory(): void;
    _scroll(): void;
    _createElement(children: string | HTMLElement | HTMLElement[], { className, dataset, style, tag, on, }: Partial<{
        className: string | string[];
        dataset: DOMStringMap;
        style: CSS.Properties;
        tag: keyof HTMLElementTagNameMap;
        on: TourEvent;
    }>): HTMLElement | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | HTMLAnchorElement | HTMLScriptElement | HTMLEmbedElement | HTMLFormElement | HTMLHeadElement | HTMLAreaElement | HTMLObjectElement | HTMLLinkElement | HTMLMapElement | HTMLInputElement | HTMLDataElement | HTMLProgressElement | HTMLTrackElement | HTMLSourceElement | HTMLButtonElement | HTMLFontElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDirectoryElement | HTMLDivElement | HTMLDListElement | HTMLFieldSetElement | HTMLFrameElement | HTMLFrameSetElement | HTMLHeadingElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLMarqueeElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLParamElement | HTMLPictureElement | HTMLPreElement | HTMLSelectElement | HTMLSlotElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLUListElement;
    _fixedPosition(element: HTMLElement, { left, top, width, height }: DOMRect, { marginTop, marginLeft, marginBottom, marginRight }: CSSStyleDeclaration): void;
    _fixedStyle(element: HTMLElement, style: CSS.Properties): void;
    _renderContent(content: string | HTMLElement, contentStyles: CSS.Properties): {
        contentElement: HTMLElement | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | HTMLAnchorElement | HTMLScriptElement | HTMLEmbedElement | HTMLFormElement | HTMLHeadElement | HTMLAreaElement | HTMLObjectElement | HTMLLinkElement | HTMLMapElement | HTMLInputElement | HTMLDataElement | HTMLProgressElement | HTMLTrackElement | HTMLSourceElement | HTMLButtonElement | HTMLFontElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDirectoryElement | HTMLDivElement | HTMLDListElement | HTMLFieldSetElement | HTMLFrameElement | HTMLFrameSetElement | HTMLHeadingElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLMarqueeElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLParamElement | HTMLPictureElement | HTMLPreElement | HTMLSelectElement | HTMLSlotElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLUListElement;
        arrow: HTMLElement | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | HTMLAnchorElement | HTMLScriptElement | HTMLEmbedElement | HTMLFormElement | HTMLHeadElement | HTMLAreaElement | HTMLObjectElement | HTMLLinkElement | HTMLMapElement | HTMLInputElement | HTMLDataElement | HTMLProgressElement | HTMLTrackElement | HTMLSourceElement | HTMLButtonElement | HTMLFontElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDirectoryElement | HTMLDivElement | HTMLDListElement | HTMLFieldSetElement | HTMLFrameElement | HTMLFrameSetElement | HTMLHeadingElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLMarqueeElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLParamElement | HTMLPictureElement | HTMLPreElement | HTMLSelectElement | HTMLSlotElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLUListElement;
    };
    _renderTour(): {
        tourContainer: HTMLElement | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | HTMLAnchorElement | HTMLScriptElement | HTMLEmbedElement | HTMLFormElement | HTMLHeadElement | HTMLAreaElement | HTMLObjectElement | HTMLLinkElement | HTMLMapElement | HTMLInputElement | HTMLDataElement | HTMLProgressElement | HTMLTrackElement | HTMLSourceElement | HTMLButtonElement | HTMLFontElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDirectoryElement | HTMLDivElement | HTMLDListElement | HTMLFieldSetElement | HTMLFrameElement | HTMLFrameSetElement | HTMLHeadingElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLMarqueeElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLParamElement | HTMLPictureElement | HTMLPreElement | HTMLSelectElement | HTMLSlotElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLUListElement;
        targetContainer: HTMLElement | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | HTMLAnchorElement | HTMLScriptElement | HTMLEmbedElement | HTMLFormElement | HTMLHeadElement | HTMLAreaElement | HTMLObjectElement | HTMLLinkElement | HTMLMapElement | HTMLInputElement | HTMLDataElement | HTMLProgressElement | HTMLTrackElement | HTMLSourceElement | HTMLButtonElement | HTMLFontElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDirectoryElement | HTMLDivElement | HTMLDListElement | HTMLFieldSetElement | HTMLFrameElement | HTMLFrameSetElement | HTMLHeadingElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLMarqueeElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLParamElement | HTMLPictureElement | HTMLPreElement | HTMLSelectElement | HTMLSlotElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLUListElement;
        contentContainer: HTMLElement | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | HTMLAnchorElement | HTMLScriptElement | HTMLEmbedElement | HTMLFormElement | HTMLHeadElement | HTMLAreaElement | HTMLObjectElement | HTMLLinkElement | HTMLMapElement | HTMLInputElement | HTMLDataElement | HTMLProgressElement | HTMLTrackElement | HTMLSourceElement | HTMLButtonElement | HTMLFontElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDirectoryElement | HTMLDivElement | HTMLDListElement | HTMLFieldSetElement | HTMLFrameElement | HTMLFrameSetElement | HTMLHeadingElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLMarqueeElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLParamElement | HTMLPictureElement | HTMLPreElement | HTMLSelectElement | HTMLSlotElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLUListElement;
    };
    _render(): void;
}
