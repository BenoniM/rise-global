import { mission, vision } from '../data/site'

const panels = [
  {
    title: 'Mission',
    text: mission,
    sources: [
      'https://videos.pexels.com/video-files/16636200/16636200-hd_1920_1080_30fps.mp4',
      'https://www.pexels.com/download/video/16636200/',
    ],
  },
  {
    title: 'Vision',
    text: vision,
    sources: [
      'https://videos.pexels.com/video-files/32386620/13814619_3840_2160_100fps.mp4',
      'https://www.pexels.com/download/video/32386620/',
    ],
  },
]

/**
 * Two square-cornered panels. At rest both videos are blurred; hovering (or
 * focusing) one expands it, sharpens its video and reveals the description.
 */
export default function MissionVisionSection() {
  return (
    <section id="vision-mission" className="mv-section" aria-label="Mission and vision">
      <div className="mv-panels">
        {panels.map((p) => (
          <article key={p.title} className="mv-panel" tabIndex={0}>
            <video className="mv-panel-media" autoPlay loop muted playsInline preload="auto" aria-hidden="true">
              {p.sources.map((src) => (
                <source key={src} src={src} type="video/mp4" />
              ))}
            </video>
            <div className="mv-panel-scrim" />
            <p className="mv-panel-text">{p.text}</p>
            <h2 className="mv-panel-title">{p.title}</h2>
          </article>
        ))}
      </div>
    </section>
  )
}
