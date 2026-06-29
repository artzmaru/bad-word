import { createClient } from '@supabase/supabase-js'
import { scenarioData } from '../src/content/scenario-data'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  console.log('🌱 Seeding scenarios...')

  for (let i = 0; i < scenarioData.length; i++) {
    const s = scenarioData[i]

    const { data: scenario, error: scenarioError } = await supabase
      .from('scenarios')
      .upsert(
        {
          id: s.id,                       // use stable string id for idempotency
          title_th: s.titleTh,
          title_en: s.titleEn,
          description_th: s.descriptionTh,
          description_en: s.descriptionEn,
          image_situation: s.imageSituation,
          category: s.category,
          difficulty_level: s.difficultyLevel,
          order_index: i,
          is_active: true,
        },
        { onConflict: 'id' }
      )
      .select()
      .single()

    if (scenarioError || !scenario) {
      console.error(`  ❌ Error seeding scenario "${s.titleTh}":`, scenarioError?.message)
      continue
    }

    console.log(`  ✓ Scenario: "${s.titleTh}"`)

    // Upsert choices
    for (let j = 0; j < s.choices.length; j++) {
      const c = s.choices[j]
      const { error: choiceError } = await supabase.from('scenario_choices').upsert(
        {
          scenario_id: scenario.id,
          choice_text: c.choiceText,
          choice_text_en: c.choiceTextEn,
          is_good_choice: c.isGoodChoice,
          feedback_th: c.feedbackTh,
          feedback_en: c.feedbackEn,
          xp_reward: c.xpReward,
          order_index: j,
        },
        { onConflict: 'id' }
      )

      if (choiceError) {
        console.error(`    ❌ Choice error:`, choiceError.message)
      } else {
        console.log(`    ✓ Choice: "${c.choiceText.slice(0, 40)}"`)
      }
    }
  }

  console.log('\n✅ Scenarios seeded.')
}

main().catch(console.error)
