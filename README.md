# Blinkered dictionary: Welsh

The Welsh word list, and the evidence for every word in it.

Built by [`blinkered-attestation`](https://github.com/blinkered/blinkered-attestation). The rule,
the evidence format and the reasoning live there; what lives here is Welsh.

**19,697 of 47,635 candidates proved, 41.3%**, across 9 independent
families, 9 of which a stranger could check by fetching.

## What is in this repository

```
sources.mjs        which collections attest Welsh, and why those
ATTESTATIONS.tsv   the evidence: every candidate, what saw it, and where
words.txt          what survived, in Blinkered's own format
dropped.tsv        what did not, and how close it came
searched.tsv       publishers fetched directly: per page, which candidates it held and how often
SATURATION.md      what each family was worth, measured from the evidence
COLLECTIONS.md     every collection read, and where to get it again
status.json        the numbers, whether this ships, and what the list is under
```

`.cache/` holds the downloaded collections and is not tracked. Everything here is regenerable
with `pnpm build`.

## Where the words come from

Candidates come from Blinkered's Welsh list, which lives in
[`blinkered-attestation/candidates/cy`](https://github.com/blinkered/blinkered-attestation/tree/main/candidates/cy).
The dictionaries that built it are demoted to **proposing words worth looking up**. What earns a
word its place here is evidence that it occurs in the world: three independent collections, each
recorded with a locator somebody else can fetch.

`SATURATION.md` says what each family was worth. `COLLECTIONS.md` names every collection read and
where to get it again, which is what makes the downloads disposable.

## What is particular to Welsh

**The families.** Welsh Wikipedia and Wikisource (one Wikimedia family, and Wikipedia also
ordered the candidates), Tatoeba with barely a thousand sentences, fifteen Project Gutenberg
texts, the Internet Archive's Welsh shelf, and five Welsh-language publishers fetched directly
(`barn.cymru`, `ycymro.cymru`, `gwales.com`, `golwg360.cymru` and `bro360.cymru`). Leipzig has no Welsh package at all and
eBible has no Welsh translation, so there is no news corpus and no Bible family.

**Digraphs are never tiles.** CH, DD, FF, NG, LL, PH, RH and TH are two tiles each, as for every
digraph in the game, so matching a Welsh word in running text needs nothing special. Mutation
does, in a way no fold can help with: FEDDWL, NGHYMRU and CHYMRAEG are separate candidates, and
each needs its own three sightings. That is most of why a 47,635-word list sits near 40%.

**Where the drop list points.** The first build, with 92 Archive texts and three publishers, kept
35.4%; this one, with 242 texts (129 of them legible) and five publishers, keeps 41.3%. 14,967 of
the 16,524 words still one family short are attested by the Archive and Wikipedia and nothing
else: ABERTHIAD, ABERTHOL. One more family of Welsh books or long-form prose would move this list
by tens of points. Golwg360 and Bro360 yielded only a handful of pages each to the harvest, so a
deeper fetch of those two is the obvious next step.

**English in the list.** The candidates carry English (THE, WAS, HIS, NOT and HAD are all on
them), and the Welsh shelf, Wikipedia and Gutenberg all quote English. Measured: 1,040 of the
19,697 shipped words (5.3%) are also English candidates, and 218 are in the top 3,000 of the
English list. A few of those 218 are Welsh words too (MAN, PAN, CAN); by eye about 150 are plain
English (THE, WAS, DOES, ALL, WELL, PAID, UNION). That is a fault in the candidate list and wants
fixing before this ships.

**Tiles.** Every tile spells some shipped word; J (15) is the rarest.

## Rebuilding

```
pnpm install
pnpm build        # reads whatever collections are in .cache/raw, reuses the record for the rest
pnpm conform      # the list says only what the evidence supports
pnpm saturation   # recomputes the curve and status.json
```

A collection that is not on disk is skipped with a warning and its recorded testimony is reused,
so a rebuild after more books arrive is short rather than a re-read of everything.

## Before this ships

`COMMON_CUT` in `sources.mjs` is carried over from Blinkered's old calibration against a
differently sized list. It has to be re-measured before this list reaches the game, and
`status.json` says `"ships": "pending"` until somebody decides otherwise. Nobody has yet played
the boards this list deals.

## Licensing

Three kinds of thing live here and they do not share terms. The distinction is the project: a
licence that claimed more than we can support would undo the argument the evidence is here to
make. [NOTICE](NOTICE) is the authority; this is the summary.

| | terms | what |
| --- | --- | --- |
| **Code and docs** | [Apache-2.0](LICENSE) | `build.mjs`, `sources.mjs`, `harvest.mjs`, `conform.mjs`, `saturation.mjs`, and the Markdown |
| **The list and its evidence** | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `words.txt`, the evidence, `status.json`, `SATURATION.md`, `COLLECTIONS.md`, `searched.tsv` |
| **The words we could not prove** | `LGPL-3.0-or-later` | `dropped.tsv`, which is **not ours to license** |

**Why the list is CC0.** A word ships because three independent collections of text were found to
contain it. The record of which collections, and where in them, is a statement of fact about those
texts rather than a copy of them, and nothing a licence governs was taken from the dictionary that
proposed the candidates.

**Why `dropped.tsv` is not.** It is the candidates that failed, and a candidate that failed is a
word we have nothing to say about except that somebody's dictionary proposed it. That makes the
file a subset of that dictionary and it carries that dictionary's terms, here `LGPL-3.0-or-later`.
