// <nlh-contact> is a vanilla web component loaded from /nlh/nlh-contact.js (see index.html).
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'nlh-contact': { site?: string; lang?: string; topics?: string; 'topics-vi'?: string; 'topics-en'?: string; heading?: string; 'no-heading'?: string; endpoint?: string };
    }
  }
}
export {};
