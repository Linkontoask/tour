import CSS from 'csstype'
import { createPopper, Modifier, OptionsGeneric } from '@popperjs/core'
import { merge, cloneDeep, forIn, isElement } from 'lodash-es'

const defaultOptions: Options = {
  footer: true,
  compulsory: true,
  maskClosable: true,
}

interface AnyObject {
  [key: string]: any
}

export interface PopperOptions extends OptionsGeneric<Modifier<any, any>> {}

export type TourEvent = Partial<{
  [key in keyof HTMLElementEventMap]: EventListener
}>

export interface Options {
  footer: boolean
  compulsory: boolean
  maskClosable: boolean
  popper?: PopperOptions
}

export interface Steps {
  content: string | HTMLElement
  DOMString: string | HTMLElement
  on: TourEvent
  contentStyles: CSS.Properties
  timeout: number
}

export interface Cache {
  tourContainer: null | HTMLElement
  targetContainer: null | HTMLElement
  contentContainer: null | HTMLElement
}

export default class Tour {
  index: number
  steps: Steps[]
  doc: Document
  options: Options
  cache: Cache
  constructor(options = {}) {
    this.index = 0
    this.steps = []
    this.doc = document

    this.options = merge(cloneDeep(defaultOptions), options)

    this.cache = {
      tourContainer: null,
      targetContainer: null,
      contentContainer: null,
    }
  }

  get isComplete() {
    return this.index >= this.steps.length - 1
  }

  get isDestoryd() {
    const { tourContainer } = this.cache
    return !this.doc.contains(tourContainer)
  }

  addStep(step: Steps) {
    this.steps.push(step)
    return this
  }

  setOptions(options: Options) {
    this.options = merge(cloneDeep(this.options), options)
  }

  show() {
    const { tourContainer } = this.cache
    if (tourContainer) {
      tourContainer.style.display = 'block'
    } else {
      this._render()
    }
    return this
  }

  hide() {
    const { tourContainer } = this.cache
    if (tourContainer) {
      tourContainer.style.display = 'none'
    } else {
      this._render()
    }
    return this
  }

  next() {
    this.index++
    this._render()
    return this
  }

  prev() {
    if (this.index > 0) {
      this.index--
    } else {
      // eslint-disable-next-line
      console.warn('stack top null')
    }
    this._render()
    return this
  }

  start() {
    this._render()
    return this
  }

  complete() {
    this.clear()
    const { tourContainer } = this.cache
    if (tourContainer) {
      tourContainer.style.display = 'none'
    }
    return this
  }

  clear() {
    this.index = 0
    this.steps = []
    return this
  }

  destory() {
    const { tourContainer } = this.cache
    if (tourContainer && !this.isDestoryd) {
      this.clear()
      this.doc.body.removeChild(tourContainer)
    }
  }

  _scroll() {}

  _createElement(
    children: string | HTMLElement | HTMLElement[],
    {
      className,
      dataset,
      style,
      tag = 'div',
      on,
    }: Partial<{
      className: string | string[]
      dataset: DOMStringMap
      style: CSS.Properties
      tag: keyof HTMLElementTagNameMap
      on: TourEvent
    }>
  ) {
    const div = this.doc.createElement(tag)
    if (className) {
      if (typeof className === 'string') {
        div.classList.add(className)
      }
      if (Array.isArray(className)) {
        className.forEach((name) => div.classList.add(name))
      }
    }
    if (dataset) {
      merge(div.dataset, dataset)
    }
    if (style && typeof style === 'object') {
      merge(div.style, style)
    }
    if (on && typeof on === 'object') {
      forIn(on, (value, key) => {
        if (value) {
          div.addEventListener(key, value)
        }
      })
    }
    if (typeof children === 'string') {
      div.innerHTML = children
    } else if (Array.isArray(children)) {
      children.forEach((x) => div.appendChild(x))
    } else {
      div.appendChild(children)
    }
    return div
  }

  _fixedPosition(
    element: HTMLElement,
    { left, top, width, height }: DOMRect,
    { marginTop, marginLeft, marginBottom, marginRight }: CSSStyleDeclaration
  ) {
    const offset = 3
    const [mt, ml, mb, mr] = [marginTop, marginLeft, marginBottom, marginRight].map((x) => +x.replace(/px$/g, ''))
    element.style.left = left - offset - ml + 'px'
    element.style.top = top - offset - mt + 'px'
    element.style.width = width + offset * 2 + ml + mr + 'px'
    element.style.height = height + offset * 2 + mt + mb + 'px'
  }

  _fixedStyle(element: HTMLElement, style: CSS.Properties) {
    if (style && typeof style === 'object') {
      merge(element.style, style)
    }
  }

  _renderContent(content: string | HTMLElement, contentStyles: CSS.Properties) {
    const contentElement = this._createElement(this._createElement(content, { tag: 'span' }), {
      className: 'tour-content',
      style: contentStyles,
    })
    const arrow = this._createElement([], { className: 'tour-arrow' })
    const btn = []
    if (this.options.footer) {
      if (this.index > 0) {
        btn.push(
          this._createElement('上一步', {
            className: ['tour-footer-btn', 'tour-footer-btn--prev'],
            on: {
              click: (e: Event) => {
                this.prev()
              },
            },
          })
        )
      }
      if (!this.isComplete) {
        btn.push(
          this._createElement('下一步', {
            className: ['tour-footer-btn', 'tour-footer-btn--next'],
            on: {
              click: () => {
                this.next()
              },
            },
          })
        )
      } else {
        btn.push(
          this._createElement('完成', {
            className: ['tour-footer-btn', 'tour-footer-btn--complete'],
            on: {
              click: () => {
                this.complete()
              },
            },
          })
        )
      }
      const footer = this._createElement(btn, {
        className: 'tour-footer',
      })
      contentElement.appendChild(footer)
    }

    contentElement.appendChild(arrow)

    return { contentElement, arrow }
  }

  _renderTour() {
    const { compulsory, maskClosable } = this.options
    const tourMask = this._createElement([], { className: 'tour-mask' })
    const tourContainer = this._createElement([], {
      className: compulsory ? 'tour-container' : '',
    })
    const targetContainer = this._createElement([], {
      className: 'tour-target-container',
    })
    const contentContainer = this._createElement([], {
      className: compulsory ? ['tour-content-container', 'tour-frame'] : ['tour-content-container'],
    })

    if (maskClosable) {
      tourMask.addEventListener('click', () => {
        tourContainer.style.display = 'none'
      })
    }

    if (compulsory) {
      tourContainer.appendChild(tourMask)
      contentContainer.appendChild(targetContainer)
    }
    tourContainer.appendChild(contentContainer)

    return {
      tourContainer,
      targetContainer,
      contentContainer,
    }
  }

  _render() {
    const step = this.steps[this.index]
    if (step) {
      const { content, DOMString, on, contentStyles, timeout } = step

      if (!this.cache.tourContainer || !this.cache.contentContainer || !this.cache.targetContainer) {
        const { tourContainer, targetContainer, contentContainer } = this._renderTour()
        this.cache.tourContainer = tourContainer
        this.cache.targetContainer = targetContainer
        this.cache.contentContainer = contentContainer
      } else {
        this.cache.contentContainer.innerHTML = ''
        this.cache.targetContainer.innerHTML = ''
        this.cache.contentContainer.appendChild(this.cache.targetContainer)
      }
      const { tourContainer, targetContainer, contentContainer } = this.cache

      let el: HTMLElement
      if (isElement(DOMString)) {
        el = DOMString as HTMLElement
      } else {
        el = this.doc.querySelector(DOMString as string) as HTMLElement
      }

      const target = el.cloneNode(true)

      if (on?.click) {
        target.addEventListener('click', on.click)
        target.addEventListener('click', () => {
          tourContainer.style.display = 'none'
        })
      }

      const { contentElement, arrow } = this._renderContent(content, contentStyles)
      this._fixedPosition(contentContainer, el.getBoundingClientRect(), getComputedStyle(el))

      const popper = createPopper(
        contentContainer,
        contentElement,
        merge(
          {
            placement: 'auto',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 10],
                },
              },
              {
                name: 'arrow',
                options: {
                  element: arrow,
                },
              },
            ],
          },
          this.options.popper
        )
      )
      targetContainer.appendChild(target)
      contentContainer.appendChild(contentElement)

      if (this.doc.contains(tourContainer)) {
        tourContainer.style.display = 'block'
      } else {
        this.doc.body.appendChild(tourContainer)
      }

      contentContainer.addEventListener('transitionend', () => {
        popper.update()
      })

      if (timeout) {
        setTimeout(() => {
          this.destory()
        }, timeout)
      }
    } else {
      // eslint-disable-next-line
      console.warn(`index ${this.index} out bounds. use addStep function.`)
    }
  }
}
