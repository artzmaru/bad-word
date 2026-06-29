-- Seed 82 words: EN 44 (L1×9 L2×9 L3×9 L4×9 L5×8) + TH 38 (L1×8 L2×8 L3×8 L4×7 L5×7)
-- ON CONFLICT DO NOTHING — safe to re-run

INSERT INTO words (word, lang, level, stars, meaning, used_in, face_base, face_shadow, face_highlight, face_expression) VALUES

-- ─── EN Level 1 — Polite (9) ────────────────────────────────────────────────
('please',             'en',1,1,'คำขอร้องสุภาพ',             '{"school","home","store"}',    '#4ade80','#16a34a','#86efac','happy'),
('thank you',          'en',1,1,'ขอบคุณ',                    '{"school","home","online"}',   '#4ade80','#16a34a','#86efac','excited'),
('sorry',              'en',1,1,'ขอโทษ / ขอบรับผิด',        '{"school","home","store"}',    '#4ade80','#16a34a','#86efac','neutral'),
('excuse me',          'en',1,1,'ขอโทษ / ขอทาง',            '{"store","school","street"}',  '#4ade80','#16a34a','#86efac','happy'),
('you''re welcome',    'en',1,1,'ยินดี (ตอบรับขอบคุณ)',      '{"school","home","store"}',    '#4ade80','#16a34a','#86efac','happy'),
('pardon me',          'en',1,1,'ขอโทษ / ขอความกรุณา',      '{"store","school","street"}',  '#4ade80','#16a34a','#86efac','happy'),
('well done',          'en',1,1,'ทำได้ดีมาก (ชมเชย)',        '{"school","home","gaming"}',   '#4ade80','#16a34a','#86efac','excited'),
('good job',           'en',1,1,'ทำงานได้ดี (ชมเชย)',        '{"school","home","gaming"}',   '#4ade80','#16a34a','#86efac','excited'),
('bless you',          'en',1,1,'สุขภาพดีนะ (หลังจาม)',     '{"school","home","store"}',    '#4ade80','#16a34a','#86efac','happy'),

-- ─── EN Level 2 — Rude (9) ──────────────────────────────────────────────────
('shut up',            'en',2,2,'หุบปาก (ไม่สุภาพ)',         '{"gaming"}',                   '#facc15','#ca8a04','#fef08a','angry'),
('whatever',           'en',2,2,'ก็ได้ (เย็นชา ดูถูก)',     '{"school","home","online"}',   '#facc15','#ca8a04','#fef08a','neutral'),
('dumb',               'en',2,2,'โง่ (ดูถูก)',               '{"gaming","school"}',          '#facc15','#ca8a04','#fef08a','angry'),
('liar',               'en',2,2,'คนโกหก',                    '{"school","home"}',            '#facc15','#ca8a04','#fef08a','sad'),
('annoying',           'en',2,2,'น่ารำคาญ (ดูถูก)',          '{"school","home","online"}',   '#facc15','#ca8a04','#fef08a','angry'),
('gross',              'en',2,2,'น่าขยะแขยง (ดูถูก)',       '{"school","home"}',            '#facc15','#ca8a04','#fef08a','sad'),
('shut it',            'en',2,2,'หยุดพูด (หยาบ)',           '{"gaming","home"}',            '#facc15','#ca8a04','#fef08a','angry'),
('weirdo',             'en',2,2,'คนแปลกประหลาด (ดูถูก)',    '{"school","online"}',          '#facc15','#ca8a04','#fef08a','sad'),
('buzz off',           'en',2,2,'ไปให้พ้น (ไม่สุภาพ)',      '{"school","gaming"}',          '#facc15','#ca8a04','#fef08a','angry'),

-- ─── EN Level 3 — Coarse (9) ────────────────────────────────────────────────
('stupid',             'en',3,3,'โง่มาก (ดูถูก)',            '{"gaming","school","online"}', '#fb923c','#ea580c','#fdba74','angry'),
('idiot',              'en',3,3,'คนโง่ (ดูถูก)',             '{"gaming","online"}',          '#fb923c','#ea580c','#fdba74','angry'),
('loser',              'en',3,3,'คนแพ้ (ดูถูก)',             '{"gaming","school"}',          '#fb923c','#ea580c','#fdba74','sad'),
('ugly',               'en',3,3,'น่าเกลียด (ดูถูกรูปร่าง)', '{"school","online"}',          '#fb923c','#ea580c','#fdba74','sad'),
('fat',                'en',3,3,'อ้วน (ดูถูก)',              '{"school","home"}',            '#fb923c','#ea580c','#fdba74','sad'),
('jerk',               'en',3,3,'คนเลว / ไม่ดี',            '{"school","gaming","online"}', '#fb923c','#ea580c','#fdba74','angry'),
('moron',              'en',3,3,'คนโง่เขลา (รุนแรง)',        '{"gaming","online"}',          '#fb923c','#ea580c','#fdba74','angry'),
('pathetic',           'en',3,3,'น่าสมเพช (ดูถูก)',          '{"school","online"}',          '#fb923c','#ea580c','#fdba74','sad'),
('useless',            'en',3,3,'ไร้ประโยชน์ (ดูถูก)',       '{"school","home","gaming"}',   '#fb923c','#ea580c','#fdba74','sad'),

-- ─── EN Level 4 — Harsh (9) ─────────────────────────────────────────────────
('hate you',           'en',4,4,'เกลียดแก (รุนแรง)',         '{"home","gaming"}',            '#f87171','#dc2626','#fca5a5','angry'),
('freak',              'en',4,4,'คนประหลาด (รุนแรง)',        '{"school","online"}',          '#f87171','#dc2626','#fca5a5','angry'),
('creep',              'en',4,4,'คนน่ากลัว / น่าขนลุก',     '{"online","school"}',          '#f87171','#dc2626','#fca5a5','angry'),
('go die',             'en',4,4,'ไปตายซะ (อันตราย)',         '{"online"}',                   '#f87171','#dc2626','#fca5a5','angry'),
('worthless',          'en',4,4,'ไร้คุณค่า (รุนแรง)',        '{"school","home","online"}',   '#f87171','#dc2626','#fca5a5','angry'),
('get lost',           'en',4,4,'ไปให้พ้นหน้า (รุนแรง)',    '{"school","home","online"}',   '#f87171','#dc2626','#fca5a5','angry'),
('nobody likes you',   'en',4,4,'ไม่มีใครชอบแก',            '{"school","online"}',          '#f87171','#dc2626','#fca5a5','angry'),
('you suck',           'en',4,4,'แกห่วยมาก',                '{"gaming","school","online"}', '#f87171','#dc2626','#fca5a5','angry'),
('shut your mouth',    'en',4,4,'ปิดปาก (รุนแรง)',          '{"gaming","home","online"}',   '#f87171','#dc2626','#fca5a5','angry'),

-- ─── EN Level 5 — Dangerous (8) ─────────────────────────────────────────────
('kill you',              'en',5,5,'ขู่ฆ่า (อาชญากรรม)',           '{"online"}',         '#c084fc','#7c3aed','#e9d5ff','angry'),
('i will hurt you',       'en',5,5,'ขู่ทำร้าย (อาชญากรรม)',        '{"online"}',         '#c084fc','#7c3aed','#e9d5ff','angry'),
('harassment',            'en',5,5,'การคุกคาม',                    '{"online","school"}', '#c084fc','#7c3aed','#e9d5ff','angry'),
('bully',                 'en',5,5,'การรังแก',                      '{"school","online"}', '#c084fc','#7c3aed','#e9d5ff','angry'),
('threat',                'en',5,5,'การขู่ (อาชญากรรม)',            '{"online"}',         '#c084fc','#7c3aed','#e9d5ff','angry'),
('cyberbully',            'en',5,5,'การรังแกออนไลน์',               '{"online"}',         '#c084fc','#7c3aed','#e9d5ff','angry'),
('stalk',                 'en',5,5,'การติดตามคุกคาม',               '{"online"}',         '#c084fc','#7c3aed','#e9d5ff','angry'),
('i know where you live', 'en',5,5,'ขู่บอกที่อยู่ (อาชญากรรม)',   '{"online"}',         '#c084fc','#7c3aed','#e9d5ff','angry'),

-- ─── TH Level 1 — สุภาพ (8) ────────────────────────────────────────────────
('ขอบคุณ',        'th',1,1,'Thank you',               '{"school","home","store"}',  '#4ade80','#16a34a','#86efac','excited'),
('ขอโทษ',         'th',1,1,'I am sorry',             '{"school","home","store"}',  '#4ade80','#16a34a','#86efac','neutral'),
('สวัสดี',        'th',1,1,'Hello / Greeting',       '{"school","home","store"}',  '#4ade80','#16a34a','#86efac','happy'),
('กรุณา',         'th',1,1,'Please',                 '{"school","home","store"}',  '#4ade80','#16a34a','#86efac','happy'),
('ยินดีต้อนรับ',  'th',1,1,'Welcome',               '{"school","home","store"}',  '#4ade80','#16a34a','#86efac','excited'),
('ขอบใจ',         'th',1,1,'Thanks (informal)',       '{"school","home","gaming"}', '#4ade80','#16a34a','#86efac','happy'),
('เก่งมาก',       'th',1,1,'Well done / Great job',  '{"school","home","gaming"}', '#4ade80','#16a34a','#86efac','excited'),
('ดีใจด้วย',      'th',1,1,'Congratulations',        '{"school","home"}',          '#4ade80','#16a34a','#86efac','excited'),

-- ─── TH Level 2 — ไม่สุภาพ (8) ─────────────────────────────────────────────
('โง่',           'th',2,2,'Stupid / Dumb (ดูถูก)',  '{"gaming","school"}',        '#facc15','#ca8a04','#fef08a','angry'),
('เงียบ!',        'th',2,2,'Shut up! (คำสั่ง)',     '{"home","gaming"}',          '#facc15','#ca8a04','#fef08a','angry'),
('ขี้โกหก',       'th',2,2,'Liar',                  '{"school","home"}',          '#facc15','#ca8a04','#fef08a','sad'),
('น่ารำคาญ',      'th',2,2,'Annoying',              '{"school","home","gaming"}', '#facc15','#ca8a04','#fef08a','neutral'),
('แหย่',          'th',2,2,'Tease / Poke fun (ดูถูก)','{"school","gaming"}',      '#facc15','#ca8a04','#fef08a','neutral'),
('เบื่อ',         'th',2,2,'You bore me (ดูถูก)',   '{"school","home"}',          '#facc15','#ca8a04','#fef08a','neutral'),
('ไม่สน',         'th',2,2,'I don''t care (ดูถูก)', '{"school","home","gaming"}', '#facc15','#ca8a04','#fef08a','neutral'),
('หน้าเบื่อ',     'th',2,2,'Boring person (ดูถูก)', '{"school","home"}',          '#facc15','#ca8a04','#fef08a','sad'),

-- ─── TH Level 3 — หยาบ (8) ─────────────────────────────────────────────────
('ไอ้',           'th',3,3,'คำนำหน้าดูถูก (ชาย)',   '{"gaming","street"}',        '#fb923c','#ea580c','#fdba74','angry'),
('อีแม่',         'th',3,3,'คำดูถูกผู้หญิง',         '{"street","gaming"}',        '#fb923c','#ea580c','#fdba74','angry'),
('งี่เง่า',       'th',3,3,'Idiot / Silly',          '{"school","home","gaming"}', '#fb923c','#ea580c','#fdba74','angry'),
('ขยะ',           'th',3,3,'Trash / Worthless',      '{"gaming","online"}',        '#fb923c','#ea580c','#fdba74','sad'),
('ตัวร้าย',       'th',3,3,'Villain / Bad guy (ดูถูก)','{"school","gaming"}',      '#fb923c','#ea580c','#fdba74','angry'),
('ขี้เกียจ',      'th',3,3,'Lazy (ดูถูก)',           '{"school","home"}',          '#fb923c','#ea580c','#fdba74','sad'),
('น่าเกลียด',     'th',3,3,'Ugly (ดูถูกรูปลักษณ์)', '{"school","online"}',        '#fb923c','#ea580c','#fdba74','sad'),
('อ้วน',          'th',3,3,'Fat (ดูถูก)',            '{"school","home"}',          '#fb923c','#ea580c','#fdba74','sad'),

-- ─── TH Level 4 — รุนแรง (7) ────────────────────────────────────────────────
('ไปตาย',         'th',4,4,'Go die (อันตราย)',        '{"online","gaming"}',        '#f87171','#dc2626','#fca5a5','angry'),
('เกลียด',        'th',4,4,'Hate (รุนแรง)',           '{"home","school","online"}', '#f87171','#dc2626','#fca5a5','angry'),
('หน้าหนา',       'th',4,4,'Shameless (รุนแรง)',      '{"home","school"}',          '#f87171','#dc2626','#fca5a5','angry'),
('ขี้แพ้',        'th',4,4,'Loser / Crybaby',         '{"gaming","school"}',        '#f87171','#dc2626','#fca5a5','sad'),
('สัตว์',         'th',4,4,'Animal (ด่าคน รุนแรง)',  '{"gaming","school","online"}','#f87171','#dc2626','#fca5a5','angry'),
('ไอ้ขยะ',        'th',4,4,'Piece of trash (รุนแรง)', '{"gaming","online"}',        '#f87171','#dc2626','#fca5a5','angry'),
('หน้าตาย',       'th',4,4,'Dead face (ด่าคน)',      '{"school","online"}',        '#f87171','#dc2626','#fca5a5','angry'),

-- ─── TH Level 5 — อันตราย (7) ──────────────────────────────────────────────
('ฆ่าแก',         'th',5,5,'Threaten to kill',       '{"online"}',                 '#c084fc','#7c3aed','#e9d5ff','angry'),
('ทำร้าย',        'th',5,5,'Hurt / Harm (ขู่)',       '{"online","school"}',        '#c084fc','#7c3aed','#e9d5ff','angry'),
('แกล้ง',         'th',5,5,'Bully / Harm on purpose','{"school","online"}',        '#c084fc','#7c3aed','#e9d5ff','angry'),
('คุกคาม',        'th',5,5,'Harass',                 '{"online","school"}',        '#c084fc','#7c3aed','#e9d5ff','angry'),
('ตามล่า',        'th',5,5,'Stalk / Hunt down',      '{"online"}',                 '#c084fc','#7c3aed','#e9d5ff','angry'),
('ขู่กรรโชก',     'th',5,5,'Extort / Blackmail',     '{"online"}',                 '#c084fc','#7c3aed','#e9d5ff','angry'),
('ทำโทษ',         'th',5,5,'Punish (ขู่ว่าจะลงโทษ)','{"online","school"}',        '#c084fc','#7c3aed','#e9d5ff','angry')

ON CONFLICT (word, lang) DO NOTHING;
