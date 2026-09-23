/**
 * The collections that attest Cymraeg, and where each comes from.
 *
 * Welsh has a 47,635-word candidate list, ordered by Welsh Wikipedia and checked against the
 * Cysill hunspell dictionary. Wikipedia proposed the candidates, so it attests nearly all of them
 * by construction; every word still needs two families that had no say in the list. Most of the
 * list is mutated and inflected forms (FEDDWL, NGHYMRU, CHYMRAEG), which only a large corpus sees.
 *
 * Leipzig has no Welsh package at all and Tatoeba barely a thousand sentences, and there is no
 * Welsh translation on eBible. What carries the list is the Internet Archive's Welsh shelf, a
 * small Gutenberg one, and Welsh-language publishers fetched directly.
 *
 * CH, DD, FF, NG, LL, PH, RH and TH are two tiles each here, as for every digraph in the game, so
 * nothing about the fold stops a Welsh word being matched in running text.
 *
 * Every URL here was probed before it was written down. A collection that 404s does not fail
 * loudly — the build skips it with a warning and reports a healthy number over fewer families.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import {
  fileDocuments,
  gutenbergBody,
  harvestDocuments,
  tatoebaDocuments,
  wikiDocuments,
} from '@blinkered/attestation'

export const LANGUAGE = 'cy'

const CACHE = new URL('.cache/raw/', import.meta.url).pathname

const ALL = [
  {
    id: 'wiki:cy',
    what: 'Welsh Wikipedia — modern encyclopedic prose, and the list that proposed the candidates',
    needs: `${CACHE}cywiki.xml.bz2`,
    documents: () => wikiDocuments(`${CACHE}cywiki.xml.bz2`),
  },
  {
    id: 'wikisource:cy',
    what: 'Welsh Wikisource — same Wikimedia family, so it corroborates rather than counts',
    needs: `${CACHE}cywikisource.xml.bz2`,
    documents: () => wikiDocuments(`${CACHE}cywikisource.xml.bz2`),
  },
  {
    id: 'tat',
    from: 'https://downloads.tatoeba.org/exports/per_language/cym/cym_sentences.tsv.bz2',
    what: 'Tatoeba Welsh — contemporary and conversational, and very small',
    needs: `${CACHE}cym_sentences.tsv`,
    documents: () => tatoebaDocuments(`${CACHE}cym_sentences.tsv`),
  },
  {
    id: 'gut',
    from: 'https://www.gutenberg.org/cache/epub/feeds/pg_catalog.csv',
    what: 'Project Gutenberg Welsh, 15 texts',
    needs: `${CACHE}gutenberg-cy`,
    documents: () => {
      const dir = `${CACHE}gutenberg-cy`
      const books = readdirSync(dir)
        .filter((file) => file.endsWith('.txt'))
        .map((file) => ({ locator: file.replace('.txt', ''), path: `${dir}/${file}` }))
      return fileDocuments(books, async (path) => gutenbergBody(readFileSync(path, 'utf8')))
    },
  },
  {
    id: 'ia',
    // Scanned books are OCR, and OCR fails in a way that looks like text. Clean Gutenberg scores
    // a median 52% known words and never below 36%; the worst of these scored 1%, an English
    // book read as Cyrillic. Below this floor a book is not legible enough to attest anything.
    legible: 0.35,
    what: 'Internet Archive Welsh books — literature, and the register a newspaper never reaches',
    needs: `${CACHE}archive-cy`,
    from: 'https://archive.org/search?query=mediatype%3Atexts+AND+%28language%3A%22Welsh%22+OR+language%3A%22cym%22+OR+language%3A%22wel%22%29',
    documents: () => {
      const dir = `${CACHE}archive-cy`
      // A locator names the text, not the item: the catalogue page holds no word of the book.
      const named = new Map(
        readFileSync(`${dir}/files.tsv`, 'utf8')
          .split('\n')
          .filter(Boolean)
          .map((line) => line.split('\t')),
      )
      const books = readdirSync(dir)
        .filter((file) => file.endsWith('.txt'))
        .map((file) => file.replace('.txt', ''))
        .filter((id) => named.has(id))
        // Percent-encoded: two thirds of Archive filenames contain spaces, and the evidence
        // format spends spaces as separators.
        .map((id) => ({
          locator: `${id}/${encodeURIComponent(named.get(id))}`,
          path: `${dir}/${id}.txt`,
        }))
      return fileDocuments(books, async (path) => readFileSync(path, 'utf8'))
    },
  },
]

export const SOURCES = ALL.filter((source) => {
  if (source.needs === undefined || existsSync(source.needs)) return true
  process.stderr.write(`  (skipping ${source.id}: ${source.needs} is not in .cache/raw)\n`)
  return false
})

/**
 * Welsh-language publishers, for the harvest.
 *
 * Chosen because they publish in Welsh rather than because they are large. A harvester reads
 * whatever it fetches and has no idea what language it is in, and most Welsh-language writing on
 * the web sits on bilingual or English sites, so those are left out: BBC Cymru Fyw shares its
 * domain with the whole BBC, and Nation.Cymru writes in English. Every one answered when probed.
 */
export const DOMAINS = [
  'golwg360.cymru', 'bro360.cymru', 'barn.cymru', 'ycymro.cymru', 'gwales.com',
]

export const HARVEST = existsSync(new URL('searched.tsv', import.meta.url).pathname)
  ? () => harvestDocuments(new URL('searched.tsv', import.meta.url).pathname)
  : undefined

/** Carried over from Blinkered's calibration; must be re-measured before anything ships. */
export const COMMON_CUT = 17000
