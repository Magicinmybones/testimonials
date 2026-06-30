import { Fragment, useEffect, useRef, useState } from 'react'
import './Testimonials.css'
import portrait from './assets/testimonials/portratitnew.png'
import quoteIcon from './assets/image-removebg-preview.png'

// Shared content so the desktop and mobile layouts never drift apart.
const STATS = [
  { label: 'TIME TO VALUE', num: '3.2x', sub: 'faster' },
  { label: 'MODEL ACCURACY', num: '+21%', sub: 'average lift' },
]
const QUOTES = [
  {
    text:
      'Nexora helped us go from prototype to production in record time. The results speak for themselves.',
    name: 'Emily Park',
    role: 'Head of Product, Altura',
  },
  {
    text:
      'Their team combines deep AI expertise with a product mindset. A true partner.',
    name: 'Daniel Kim',
    role: 'CTO, Veridian',
  },
]

// Ported from Testimonials.dc.html (Claude Design export).
// Defaults below come from the design's prop definitions.
const cfg = {
  // Position · Heading block
  tLeft: 'translate(-2px, -34px) scale(0.95)',
  // Position · Stats
  tStats: 'translate(4px, -24px) scale(0.7)',
  // Position · View more
  tViewMore: 'translate(4px, -20px) scale(0.85)',
  // Position · Quotes
  tQuote1: 'translate(0px, 0px) scale(0.9)',
  tQuote2: 'translate(0px, 0px) scale(0.9)',
  // Font weights
  wEyebrow: 600,
  wHeadline: 400,
  wSubtext: 400,
  wStatLabel: 600,
  wStatNum: 400,
  wStatSub: 300,
  wQuote: 500,
  wName: 500,
  wRole: 500,
  wViewMore: 400,
  // Portrait
  imgSize: 390,
  imgX: -29,
  imgY: 0,
}

// Shared orange glow for all accent-colored elements (except the View-more circle).
const glow = '0 0 8px rgba(238,122,24,0.45)'

export default function Testimonials() {
  const frameRef = useRef(null)
  const portraitRef = useRef(null)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 820px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const fit = () => {
      // Scale by height (the design's native sizing) but also cap by width so the
      // right-pinned portrait can never slide left over the quote column. The quote
      // column ends near 861px and the portrait is 362px wide at scale 1, so ~1280px
      // of horizontal room keeps a comfortable gap between them.
      const s = Math.min(window.innerHeight / 675, window.innerWidth / 1280)
      if (frameRef.current) {
        frameRef.current.style.transform = `scale(${s})`
      }
      const p = portraitRef.current
      if (p) {
        // The portrait is pinned to the right viewport edge. Cap its width to the
        // space left after the quote column (which ends ~861px at scale 1) so it can
        // never cover the quotes. When there's room it keeps its full 362px width.
        const quoteRight = 861 * s
        const gap = 28 * s
        const maxW = 362 * s
        const w = Math.max(Math.min(maxW, window.innerWidth - quoteRight - gap), 200 * s)
        p.style.width = `${w}px`
        p.style.backgroundSize = `${cfg.imgSize * s}px auto`
        // Anchor the image to the right edge so cropping (when narrowed) trims the
        // left side and keeps the subject visible. At full width this matches the
        // design's original -29px left offset (362 - 390 ≈ -28).
        p.style.backgroundPosition = `right ${cfg.imgY * s}px`
      }
    }
    window.addEventListener('resize', fit)
    fit()
    return () => window.removeEventListener('resize', fit)
  }, [isMobile])

  if (isMobile) return <TestimonialsMobile />

  return (
    <div className="testimonials-root">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="quote-recolor" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feFlood floodColor="#d0c1ba" result="color" />
            <feComposite in="color" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>
      <div
        ref={frameRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1200,
          height: 675,
          overflow: 'visible',
          transformOrigin: 'top left',
        }}
      >
        {/* subtle vertical seam */}
        <div
          style={{
            position: 'absolute',
            left: 480,
            top: 0,
            width: 1,
            height: '100%',
            background:
              'linear-gradient(180deg,rgba(160,140,120,0) 0%,rgba(160,140,120,.12) 50%,rgba(160,140,120,0) 100%)',
          }}
        />

        {/* ===== LEFT COLUMN ===== */}
        <div
          style={{
            position: 'absolute',
            left: 68,
            top: 147,
            width: 400,
            transform: cfg.tLeft,
            transformOrigin: 'left top',
          }}
        >
          <div
            style={{
              fontSize: 7,
              fontWeight: cfg.wEyebrow,
              letterSpacing: 2.5,
              color: '#ee7a18',
            }}
          >
            TESTIMONIALS&nbsp;&nbsp;/&nbsp;&nbsp;RESULTS
          </div>
          <h1
            style={{
              marginTop: 22,
              fontSize: 40,
              lineHeight: 1.07,
              fontWeight: cfg.wHeadline,
              letterSpacing: '-1.6px',
              color: '#2c2d2f',
              // Faux "in-between" weight: 400 + a stroke. Sub-px widths are
              // imperceptible, so use ~1px and paint the stroke behind the
              // fill (paint-order) so it only thickens outward.
              WebkitTextStroke: '0.3px #2c2d2f',
              paintOrder: 'stroke fill',
              whiteSpace: 'nowrap',
            }}
          >
            Real impact.
            <br />
            Trusted by builders.
          </h1>
          <p
            style={{
              marginTop: 24,
              fontSize: 16,
              lineHeight: 1.5,
              fontWeight: cfg.wSubtext,
              color: '#8e8a83',
              // Same faux in-between weight as the headline, in the subtext color.
              WebkitTextStroke: '0.35px #8e8a83',
              width: 300,
            }}
          >
            We partner with forward-thinking teams to deliver AI products that
            perform.
          </p>
        </div>

        {/* stats */}
        <div
          style={{
            position: 'absolute',
            left: 68,
            top: 377,
            display: 'flex',
            alignItems: 'center',
            gap: 60,
            transform: cfg.tStats,
            transformOrigin: 'left top',
          }}
        >
          {[
            { label: 'TIME TO VALUE', num: '3.2x', sub: 'faster' },
            { label: 'MODEL ACCURACY', num: '+21%', sub: 'average lift' },
          ].map((stat, i) => (
            <Fragment key={stat.label}>
              {i > 0 && (
                <div
                  style={{
                    alignSelf: 'stretch',
                    width: 1.2,
                    marginLeft: 28,
                    marginRight: -22,
                    background: '#ddd4cf',
                  }}
                />
              )}
              <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#ee7a18',
                    display: 'inline-block',
                    boxShadow: glow,
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: cfg.wStatLabel,
                    letterSpacing: 1.5,
                    color: '#635e58',
                    WebkitTextStroke: '0.3px #635e58',
                    paintOrder: 'stroke fill',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {stat.label}
                </span>
              </div>
              <div
                style={{
                  marginTop: 28,
                  fontSize: 52,
                  fontWeight: cfg.wStatNum,
                  letterSpacing: '-1px',
                  color: '#ee7a18',
                  // Subtle glow in the number's own color.
                  textShadow: glow,
                  WebkitTextStroke: '0.5px #ee7a18',
                  // Avenir Next only on the big numbers (3.2x, +21%).
                  fontFamily:
                    "'Avenir Next Cyr', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 19,
                  fontWeight: cfg.wStatSub,
                  color: '#8e8a83',
                  WebkitTextStroke: '0.5px #8e8a83',
                  paintOrder: 'stroke fill',
                }}
              >
                {stat.sub}
              </div>
              </div>
            </Fragment>
          ))}
        </div>

        {/* view more */}
        <div
          style={{
            position: 'absolute',
            left: 68,
            top: 598,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            transform: cfg.tViewMore,
            transformOrigin: 'left top',
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: '#ee7a18',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 12L12 4M12 4H5.5M12 4V10.5"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: cfg.wViewMore,
              color: '#3a3a3c',
              WebkitTextStroke: '0.55px #3a3a3c',
            }}
          >
            View more case studies
          </span>
        </div>

        {/* ===== MIDDLE COLUMN — TESTIMONIALS ===== */}
        <div
          style={{
            position: 'absolute',
            left: 530,
            top: 52,
            width: 368,
            transform: cfg.tQuote1,
            transformOrigin: 'left top',
          }}
        >
          <img
            src={quoteIcon}
            alt=""
            style={{ width: 56, height: 'auto', filter: 'url(#quote-recolor)', marginLeft: -10 }}
          />
          <p
            style={{
              marginTop: 14,
              fontSize: 19,
              lineHeight: 1.42,
              fontWeight: cfg.wQuote,
              color: '#3a3a3c',
              width: 238,
            }}
          >
            Nexora helped us go from prototype to production in record time. The
            results speak for themselves.
          </p>
          <div style={{ marginTop: 22, width: 18, height: 2, background: '#ee7a18', boxShadow: glow }} />
          <div style={{ marginTop: 18, fontSize: 15, fontWeight: cfg.wName, color: '#2f2f31' }}>
            Emily Park
          </div>
          <div style={{ marginTop: 4, fontSize: 14, fontWeight: cfg.wRole, color: '#9a958d' }}>
            Head of Product, Altura
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 530,
            top: 326,
            width: 368,
            height: 1,
            background: 'rgba(120,105,90,.22)',
            transform: cfg.tQuote2,
            transformOrigin: 'left top',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 530,
            top: 342,
            width: 368,
            transform: cfg.tQuote2,
            transformOrigin: 'left top',
          }}
        >
          <img
            src={quoteIcon}
            alt=""
            style={{ width: 56, height: 'auto', filter: 'url(#quote-recolor)', marginLeft: -10 }}
          />
          <p
            style={{
              marginTop: 14,
              fontSize: 19,
              lineHeight: 1.42,
              fontWeight: cfg.wQuote,
              color: '#3a3a3c',
              width: 238,
            }}
          >
            Their team combines deep AI expertise with a product mindset. A true
            partner.
          </p>
          <div style={{ marginTop: 22, width: 18, height: 2, background: '#ee7a18', boxShadow: glow }} />
          <div style={{ marginTop: 18, fontSize: 15, fontWeight: cfg.wName, color: '#2f2f31' }}>
            Daniel Kim
          </div>
          <div style={{ marginTop: 4, fontSize: 14, fontWeight: cfg.wRole, color: '#9a958d' }}>
            CTO, Veridian
          </div>
        </div>
      </div>

      {/* ===== RIGHT — PORTRAIT (pinned to viewport edge, height-scaled) ===== */}
      <div
        ref={portraitRef}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          width: 362,
          backgroundImage: `url(${portrait})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${cfg.imgSize}px auto`,
          backgroundPosition: `${cfg.imgX}px ${cfg.imgY}px`,
        }}
      />
    </div>
  )
}

// ===== MOBILE LAYOUT =====
// Direct port of "Testimonials Mobile.html" (Claude Design export). Same
// elements as the desktop (identical fonts, sizes, weights, colours, strokes,
// dot, orange rule, numbers) — only the architecture/placement differs: a
// natural top-to-bottom flow inside a phone-width column, with a full-width
// portrait and hairline dividers between sections.
const divider = { marginTop: 30, width: '100%', height: 1, background: 'rgba(120,105,90,.22)' }

function TestimonialsMobile() {
  return (
    <div className="t-m">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="quote-recolor-m" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feFlood floodColor="#d0c1ba" result="color" />
            <feComposite in="color" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      <div className="t-m-screen">
        {/* heading block — identical element styles to the desktop */}
        <div
          style={{
            fontSize: 7,
            fontWeight: cfg.wEyebrow,
            letterSpacing: 2.5,
            color: '#ee7a18',
          }}
        >
          TESTIMONIALS&nbsp;&nbsp;/&nbsp;&nbsp;RESULTS
        </div>
        <h1
          style={{
            marginTop: 22,
            fontSize: 40,
            lineHeight: 1.07,
            fontWeight: cfg.wHeadline,
            letterSpacing: '-1.6px',
            color: '#2c2d2f',
            WebkitTextStroke: '0.3px #2c2d2f',
            paintOrder: 'stroke fill',
          }}
        >
          Real impact.
          <br />
          Trusted by builders.
        </h1>
        <p
          style={{
            marginTop: 24,
            fontSize: 16,
            lineHeight: 1.5,
            fontWeight: cfg.wSubtext,
            color: '#8e8a83',
            WebkitTextStroke: '0.35px #8e8a83',
            maxWidth: 300,
          }}
        >
          We partner with forward-thinking teams to deliver AI products that
          perform.
        </p>

        {/* portrait — full image, shown edge to edge of the column */}
        <img
          src={portrait}
          alt=""
          style={{ marginTop: 34, display: 'block', width: '100%', height: 'auto', borderRadius: 18 }}
        />

        {/* stats — identical markup/styles to the desktop stats. The row is
            spread across the column width so it fits the phone padding at any
            width instead of overflowing right (the desktop gap was tuned for
            1200px). */}
        <div
          style={{
            marginTop: 42,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          {STATS.map((stat, i) => (
            <Fragment key={stat.label}>
              {i > 0 && (
                <div
                  style={{
                    alignSelf: 'stretch',
                    width: 1.2,
                    background: '#ddd4cf',
                  }}
                />
              )}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#ee7a18',
                      display: 'inline-block',
                      boxShadow: glow,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: cfg.wStatLabel,
                      letterSpacing: 1.5,
                      color: '#635e58',
                      WebkitTextStroke: '0.3px #635e58',
                      paintOrder: 'stroke fill',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 28,
                    fontSize: 52,
                    fontWeight: cfg.wStatNum,
                    letterSpacing: '-1px',
                    color: '#ee7a18',
                    textShadow: glow,
                    WebkitTextStroke: '0.5px #ee7a18',
                    fontFamily:
                      "'Avenir Next Cyr', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 19,
                    fontWeight: cfg.wStatSub,
                    color: '#8e8a83',
                    WebkitTextStroke: '0.5px #8e8a83',
                    paintOrder: 'stroke fill',
                  }}
                >
                  {stat.sub}
                </div>
              </div>
            </Fragment>
          ))}
        </div>

        {/* quotes — identical to the desktop testimonials, divided by hairlines */}
        {QUOTES.map((q) => (
          <Fragment key={q.name}>
            <div style={divider} />
            <div style={{ marginTop: 30 }}>
              <img
                src={quoteIcon}
                alt=""
                style={{ width: 56, height: 'auto', filter: 'url(#quote-recolor-m)', marginLeft: -10 }}
              />
              <p
                style={{
                  marginTop: 14,
                  fontSize: 19,
                  lineHeight: 1.42,
                  fontWeight: cfg.wQuote,
                  color: '#3a3a3c',
                  maxWidth: 238,
                }}
              >
                {q.text}
              </p>
              <div style={{ marginTop: 22, width: 18, height: 2, background: '#ee7a18', boxShadow: glow }} />
              <div style={{ marginTop: 18, fontSize: 15, fontWeight: cfg.wName, color: '#2f2f31' }}>
                {q.name}
              </div>
              <div style={{ marginTop: 4, fontSize: 14, fontWeight: cfg.wRole, color: '#9a958d' }}>
                {q.role}
              </div>
            </div>
          </Fragment>
        ))}

        {/* view more — identical to the desktop control */}
        <div
          style={{
            marginTop: 42,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: '#ee7a18',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 12L12 4M12 4H5.5M12 4V10.5"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: cfg.wViewMore,
              color: '#3a3a3c',
              WebkitTextStroke: '0.55px #3a3a3c',
            }}
          >
            View more case studies
          </span>
        </div>
      </div>
    </div>
  )
}
