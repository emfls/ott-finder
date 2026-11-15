# Poster and provider-logo integration status — 2026-11-15

## Result

The requested right-top position and a rights-gated local-media renderer are prepared. No real poster or official provider logo has been copied, hotlinked, generated, or published. The 12 existing contemporary titles remain unchanged. Ordinary-text source labels are explicitly not logos or statements that the title currently plays in Korea.

This is partial implementation, not completion of the requested actual-poster feature. A public image URL is not evidence of reproduction permission. The media manifest is intentionally empty.

## Official-source review

- Netflix Brand Assets Terms and Netflix Materials License Agreement: https://brand.netflix.com/en/terms/ . Prior express approval is required for use of brand assets and materials; the materials grant additionally refers to Netflix partners and approved promotional use. No approval or partner agreement for this site was found. The logo guidance also disallows placing the N symbol inside a shape/container, so a generic badge design is not a licence-compliant substitute: https://brand.netflix.com/en/assets/logos/ . The terms were readable in official-domain web-search results even though the direct page returned a JavaScript shell.
- TMDB FAQ: https://developer.themoviedb.org/docs/faq . Revenue-purpose projects are commercial and need the commercial licensing route. TMDB explicitly does not claim ownership of the images. Neither an API key nor an image CDN URL alone supplies the missing title-poster permission for this site.
- Coupang Media Assets Brand Guidelines, updated January 13, 2026: https://news.coupang.com/coupang-media-assets-brand-guidelines-eng/ . The limited media-asset licence has display, spacing and attribution requirements, prohibits using the asset as a link, and prohibits use with third-party trademarks. The requested multi-platform poster overlays were not established as permitted. No special approval was found.
- Watcha service terms: https://watcha.com/ko-KR/legals/play_agreement . The official terms restrict copying/redistribution beyond authorised use. No separate commercial poster/logo reuse permission was located. Do not treat ordinary subscriber access as a reproduction licence.

These are conservative implementation constraints from the checked terms, not a legal opinion that every possible reference use is unlawful. Appropriate licensed assets or a documented applicable permission could resolve the blocker.

## What is still needed

For each exact poster: approved image file, matching title/version, source, rights holder, documented permission covering this public revenue-purpose website and its display/cropping, required credit, and any expiry. For each provider logo: approved original asset and permission/guidelines covering the actual overlay design. Availability badges require a separate current Korean provider/title/season verification; image rights do not establish playback availability. Boyhood currently has only a past official announcement in the unchanged dataset.

Do not contact licensors, sign an agreement, create an API account or incur a fee without the appropriate user authorisation. Never use a generated imitation as an actual poster.

## Maintainer integration contract

`media-20261115-v3.js` has empty `posters` and `logos` mappings. A future verified record requires `kind`, `rightsStatus: verified`, `scope: commercial-web-display`, `rightsEvidence`, `sourceUrl`, ISO `verifiedAt`, `credit`, and a local `assets/posters/` or `assets/logos/` image path. A flag is only an implementation gate, not a legal grant; the maintainer must verify the underlying evidence and terms before adding it. Do not publish private correspondence or credentials in evidence URLs or the public repository.

The original typography remains the fallback with an explicit non-poster label. Provider text identifies the existing source, not every platform on which a title is available. No data, source dates, playback caveats, storage keys, backup format or filtering logic is altered.

## Tests

The legacy 17 search/format/category/evidence/favourite tests run against the new runtime. The original 17 backup cases remain. New tests verify the empty manifest, 12 honest source labels, past-announcement label, missing or noncommercial rights rejection, local-path restrictions, escaping, and runtime search/reset/favourites. No unlicensed binary asset or external image request is added.
