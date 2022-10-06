var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ActivateWebElement_options;
export const DEFAULT_STYLES = `
	* {
		user-select: none;
	}

	:host {
		position: fixed;
		z-index: 999;
		right: 5vw;
		bottom: 5vw;
		opacity: 50%;
		filter: invert(50%);
		font-size: 16px;
		/* System Fonts as used by Medium and WordPress, copy-pasted from https://css-tricks.com/snippets/css/system-font-stack/ */
		font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
		text-align: start;
	}

	.activateTitle {
		font-size: 1.5em;
	}

	.activateDetail {
		font-size: .9em;
		max-width: 40ch;
	}

	a {
		color: inherit;
		text-decoration: underline;
	}

	a:hover {
		text-decoration: underline dashed;
	}

	a:visited {
		color: inherit;
	}
`;
const ATTR_LC_MAP = {
    'gototext': 'gotoText',
    'gotolink': 'gotoLink',
    'titlehtml': 'titleHtml',
    'detailhtml': 'detailHtml',
};
export const OPTION_KEYS = ['name', 'gotoText', 'gotoLink', 'titleHtml', 'detailHtml'];
const FALSY_STRINGS = ['false', 'null', 'undefined'];
const TAG_NAME = 'activate-web';
export const DEFAULT_OPTIONS = {
    name: 'Open Web',
    gotoText: 'your favorite editor',
    gotoLink: '',
    titleHtml: '',
    detailHtml: '',
};
export default class ActivateWebElement extends HTMLElement {
    constructor() {
        super();
        _ActivateWebElement_options.set(this, Object.create(DEFAULT_OPTIONS));
        this.titleEl = document.createElement('div');
        this.titleEl.setAttribute('class', 'activateTitle');
        this.detailEl = document.createElement('div');
        this.detailEl.setAttribute('class', 'activateDetail');
        const defaultStyleEl = document.createElement('style');
        defaultStyleEl.textContent = DEFAULT_STYLES;
        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot?.append(defaultStyleEl, this.titleEl, this.detailEl);
        this.mutationObserver = new MutationObserver(() => {
            this.updateTitle();
            this.updateDetail();
        });
    }
    get name() {
        return __classPrivateFieldGet(this, _ActivateWebElement_options, "f").name;
    }
    get gotoText() {
        return __classPrivateFieldGet(this, _ActivateWebElement_options, "f").gotoText;
    }
    get gotoLink() {
        return __classPrivateFieldGet(this, _ActivateWebElement_options, "f").gotoLink;
    }
    get titleHtml() {
        return __classPrivateFieldGet(this, _ActivateWebElement_options, "f").titleHtml;
    }
    get detailHtml() {
        return __classPrivateFieldGet(this, _ActivateWebElement_options, "f").detailHtml;
    }
    set name(value) {
        __classPrivateFieldGet(this, _ActivateWebElement_options, "f").name = value;
        this.updateTitle();
        this.updateDetail();
    }
    set gotoText(value) {
        __classPrivateFieldGet(this, _ActivateWebElement_options, "f").gotoText = value;
        this.updateDetail();
    }
    set gotoLink(value) {
        __classPrivateFieldGet(this, _ActivateWebElement_options, "f").gotoLink = value;
        this.updateDetail();
    }
    set titleHtml(value) {
        __classPrivateFieldGet(this, _ActivateWebElement_options, "f").titleHtml = value;
        this.updateTitle();
    }
    set detailHtml(value) {
        __classPrivateFieldGet(this, _ActivateWebElement_options, "f").detailHtml = value;
        this.updateDetail();
    }
    updateAttribute(attr, value) {
        if (attr in ATTR_LC_MAP) {
            // @ts-ignore
            attr = ATTR_LC_MAP[attr];
        }
        if (!OPTION_KEYS.includes(attr)) {
            return;
        }
        switch (attr) {
            case 'titleHtml':
            case 'detailHtml':
                if (FALSY_STRINGS.includes(value)) {
                    value = '';
                }
        }
        if (FALSY_STRINGS.includes(value)) {
            return;
        }
        // @ts-ignore
        __classPrivateFieldGet(this, _ActivateWebElement_options, "f")[attr] = value;
        switch (attr) {
            case 'name':
            case 'titleHtml':
            case 'detailHtml':
                this.updateTitle();
            case 'gotoText':
            case 'gotoLink':
                this.updateDetail();
        }
    }
    updateTitle() {
        this.titleEl.innerHTML = this.titleHtml || this._titleHtml();
    }
    updateDetail() {
        this.detailEl.innerHTML = this.detailHtml || this._detailHtml();
    }
    _titleHtml() {
        return `Activate ${__classPrivateFieldGet(this, _ActivateWebElement_options, "f").name}`;
    }
    _detailHtml() {
        return `Go to ${this._makeGoto()} to activate ${__classPrivateFieldGet(this, _ActivateWebElement_options, "f").name}.`;
    }
    _makeGoto() {
        const text = __classPrivateFieldGet(this, _ActivateWebElement_options, "f").gotoText;
        const link = __classPrivateFieldGet(this, _ActivateWebElement_options, "f").gotoLink;
        return link ? `<a href="${link}">${text}</a>` : text;
    }
    static get observedAttributes() {
        return Object.keys(ATTR_LC_MAP);
    }
    connectedCallback() {
        let attr;
        for (attr in __classPrivateFieldGet(this, _ActivateWebElement_options, "f")) {
            const value = this.getAttribute(attr);
            if (value && value !== __classPrivateFieldGet(this, _ActivateWebElement_options, "f")[attr] && value !== 'false') {
                __classPrivateFieldGet(this, _ActivateWebElement_options, "f")[attr] = value;
            }
        }
        this.updateTitle();
        this.updateDetail();
        this.mutationObserver.observe(this, {
            attributeFilter: ActivateWebElement.observedAttributes
        });
    }
    disconnectedCallback() {
        this.mutationObserver.disconnect();
    }
    attributeChangedCallback(attr, _, curr) {
        this.updateAttribute(attr, curr);
    }
}
_ActivateWebElement_options = new WeakMap();
export function registerCustomElement() {
    if (!window.customElements.get(TAG_NAME)) {
        window.ActivateWebElement = ActivateWebElement;
        window.customElements.define(TAG_NAME, ActivateWebElement);
    }
}
registerCustomElement();
