/**
 * Reviews renderer (reads from local JSON cache).
 * Usage: <reviews-component data-src="./data/google-reviews.json" max="3"></reviews-component>
 */
class Reviews extends HTMLElement {
  connectedCallback() {
    const src = this.getAttribute('data-src') || './data/google-reviews.json';
    const max = Number(this.getAttribute('max') || '3') || 3;

    this.innerHTML = `
      <div class="reviews-container" aria-live="polite">
        <div class="review-box"><p>Loading reviews…</p></div>
      </div>
    `;

    this._load(src, max);
  }

  async _load(src, max) {
    const fallback = {
      placeName: 'Three Bears Motel',
      placeUrl: null,
      rating: null,
      userRatingsTotal: null,
      updatedAt: null,
      // Seeded so reviews still render when opened via file:// (fetch to JSON can be blocked).
      reviews: [
        {
          rating: 5,
          text:
            'LOVED this motel! Great rates, rooms spotless, definitely a homey western vibe. Beds were very comfy. Quiet area. Bathroom small but squeaky clean. Will absolutely stay there again.',
          url: null
        },
        {
          rating: 5,
          text:
            "Stayed here during Montana's Race to the Sky Dogsled Race. Customer service was incredible, they were so accommodating with parking for our dog trucks and to our retired sled dog that stayed in the room with us. Beds were clean, quiet, and very comfortable. Excellent water pressure too. We will definitely stay here again!",
          url: null
        },
        {
          rating: 5,
          text:
            'It is a sweet motel that is very clean and very reasonably priced. The owners are very nice as well.its a small town so things are very close. I had a hardy dinner at the tavern next store and across the street there is a man who makes bear carvings. They are terrific.',
          url: null
        }
      ]
    };

    let data = fallback;
    try {
      const res = await fetch(src, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json && Array.isArray(json.reviews)) data = json;
    } catch {
      // Keep fallback
    }

    this._render(data, max);
  }

  _render(data, max) {
    const placeName = this._escape(data.placeName || 'Guest Reviews');
    const placeUrl = typeof data.placeUrl === 'string' ? data.placeUrl : null;
    const rating = typeof data.rating === 'number' ? data.rating : null;
    const total = typeof data.userRatingsTotal === 'number' ? data.userRatingsTotal : null;

    const meta =
      rating || total || placeUrl
        ? `<p class="reviews-meta">
            <strong>${placeName}</strong>
            ${rating ? ` · ${this._formatNumber(rating)}★` : ''}
            ${total ? ` · ${this._formatInt(total)} reviews` : ''}
            ${placeUrl ? ` · <a href="${this._escapeAttr(placeUrl)}" target="_blank" rel="noopener noreferrer">Read on Google</a>` : ''}
          </p>`
        : '';

    const reviews = (data.reviews || []).slice(0, Math.max(1, max));
    const cards = reviews
      .map((r) => {
        const hasAuthor = typeof r.authorName === 'string' && r.authorName.trim().length > 0;
        const hasWhen =
          typeof r.relativeTimeDescription === 'string' &&
          r.relativeTimeDescription.trim().length > 0;
        const author = hasAuthor ? this._escape(r.authorName.trim()) : '';
        const when = hasWhen ? this._escape(r.relativeTimeDescription.trim()) : '';
        const text = this._escape((r.text || '').trim());
        const stars = this._stars(Number(r.rating || 0));
        const reviewUrl = typeof r.url === 'string' ? r.url : null;

        const heading =
          hasAuthor || hasWhen || stars
            ? `<div class="review-heading">
                ${
                  hasAuthor || hasWhen
                    ? `<h3 class="review-author">
                        ${
                          hasAuthor
                            ? reviewUrl
                              ? `<a href="${this._escapeAttr(reviewUrl)}" target="_blank" rel="noopener noreferrer">${author}</a>`
                              : author
                            : ''
                        }
                        ${hasWhen ? `<span class="review-when">${hasAuthor ? ' · ' : ''}${when}</span>` : ''}
                      </h3>`
                    : ''
                }
                ${stars || ''}
              </div>`
            : '';

        return `
          <div class="review-box">
            ${heading}
            <p class="review-text">${text ? `“${text}”` : ''}</p>
          </div>
        `;
      })
      .join('');

    this.innerHTML = `
      ${meta}
      <div class="reviews-container">
        ${cards || '<div class="review-box"><p>No reviews yet.</p></div>'}
      </div>
    `;
  }

  _stars(rating) {
    const r = Math.max(0, Math.min(5, Math.round(rating)));
    if (!r) return '';
    const stars = Array.from({ length: 5 }, (_, i) =>
      i < r ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'
    ).join('');
    return `<div class="star-rating" aria-label="${r} out of 5 stars">${stars}</div>`;
  }

  _escape(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  _escapeAttr(s) {
    return this._escape(String(s)).replace(/[\r\n]/g, '');
  }

  _formatNumber(n) {
    try {
      return new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(n);
    } catch {
      return String(n);
    }
  }

  _formatInt(n) {
    try {
      return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
    } catch {
      return String(n);
    }
  }
}

customElements.define('reviews-component', Reviews);

