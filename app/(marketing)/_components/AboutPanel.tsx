import { profile } from "@/data/profile"
import { boldRuns } from "@/lib/format"

// Bio, education (both schools in one card format), skills and how I work.
export default function AboutPanel() {
  return (
    <div className="about">
      {profile.about.map((para, i) => (
        <p key={i}>
          {boldRuns(para).map((run, j) => (run.bold ? <b key={j}>{run.text}</b> : <span key={j}>{run.text}</span>))}
        </p>
      ))}

      <h3 className="sub">Education</h3>
      <div className="edu">
        {profile.education.map((e) => (
          <article className="ecard" key={e.school}>
            <div className="top">
              <b>{e.school}</b>
              <em>{e.gpa}</em>
            </div>
            <p className="deg">{e.degree}</p>
            <p className="focus">{e.focus}</p>
            <p className="when">{e.when}</p>
            <h4>Coursework</h4>
            <ul className="course">
              {e.courses.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <h3 className="sub">Skills</h3>
      <div className="skillrows">
        {profile.skills.map((g) => (
          <div key={g.label}>
            <b>{g.label}</b>
            <div className="tags">
              {g.items.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="quote">
        <small>How I work</small>
        {profile.howIWork}
      </p>
    </div>
  )
}
