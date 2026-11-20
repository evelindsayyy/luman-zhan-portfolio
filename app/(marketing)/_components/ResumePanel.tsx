"use client"

import Image from "next/image"
import { useState } from "react"

import { profile } from "@/data/profile"

const DOWNLOAD_NAME = "Luman-Grace-Zhan-Resume.pdf"

// The one-page resume: open or download the PDF, with a preview image of the
// page rendered by the same resume build. If the image fails, the PDF link is
// still there.
export default function ResumePanel() {
  const [failed, setFailed] = useState(false)
  const { pdf, preview, updated } = profile.resume
  return (
    <>
      <div className="resume-head">
        <p>
          <b>Resume</b> · one page, updated {updated}
        </p>
        <div className="cta">
          <a className="btn" href={pdf} target="_blank" rel="noopener noreferrer">
            Open in new tab
          </a>
          <a className="btn primary" href={pdf} download={DOWNLOAD_NAME}>
            Download PDF
          </a>
        </div>
      </div>
      <div className="pdf">
        {failed ? (
          <p>
            The preview didn’t load.{" "}
            <a href={pdf} target="_blank" rel="noopener noreferrer">
              Open the PDF
            </a>{" "}
            instead.
          </p>
        ) : (
          <Image
            src={preview}
            alt={`Resume of ${profile.name}, page 1 of 1`}
            width={1224}
            height={1584}
            sizes="(max-width: 900px) 100vw, 900px"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </>
  )
}
