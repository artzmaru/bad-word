import { createClient } from '@supabase/supabase-js'
import { wordDetailData } from '../src/content/word-detail-data'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  console.log('🌱 Seeding word details...')

  // Fetch all words to get their IDs
  const { data: words, error: wordsError } = await supabase
    .from('words')
    .select('id, word, lang')

  if (wordsError || !words) {
    console.error('❌ Failed to fetch words:', wordsError)
    process.exit(1)
  }

  const wordMap = new Map(words.map((w) => [`${w.word}__${w.lang}`, w.id]))

  let inserted = 0
  let skipped = 0

  for (const detail of wordDetailData) {
    const wordId = wordMap.get(`${detail.word}__${detail.lang}`)
    if (!wordId) {
      console.warn(`  ⚠️  Word not found: "${detail.word}" (${detail.lang})`)
      skipped++
      continue
    }

    const { error } = await supabase.from('word_details').upsert(
      {
        word_id: wordId,
        example_th: detail.exampleTh,
        example_en: detail.exampleEn,
        severity_text: detail.severityExplanation,
        can_use_with: detail.canUseWith,
        never_use_with: detail.neverUseWith,
        alternatives: detail.alternatives,
        impact: detail.impactDescription,
        has_danger_flag: detail.hasDangerFlag,
      },
      { onConflict: 'word_id' }
    )

    if (error) {
      console.error(`  ❌ Error for "${detail.word}":`, error.message)
    } else {
      console.log(`  ✓ "${detail.word}" (${detail.lang})`)
      inserted++
    }
  }

  console.log(`\n✅ Done — ${inserted} inserted, ${skipped} skipped`)
}

main().catch(console.error)
