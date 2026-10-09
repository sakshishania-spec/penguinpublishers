/* ---------------- Data (placeholder catalog) ---------------- */
/* Mood shelf: real books from the penguin.co.in homepage lists (Instagram made me buy it, Fiction Addiction, Teen Reads,
   Books for young readers, Transportive translations). Descriptions are written in our own words from each book's page;
   mood tags (m) are our editorial picks. c = fallback colours if a cover fails to load. */
const BOOKS = [
  {t:"The Let Them Theory",a:"Mel Robbins",g:"Self-help",m:["inspiring"],c:["#0f7a3d","#4cd07d"],img:"assets/moods/let-them-theory.jpg",
   d:"Two words, “Let them”, to stop spending your energy on other people’s opinions and drama, and take back control of your own life."},
  {t:"The Anxious Generation",a:"Jonathan Haidt",g:"Non-fiction",m:["mind-bending","inspiring"],c:["#0b1d33","#3a6ea5"],img:"assets/moods/anxious-generation.jpg",
   d:"How the shift from a play-based to a phone-based childhood between 2010 and 2015 rewired adolescence and fuelled a rise in teenage anxiety."},
  {t:"It's Okay . . .",a:"Jaya Kishori",g:"Spirituality · Self-help",m:["cozy","inspiring"],c:["#6b7f8f","#c9d3da"],img:"assets/moods/its-okay.jpg",
   d:"Spiritual speaker Jaya Kishori’s gentle reminder that everyone has problems, with advice for handling stress and living a more meaningful life."},
  {t:"The Correspondent",a:"Virginia Evans",g:"Literary fiction",m:["emotional","cozy"],c:["#d9656f","#f4c7c3"],img:"assets/moods/the-correspondent.jpg",
   d:"Told entirely in letters: Sybil Van Antwerp, a 73-year-old retired lawyer and keen gardener, writes to family, authors, neighbours and strangers about friendship, grief and second chances."},
  {t:"The Fourth Girl",a:"Arefa Tehsin",g:"Mystery thriller",m:["thrilling","dark"],c:["#1f1a17","#c0392b"],img:"assets/moods/the-fourth-girl.jpg",
   d:"Twenty years after a mysterious disappearance, three survivors are reunited at a funeral in Colombo, just as a journalist starts asking what happened to the fourth girl."},
  {t:"One of Us Is Lying",a:"Karen M. McManus",g:"Young adult thriller",m:["thrilling"],c:["#2b2d6e","#e0487a"],img:"assets/moods/one-of-us-is-lying.jpg",
   d:"Simon, creator of Bayview High’s gossip app, dies the day before he can post his classmates’ secrets, and everyone who was in detention with him is a suspect."},
  {t:"The Inheritance Games",a:"Jennifer Lynn Barnes",g:"Young adult mystery",m:["adventurous","thrilling"],c:["#123c2c","#c9a14a"],img:"assets/moods/inheritance-games.jpg",
   d:"An eccentric billionaire leaves almost his entire fortune to Avery, a stranger. To find out why, she moves into his mansion of puzzles and codes, and into a deadly game with his family."},
  {t:"The Vegetarian",a:"Han Kang",g:"Fiction in translation",m:["dark","mind-bending"],c:["#6b1a4a","#e05aa0"],img:"assets/moods/the-vegetarian.jpg",
   d:"After recurring nightmares, Yeong-hye stops eating meat, and her quiet rebellion shocks her family and spirals into something stranger. A disturbing, beautiful novel from the Nobel laureate."},
  {t:"At Night All Blood Is Black",a:"David Diop",g:"Fiction in translation",m:["dark","emotional"],c:["#0f5b63","#2aa3a8"],img:"assets/moods/at-night-all-blood-is-black.jpg",
   d:"A Senegalese soldier fighting for France in the First World War loses his closest friend in the trenches and slides towards violence and madness. International Booker Prize winner."},
  {t:"My First Sudha Murty Stories",a:"Sudha Murty",g:"Children’s · Ages 5+",m:["kids","cozy"],c:["#1e6fb8","#8cc8f0"],img:"assets/moods/sudha-murty-stories.jpg",
   d:"A full-colour treasury of Sudha Murty’s best-loved stories, full of magic, memorable characters and warmth, for children just discovering the joy of reading."},
  {t:"Wild Next Door",a:"Arefa Tehsin",g:"Children’s nature",m:["kids","adventurous"],c:["#e0b21a","#f7e27a"],img:"assets/moods/wild-next-door.jpg",
   d:"Grab a magnifying glass: a guide to the surprising creatures in your own home and garden, from hornets and termites to fireflies, skinks and a fish that seems to walk."},
  {t:"The Naga Warriors 2",a:"Akshat Gupta",g:"Mythological fiction",m:["adventurous","dark"],c:["#6d1414","#d4572a"],img:"assets/moods/naga-warriors-2.jpg",
   d:"The battle for Gokul: warrior sadhus stand against Ahmad Shah Abdali as Krishna, the mysterious Adhiraj and the nameless Naga face their fate. From the author of The Hidden Hindu."},
];
const MOODS = [["all","All"],["cozy","☕ Cozy"],["thrilling","⚡ Thrilling"],["emotional","💧 Emotional"],["adventurous","🧭 Adventurous"],["mind-bending","🌀 Mind-bending"],["inspiring","✨ Inspiring"],["dark","🌒 Dark"],["kids","🐧 For kids"]];
const GENRES = ["Fiction","Mystery","Romance","Poetry","Classics","Science Fiction","Memoir","Young Readers","History","Fantasy"];
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const cover = (b, cls="cover") => b.img ? `<div class="${cls} real" style="background:${b.c[0]}"><img src="${b.img}" alt="${b.t.replace(/"/g,'&quot;')} by ${b.a}" loading="lazy" /></div>` : `<div class="${cls}" style="background:linear-gradient(160deg,${b.c[0]},${b.c[0]} 55%,${b.c[1]})">
  <small>${b.g}</small><span class="motif" style="background:${b.c[1]}"></span><h4>${b.t}</h4><small>${b.a}</small></div>`;

/* ---------------- Loader ---------------- */
let revealed=false;
function revealPage(){ if(revealed) return; revealed=true;
  document.getElementById('loader').classList.add('done');
  document.body.classList.add('ready'); }
if(document.readyState==='complete') setTimeout(revealPage,prefersReduced?0:900);
else addEventListener('load',()=>setTimeout(revealPage,prefersReduced?0:900));
setTimeout(revealPage,2500); // never block on slow fonts/network

/* shared maths helpers */
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)), lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

/* ---------------- First fold v2 (Figma) ---------------- */
const fhHead=document.getElementById('hdr'); let fhLast=0;
const fhMenu=document.getElementById('fhMenu'), navItems=[...fhHead.querySelectorAll('.nh-item')];
const setMenu=open=>{fhHead.classList.toggle('menu-open',open); fhMenu.setAttribute('aria-expanded',open);};
const closeDropdowns=except=>navItems.forEach(it=>{if(it!==except){it.classList.remove('open'); it.firstElementChild.setAttribute('aria-expanded','false');}});
fhMenu.addEventListener('click',()=>setMenu(!fhHead.classList.contains('menu-open')));
navItems.forEach(it=>it.firstElementChild.addEventListener('click',()=>{ // tap/click opens a dropdown (hover works too)
  const open=!it.classList.contains('open'); closeDropdowns(it); it.classList.toggle('open',open); it.firstElementChild.setAttribute('aria-expanded',open);}));
document.getElementById('fhNav').addEventListener('click',e=>{if(e.target.closest('a')){setMenu(false); closeDropdowns();}});
document.addEventListener('click',e=>{if(!e.target.closest('#hdr')){setMenu(false); closeDropdowns();}});
addEventListener('keydown',e=>{if(e.key==='Escape'){setMenu(false); closeDropdowns();}});
// header: soft shadow once scrolled; slides away while scrolling down, returns when scrolling up
addEventListener('scroll',()=>{const y=scrollY; fhHead.classList.toggle('scrolled',y>10);
  fhHead.classList.toggle('hide',y>fhLast&&y>300&&!fhHead.classList.contains('menu-open')); fhLast=y; setMenu(false); closeDropdowns();},{passive:true});
document.getElementById('nhSearch').onclick=()=>{scrollTo({top:0,behavior:'smooth'}); setTimeout(()=>document.getElementById('aiSearch').focus({preventScroll:true}),450);};
// avatar → reader profile menu
const pmBtn=document.getElementById('nhAvatar'), pm=document.getElementById('pmMenu');
function setPm(open){ pm.classList.toggle('open',open); pmBtn.setAttribute('aria-expanded',open); if(open){ renderPm(); setTimeout(()=>pm.querySelector('button').focus({preventScroll:true}),60);} }
pmBtn.onclick=e=>{ e.stopPropagation(); setPm(!pm.classList.contains('open')); };
document.addEventListener('click',e=>{ if(!e.target.closest('.pm-wrap')) setPm(false); });
addEventListener('keydown',e=>{ if(e.key==='Escape'&&pm.classList.contains('open')){ setPm(false); pmBtn.focus(); } });
pm.addEventListener('click',e=>{ const b=e.target.closest('[data-pm]'); if(!b) return; const a=b.dataset.pm;
  if(a==='read'){ autoRead=!autoRead;
    toast2(autoRead?'Penguin will read its answers aloud.':'Read-aloud is off.'); if(!autoRead) stopSpeech(); return renderPm(); }
  setPm(false);
  if(a==='chat') openAi();
  if(a==='profile'){ openAi(); panel.classList.add('side-open'); }
  if(a==='shortlist') return setTimeout(()=>setShelf(true),0);
  if(a==='picks'){ openAi(); ask('Show my picks'); }
  if(a==='clear'){ profile={moods:{},loved:[],forWhom:[],prefs:[],shortlist:[],chose:[],asks:0}; saveProfile(); toast2('Your reader profile has been cleared from this browser.'); } });
// book fan: gentle parallax with the mouse
const fhero=document.getElementById('fhero'), fan=document.getElementById('fhFan');
fhero.addEventListener('mousemove',e=>{fan.style.translate=`${(e.clientX/innerWidth-.5)*-24}px 0`;});
fhero.addEventListener('mouseleave',()=>fan.style.translate='');

/* ---------------- Book popup: click a hero cover → 3D book opens on an AI summary ----------------
   Spreads: 0 closed cover · 1 inside cover | AI summary · 2 themes | is it for me · 3 read-alikes | ask Penguin.
   Summary copy below is demo content; in production it comes from the AI + catalogue API. */
const HERO=[
 {t:'Riley Dare: Slightly Witchy Sleuth',short:'Riley Dare',a:'M.K. England',g:'Middle-grade mystery',line:'An escape-room mystery with a flicker of magic.',
  sum:"Riley Dare loves puzzles and helps run her aunt's escape room, Level Up, adding a flicker of her own magic. When a famous children's mystery author vanishes during a room themed on the town's biggest unsolved heist, and a ghost may have been spotted, Riley and her friends set out to link the disappearance to a crime from twelve years ago.",
  th:[['Mystery',90],['Puzzles',85],['Friendship',80],['Magic',65]],md:['playful','curious','cozy'],
  yes:['you love escape rooms and puzzles','you like mysteries with a little magic','you want a fun, twisty read for young readers'],no:'you want a dark, grown-up crime novel',m:94,al:[4,2,5]},
 {t:'The Accidental Protector',a:'Amanda McKinney',g:'Romantic suspense',line:'Romantic suspense at a remote security compound.',
  sum:"After a brutal attack, prosecutor Niki Avery goes into hiding at a remote security compound run by Gage Steele, a former Marine who never wanted to take over his late father's firm. As questions about his father's death surface and danger finds Niki again, Gage has to decide how close he can let himself get to the woman he's protecting.",
  th:[['Romance',90],['Suspense',85],['Protection',80],['Family secrets',75]],md:['romantic','tense','dramatic'],
  yes:['you love romantic suspense','you like a brooding protector hero','you enjoy series you can binge'],no:'you want a slow, quiet literary read',m:87,al:[3,6,5]},
 {t:'God Save the Dork',a:'Sidin Vadukut',g:'Humour',line:'Corporate comedy, now with jet lag.',
  sum:"Management consultant Robin 'Einstein' Varghese is sent to London to work on the Lederman account, and very little goes to plan: confusing pay, a colleague who sends mixed signals, museums that seem determined to defeat him, and a client threatening to pull the plug. The second book in Sidin Vadukut's comic Dork trilogy.",
  th:[['Office comedy',90],['Culture clash',80],['Ambition',70],['Awkward romance',60]],md:['funny','light','satirical'],
  yes:['you enjoy workplace comedy','you liked the first Dork book','you want something light for the commute'],no:'you want a serious literary novel',m:91,al:[4,6,0]},
 {t:'What We Did to Survive',a:'Megan Lally',g:'Young adult thriller',line:'A spring-break sail turns into a fight to survive.',
  sum:"Hannah is on spring break in Mexico with her best friend Emmy's family, including Emmy's older brother Jackson, her long-time crush. When Emmy's wealthy new boyfriend charters a sailboat for their last day, theirs is the only boat leaving the marina as a storm rolls in, and the danger on board may be as deadly as the weather.",
  th:[['Suspense',90],['Survival',90],['Secrets',80],['Friendship',75]],md:['thrilling','tense','dark'],
  yes:['you like fast young adult thrillers','you enjoy stories set at sea','you want a proper page-turner'],no:'peril at sea makes you anxious',m:89,al:[1,6,0]},
 {t:'Nirmala & Normala',a:'Sowmya Rajendran',tr:'Illustrated by Niveditha Subramaniam',g:'Graphic novel · Satire',line:'A graphic-novel satire of film clichés.',
  sum:"Twins separated at birth grow up very differently: one becomes a film heroine, the other an ordinary woman. Sowmya Rajendran's graphic novel, illustrated by Niveditha Subramaniam, uses the setup to skewer the clichés of commercial cinema and to call out the harassment that films often pass off as romance.",
  th:[['Satire',90],['Cinema clichés',85],['Gender',80],['Sisterhood',65]],md:['witty','sharp','playful'],
  yes:['you love Indian cinema, and laughing at it','you enjoy graphic novels','you like satire with something to say'],no:'you want a straight-faced romance',m:92,al:[2,6,0]},
 {t:'The Hidden Hindu',a:'Akshat Gupta',g:'Mythological thriller',line:'Hindu mythology meets a modern thriller.',
  sum:"Twenty-one-year-old Prithvi is searching for Om Shastri, a mysterious aghori held and questioned at a high-tech facility on an isolated island. Under hypnosis, Om claims to have lived through all four yugas and taken part in the Ramayana and the Mahabharata, and to be seeking the other immortals. The first book in Akshat Gupta's trilogy.",
  th:[['Mythology',95],['Immortality',85],['Mystery',80],['Adventure',80]],md:['mind-bending','adventurous','epic'],
  yes:['you love mythology retold as a thriller','you enjoy series with big reveals','you like mysteries rooted in the past'],no:'you prefer strictly realistic fiction',m:93,al:[6,3,0]},
 {t:'Mumbai Confidential',a:'Saurav Mohapatra & Vivek Shinde',g:'Graphic novel · Crime noir',line:'Hard-boiled Mumbai noir in graphic-novel form.',
  sum:"Arjun Kadam was a rising star in Mumbai's encounter squad until the death of his wife sent him spiralling into depression and addiction. A hit-and-run leaves him in a month-long coma, and what follows is a hard-boiled story of crime, punishment and redemption in the city's underbelly, told in graphic-novel form.",
  th:[['Crime',90],['City noir',90],['Redemption',80],['Corruption',75]],md:['dark','gritty','intense'],
  yes:['you like hard-boiled crime stories','you enjoy graphic novels for adults','you want Mumbai at its grittiest'],no:'you want something light or family-friendly',m:88,al:[5,3,1]}
];
HERO.push(
 {t:'Rich Dad Poor Dad',a:'Robert T. Kiyosaki',g:'Personal finance',line:'The classic that turned money lessons into a story.',
  sum:"Robert Kiyosaki grew up learning from two father figures: his own highly educated but financially struggling father, and his best friend's father, a self-made businessman. Contrasting their advice, he makes the case for financial literacy: knowing the difference between assets and liabilities, and making money work for you instead of working for money.",
  th:[['Money mindset',90],['Financial literacy',90],['Entrepreneurship',75],['Family lessons',70]],md:['practical','motivating','accessible'],
  yes:["you're new to personal finance",'you like big ideas explained through stories','you want to rethink how you earn and spend'],no:'you want a detailed, technical investing manual',m:90,al:[8,2,5]},
 {t:'Build an Epic Career',a:'Ankur Warikoo',g:'Career · Penguin Business',line:'A practical career guide for Gen Z and millennials.',
  sum:"Ankur Warikoo argues that the world of work has changed while most career advice hasn't. Written for Gen Z and millennials, the book helps you define what success means to you and build a career with money, growth, fulfilment and purpose, from the bestselling author of Do Epic Sh*t and Make Epic Money.",
  th:[['Career growth',90],['Self-reflection',80],['Purpose',80],['Money',75]],md:['practical','motivating','modern'],
  yes:["you're starting out or switching careers",'you like actionable, bite-sized advice','you enjoyed Do Epic Sh*t'],no:'you want a narrative or a novel',m:92,al:[7,2,5]});
HERO.forEach((b,i)=>b.img=`assets/v2/cover-${i+1}.png`);
/* Penguin India "All-time bestsellers" (penguin.co.in homepage). Summaries are written in our own words from each
   book's page on penguin.co.in; The Courage to Be Disliked has no description there, so its copy is general. */
const BEST=[
 {slug:'atomic-habits',t:'Atomic Habits',a:'James Clear',g:'Self-help',line:'Why tiny daily changes add up to big results.',
  sum:"Habits expert James Clear argues that lasting change doesn't come from one giant leap but from the compound effect of many small choices. He explains how tiny routines grow into life-changing results, with practical tools such as habit stacking and the two-minute rule, backed by psychology and neuroscience.",
  th:[['Habits',95],['Self-improvement',90],['Productivity',80],['Psychology',70]],md:['practical','motivating','clear'],
  yes:['you want a system, not just motivation','you like science-backed, practical advice','you keep starting habits and dropping them'],no:'you want a story rather than a guide',m:95,col:'#b8913f'},
 {slug:'ikigai',t:'Ikigai',a:'Héctor García & Francesc Miralles',g:'Wellbeing',line:'The Japanese idea of a reason to get up in the morning.',
  sum:"Ikigai is the Japanese word for a reason to live: the point where your needs, passions, skills and sense of purpose meet. The book explores how finding it is linked to a longer, happier life, and helps you work out what your own ikigai might be.",
  th:[['Purpose',95],['Wellbeing',85],['Longevity',75],['Japanese culture',70]],md:['calm','reflective','uplifting'],
  yes:['you are looking for more meaning day to day','you like short, gentle reads','you are curious about Japanese ideas of wellbeing'],no:'you want a detailed, step-by-step programme',m:92,col:'#7fa6bd'},
 {slug:'heart-lamp',t:'Heart Lamp',a:'Banu Mushtaq',tr:'Translated from the Kannada by Deepa Bhasthi',g:'Short stories · In translation',line:'Stories of women’s everyday lives in southern India.',
  sum:"Translated from the Kannada, these stories capture the everyday lives of women and girls in Muslim communities in southern India, drawing on Banu Mushtaq's years as a journalist and lawyer. They are witty, vivid and moving by turns, full of spirited children, bold grandmothers and mothers carrying more than anyone sees.",
  th:[['Women’s lives',95],['Family & community',85],['Faith & power',75],['Resilience',80]],md:['moving','witty','vivid'],
  yes:['you love short stories','you want to read Indian writing in translation','you like fiction with humour and heart'],no:'you want one long, plot-driven novel',m:90,col:'#a3291f'},
 {slug:'can-we-be-strangers-again',t:'Can We Be Strangers Again?',a:'Shrijeet Shandilya',g:'Romance',line:'Three college friends, one love story, and a betrayal.',
  sum:"Three college friends are bound by laughter, late-night talks and unspoken promises, until two of them fall in love and a betrayal breaks the group apart. As friendships fracture and feelings get tangled, Dev has to decide whether he is willing to risk his heart all over again.",
  th:[['Love',90],['Friendship',85],['Heartbreak',85],['College life',75]],md:['romantic','emotional','bittersweet'],
  yes:['you love college romances','you like stories about friendship and heartbreak','you want an easy, emotional read'],no:'you prefer thrillers or non-fiction',m:88,col:'#7fb3be'},
 {slug:'mother-mary-comes-to-me',t:'Mother Mary Comes to Me',a:'Arundhati Roy',g:'Memoir',line:'Arundhati Roy’s memoir of her mother, and of becoming a writer.',
  sum:"Shaken by the death of the mother she ran away from at eighteen, Arundhati Roy began this memoir: an intimate account of their relationship and of how she became the person and the writer she is, from the author of The God of Small Things.",
  th:[['Mothers & daughters',95],['Memory',85],['Becoming a writer',85],['India',75]],md:['intimate','powerful','reflective'],
  yes:['you loved The God of Small Things','you enjoy literary memoirs','you like writing about family and grief'],no:'you want something light and quick',m:91,col:'#c22a26'},
 {slug:'the-art-of-letting-go',t:'The Art of Letting Go',a:'Nick Trenton',g:'Self-help',line:'Quiet an overthinking mind and find your calm.',
  sum:"If your mind never switches off, this book is about clearing the clutter. Nick Trenton offers psychology-based tips to stop dwelling on the past or worrying about a future that may never happen, manage your self-talk, and get back to a sense of inner peace.",
  th:[['Overthinking',90],['Emotional calm',90],['Self-talk',80],['Mindset',75]],md:['calming','practical','reassuring'],
  yes:['you tend to overthink','you want short, practical exercises','you are working on letting go of the past'],no:'you want a narrative or memoir',m:89,col:'#a8201f'},
 {slug:'thank-you-for-leaving',t:'Thank You for Leaving',a:'Rithvik Singh',g:'Poetry',line:'Poems for people who feel everything deeply.',
  sum:"A collection of poems for people who feel everything deeply: those who overthink, over-love and still believe in kindness. Rithvik Singh writes about heartbreak, letting go and the privilege of feeling emotions intensely.",
  th:[['Heartbreak',90],['Letting go',85],['Love',85],['Self-worth',75]],md:['tender','emotional','hopeful'],
  yes:['you love modern poetry','you are healing from a breakup','you like short pieces you can dip into'],no:'you want a long narrative',m:87,col:'#7d8b3c'},
 {slug:'the-housemaid',t:'The Housemaid',a:'Freida McFadden',g:'Psychological thriller',line:'A live-in job that looks like a fresh start. It isn’t.',
  sum:"Desperate for a fresh start, Millie takes a live-in job cleaning the Winchesters’ beautiful home and looking after their daughter. But Nina Winchester’s behaviour is strange, her husband seems more broken by the day, and the house is hiding more than it lets on.",
  th:[['Suspense',95],['Secrets',90],['Twists',90],['Domestic drama',80]],md:['thrilling','dark','addictive'],
  yes:['you love twisty page-turners','you enjoy unreliable characters','you want a book you can’t put down'],no:'dark themes aren’t for you right now',m:93,col:'#1f3d6b'},
 {slug:'the-courage-to-be-disliked',t:'The Courage to Be Disliked',a:'Ichiro Kishimi & Fumitake Koga',g:'Self-help · Philosophy',line:'How to free yourself, change your life and find happiness.',
  sum:"Told as a conversation between a philosopher and a young man, this Japanese bestseller introduces the ideas of psychologist Alfred Adler: that we are not defined by our past, and that the courage to live freely, even at the risk of being disliked, is the path to real happiness.",
  th:[['Freedom',90],['Happiness',85],['Relationships',80],['Philosophy',85]],md:['thought-provoking','calm','challenging'],
  yes:['you like ideas explained through dialogue','you worry about what others think','you enjoy philosophy made practical'],no:'you want quick tips rather than big ideas',m:90,col:'#c1121f'},
 {slug:'12-rules-for-life',t:'12 Rules for Life',a:'Jordan B. Peterson',g:'Self-help',line:'Twelve principles for a life of responsibility and meaning.',
  sum:"Clinical psychologist Jordan B. Peterson draws on his practice and on lessons from humanity’s oldest myths and stories to offer twelve principles to live by, aimed at helping readers take responsibility and build a meaningful life.",
  th:[['Responsibility',95],['Meaning',90],['Psychology',80],['Myth & story',70]],md:['direct','challenging','reflective'],
  yes:['you want big-picture life principles','you like psychology mixed with philosophy','you are ready for tough-love advice'],no:'you prefer gentle, feel-good reads',m:86,col:'#8c6d55'}
];
// refresh the two Figma books with details from their penguin.co.in pages
Object.assign(HERO[7],{sum:"Twenty-five years on, Robert Kiyosaki's classic is still ranked the number one personal finance book of all time. Contrasting the money lessons of his two father figures, it makes the case that financial literacy, not income, is what builds wealth, and this anniversary edition adds updates for today's world.",
  line:'Still the number one personal finance book of all time.'});
Object.assign(HERO[8],{sum:"From the day we're born we're told to settle: finish college, find a job, get married, buy the house. Ankur Warikoo speaks to readers who are scared of settling for the wrong thing, with a practical guide to building a career with money, growth, fulfilment and purpose.",
  line:'For everyone who is scared of settling for the wrong thing.'});
const BEST_AT=HERO.length;
BEST.forEach(b=>HERO.push({...b,img:`assets/bestsellers/${b.slug}.jpg`}));
// read-alikes within the bestsellers
const BI=s=>BEST_AT+BEST.findIndex(b=>b.slug===s);
const ALIKE={'atomic-habits':[7,8,BI('the-courage-to-be-disliked')],'ikigai':[BI('the-art-of-letting-go'),BI('the-courage-to-be-disliked'),BI('atomic-habits')],
 'heart-lamp':[BI('mother-mary-comes-to-me'),BI('thank-you-for-leaving'),BI('can-we-be-strangers-again')],'can-we-be-strangers-again':[BI('thank-you-for-leaving'),BI('heart-lamp'),BI('the-housemaid')],
 'mother-mary-comes-to-me':[BI('heart-lamp'),BI('thank-you-for-leaving'),BI('ikigai')],'the-art-of-letting-go':[BI('ikigai'),BI('the-courage-to-be-disliked'),BI('atomic-habits')],
 'thank-you-for-leaving':[BI('can-we-be-strangers-again'),BI('the-art-of-letting-go'),BI('heart-lamp')],'the-housemaid':[BI('can-we-be-strangers-again'),6,3],
 'the-courage-to-be-disliked':[BI('ikigai'),BI('12-rules-for-life'),BI('the-art-of-letting-go')],'12-rules-for-life':[BI('atomic-habits'),BI('the-courage-to-be-disliked'),7]};
BEST.forEach(b=>{HERO[BI(b.slug)].al=ALIKE[b.slug];});
HERO[7].al=[8,BI('atomic-habits'),BI('12-rules-for-life')]; HERO[8].al=[7,BI('atomic-habits'),BI('the-courage-to-be-disliked')];
// mood-shelf books open in the same 3D book view (cover · AI summary · video story · book details)
BOOKS.forEach(b=>{ const k=HERO.findIndex(h=>h.t===b.t); if(k>=0){ b.hero=k; return; }
  const md=b.m.filter(m=>m!=='kids'), mw=md.length>1?`${md.slice(0,-1).join(', ')} and ${md[md.length-1]}`:md[0]||'';
  b.hero=HERO.length; HERO.push({t:b.t,a:b.a,g:b.g,img:b.img,line:mw?`${mw[0].toUpperCase()+mw.slice(1)} ${b.g.toLowerCase()}.`:b.g,sum:b.d,md,al:[]}); });
const BM={el:document.getElementById('bm'),book:document.getElementById('bmBook'),fly:document.getElementById('bmFly'),tilt:document.getElementById('bmTilt'),
  stage:document.getElementById('bmStage'),tabs:document.getElementById('bmTabs'),prev:document.getElementById('bmPrev'),next:document.getElementById('bmNext'),
  i:-1,s:0,side:'R',mobile:false,origin:null,timers:[],busy:false,typed:false,typer:null};
const TABS=['Cover','AI summary','Book details'];
/* The cast: movie-style character credits on the inside cover. Names come from each book's description (or the
   well-known main characters); unnamed characters are listed by role. Portraits are illustrated silhouettes. */
const CAST_CREDIT={'What We Did to Survive':'Fan dream cast · via @gareindeedreads'};
const CAST={
  'Riley Dare: Slightly Witchy Sleuth':[['Riley Dare','The witchy sleuth','kid-f'],['Her aunt','Runs the Level Up escape room','f-bun'],['The author','Famous mystery writer who vanishes','m-elder']],
  'The Accidental Protector':[['Niki Avery','Prosecutor in hiding','f-long'],['Gage Steele','Ex-Marine, her protector','m-beard']],
  'God Save the Dork':[["Robin 'Einstein' Varghese",'Consultant adrift in London','m-glasses']],
  // photo cast: a fan "dream cast" (credit below). Fourth item = portrait image instead of a silhouette.
  'What We Did to Survive':[['Hannah','On spring break','f-long','assets/cast/wwdts-1.png'],['Emmy','Her best friend','f-bun','assets/cast/wwdts-2.png'],['Jackson','Emmy’s brother, her crush','m-short','assets/cast/wwdts-3.png'],['The boyfriend','Charters the sailboat','m-beard','assets/cast/wwdts-4.png']],
  'Nirmala & Normala':[['Nirmala','Twin separated at birth','f-long'],['Normala','Her twin','f-bun']],
  'The Hidden Hindu':[['Prithvi','21, searching for Om','m-short'],['Om Shastri','The aghori who claims to be immortal','m-long']],
  'Mumbai Confidential':[['Arjun Kadam','Fallen encounter-squad cop','m-beard']],
  'Rich Dad Poor Dad':[['Robert','The boy who learns from both','kid-m'],['Rich Dad','Self-made businessman','m-elder'],['Poor Dad','Educated, always short of money','m-glasses']],
  'Can We Be Strangers Again?':[['Dev','Risking his heart again','m-short'],['The friends','Bound by unspoken promises','f-long']],
  'Mother Mary Comes to Me':[['Arundhati Roy','The author','f-curly'],['Mary Roy','Her mother','f-elder']],
  'The Housemaid':[['Millie','The new housemaid','f-long'],['Nina Winchester','Lady of the house','f-bun'],['Andrew Winchester','Nina’s husband','m-short']],
  'The Courage to Be Disliked':[['The philosopher','Teacher of Adler’s ideas','m-elder'],['The young man','Sceptic with questions','m-short']],
  'The Correspondent':[['Sybil Van Antwerp','73, retired lawyer and letter-writer','f-elder']],
  'The Fourth Girl':[['The survivors','Reunited after twenty years','f-long'],['The journalist','Asking what happened','n']],
  'One of Us Is Lying':[['Simon','Creator of the gossip app','m-glasses'],['Bronwyn','The brain','f-long'],['Addy','The beauty','f-bun'],['Nate','The criminal','m-short']],
  'The Inheritance Games':[['Avery Grambs','The unexpected heiress','f-long'],['Tobias Hawthorne','The billionaire','m-elder'],['Jameson Hawthorne','A grandson','m-short'],['Grayson Hawthorne','A grandson','m-short']],
  'The Vegetarian':[['Yeong-hye','Stops eating meat','f-long'],['Mr Cheong','Her husband','m-glasses'],['In-hye','Her sister','f-bun']],
  'At Night All Blood Is Black':[['Alfa Ndiaye','Senegalese soldier','m-short'],['Mademba Diop','His more-than-brother','m-short']],
  'The Naga Warriors 2':[['Krishna','At the battle for Gokul','m-long'],['Adhiraj','The mysterious warrior','m-beard'],['The nameless Naga','Warrior sadhu','m-long'],['Ahmad Shah Abdali','The invader','m-beard']]};
function portrait(k){ const kid=/^kid/.test(k), hy=kid?30:26, hr=kid?12:11, S='#2a1206', C='#FFE3CF', p=[];
  if(/f-long|m-long/.test(k)) p.push(`<path d="M${k[0]==='m'?21:19} 26c0-10 6-16 13-16s13 6 13 16c0 ${k[0]==='m'?'6 1 11 2 15H19c1-4 2-9 2-15':'8 2 14 4 21H15c2-7 4-13 4-21'}z" fill="${S}"/>`);
  if(k==='f-curly') p.push(`<circle cx="32" cy="24" r="15" fill="${S}"/>`);
  p.push(`<path d="${kid?'M15 64c1-10 8-15 17-15s16 5 17 15z':'M9 64c1-13 10-20 23-20s22 7 23 20z'}" fill="${S}"/><rect x="28" y="${hy+6}" width="8" height="12" fill="${S}"/><circle cx="32" cy="${hy}" r="${hr}" fill="${S}"/>`);
  if(/bun|elder/.test(k)&&k[0]==='f') p.push(`<circle cx="32" cy="${hy-13}" r="${k==='f-elder'?5:6}" fill="${S}"/>`);
  if(k==='kid-f') p.push(`<circle cx="20" cy="${hy-2}" r="4.5" fill="${S}"/><circle cx="44" cy="${hy-2}" r="4.5" fill="${S}"/>`);
  if(/m-short|m-glasses|kid-m|m-beard/.test(k)) p.push(`<path d="M${kid?21:22} ${hy-7}c2-7 8-10 14-8 6 2 8 6 7 10-4-3-12-5-21-2z" fill="${S}"/>`);
  if(k==='m-beard'||k==='m-long') p.push(`<path d="M22 ${hy+1}c0 9 4 14 10 14s10-5 10-14c-2 4-6 6-10 6s-8-2-10-6z" fill="${S}"/>`);
  if(/glasses|elder/.test(k)) p.push(`<g fill="none" stroke="${C}" stroke-width="1.3" opacity=".9"><circle cx="27.5" cy="${hy+1}" r="3.6"/><circle cx="36.5" cy="${hy+1}" r="3.6"/><path d="M31.1 ${hy+1}h1.8"/></g>`);
  return `<svg viewBox="0 0 64 64" aria-hidden="true">${p.join('')}</svg>`; }
const castHTML=b=>{ const c=CAST[b.t]; if(!c) return '';
  return `<div class="bm-cast"><span class="bm-cast-k">✦ The cast</span><div class="bm-cast-row">${c.slice(0,4).map(([n,r,k,img])=>`<div class="bm-actor"><span class="bm-pic${img?' photo':''}">${img?`<img src="${img}" alt="${esc(n)}" />`:portrait(k)}</span><b>${esc(n)}</b><i>${esc(r)}</i></div>`).join('')}</div><span class="bm-cast-note">${CAST_CREDIT[b.t]||'Illustrated cast · imagined by Penguin'}</span></div>`; };
const SPREADS=TABS.length; // spread 0 cover · 1 inside cover | AI summary · 2 book details | where to buy
/* Book details. DEMO VALUES: until real catalogue data is wired in, each book gets plausible details derived from its
   title (stable on every load). Put real data on a HERO entry as det:{imprint,pub,isbn,pages,mrp} to override. */
const RETAIL=[{n:'SapnaOnline',k:'sapna',logo:'sapna',u:q=>`https://www.sapnaonline.com/search?keyword=${q}`},
  {n:'Crossword',k:'crossword',logo:'CROSSWORD',u:q=>`https://www.crossword.in/search?q=${q}`},
  {n:'Atlantic',k:'atlantic',logo:'ATLANTIC',u:q=>`https://www.atlanticbooks.com/search?q=${q}`},
  {n:'Amazon',k:'amazon',logo:'amazon',u:q=>`https://www.amazon.in/s?k=${q}`}];
function detailsFor(b){ if(b.det) return b.det;
  let h=0; for(const c of b.t) h=(h*31+c.charCodeAt(0))>>>0; const r=n=>{h=(h*1103515245+12345)>>>0; return h%n;};
  const g=b.g.toLowerCase(), imprint=/children|middle-grade/.test(g)?'Puffin':/self-help|wellbeing|philosophy/.test(g)?'Ebury Press':/career|finance|business/.test(g)?'Penguin Business':/translation|literary/.test(g)?'Hamish Hamilton':'Penguin';
  const body='93'+String(5000000+r(4999999)).padStart(7,'0'), d='978'+body, chk=(10-[...d].reduce((a,c,i)=>a+(+c)*(i%2?3:1),0)%10)%10;
  return {imprint,pub:`${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][r(12)]}/${2024+r(3)}`,isbn:d+chk,pages:176+r(260),mrp:[299,350,399,450,499,599][r(6)]}; }
BM.tabs.innerHTML=TABS.map((t,k)=>`<button type="button" data-k="${k}">${t}</button>`).join('');
const wait=ms=>new Promise(r=>BM.timers.push(setTimeout(r,prefersReduced?0:ms)));
const foot=(n,l)=>`<div class="bm-foot"><span>${l}</span><span>${n}</span></div>`;
function bookHTML(b){
  const leaf=(cls,z,front,back,dur)=>`<div class="bm-leaf ${cls}" style="--z:${z}px${dur?';--dur:'+dur:''}"><div class="bm-face front">${front}</div><div class="bm-face back">${back}</div></div>`;
  return `<div class="bm-board"></div><div class="bm-edge"></div><div class="bm-edge l"></div>
  <div class="bm-base"><div class="bm-paper"><div class="bm-k"><span>Where to buy</span></div>
    <h4 class="bm-fmt">Paperback / Hardback</h4>
    <div class="bm-shops">${RETAIL.map(x=>`<a class="bm-shop" href="${x.u(encodeURIComponent(b.t))}" target="_blank" rel="noopener"><span class="rt ${x.k}">${x.logo}</span><b>${x.n}</b><i aria-hidden="true">↗</i></a>`).join('')}</div>
    <div class="bm-links"><a href="${linkFor(b).buy}" target="_blank" rel="noopener">Penguin.co.in ↗</a><a href="${linkFor(b).audible}" target="_blank" rel="noopener">🎧 Audible</a>${(on=>`<button class="bm-shelf${on?' on':''}" type="button">${on?'♥ On your shelf':'♡ Add to my shelf'}</button>`)(profile.shortlist.includes(b.t))}</div>
    <form class="bm-ask" id="bmAsk"><input aria-label="Ask Penguin about this book" placeholder="Still deciding? Ask Penguin…" /><button aria-label="Ask">→</button></form>${foot(3,'Prices and stock are set by each retailer')}</div></div>
  ${leaf('cover',16,`<div class="bm-cover"><img src="${b.img}" alt="" /></div>`,
     `<div class="bm-end"><span class="bm-logo"><img src="assets/v2/logo-penguin.png" alt="" /></span><small>✦ Opened by Penguin</small><h3>${b.t}</h3><p>${b.a}${b.tr?`<br><em>${b.tr}</em>`:''}</p><span class="hint">Penguin's AI summary is ready →</span>${castHTML(b)}</div>`)}
  ${leaf('',5,`<div class="bm-paper" id="bmSumPage"><div class="bm-k"><span>✦ AI summary</span><span class="bm-kb"><button type="button" data-speak>🔊 Listen</button><button type="button" id="bmRegen">↻ Regenerate</button></span></div>
      <h3 class="bm-t">${b.t}</h3><div class="bm-a">by ${b.a} · ${b.g}</div><p class="bm-sum" id="bmSum"></p><p class="bm-line">${b.line}</p><button class="bm-vid" type="button" data-video><span class="bm-vid-th" style="background-image:url(${b.img})"><i>▶</i></span><span class="bm-vid-tx"><small>✦ Video summary</small><b>The story, told</b><span>A narrated story · ~1 min</span></span></button>${foot(1,'AI-generated · can make mistakes')}</div>`,
    `<div class="bm-paper">${(d=>`<div class="bm-k"><span>Book details</span></div><h3 class="bm-t sm">${b.t}</h3><div class="bm-a">by ${b.a}</div>
      <dl class="bm-det"><div><dt>Imprint</dt><dd>${d.imprint}</dd></div><div><dt>Published</dt><dd>${d.pub}</dd></div><div><dt>ISBN</dt><dd>${d.isbn} (Paperback)</dd></div>
      <div><dt>Length</dt><dd>${d.pages} Pages</dd></div><div><dt>MRP</dt><dd>₹${d.mrp.toFixed(2)}</dd></div><div><dt>Genre</dt><dd>${b.g}</dd></div></dl>`)(detailsFor(b))}${foot(2,'Penguin Random House India')}</div>`)}`;
}
const realLeaves=()=>[...BM.book.querySelectorAll('.bm-leaf')];
function setSpread(s,{instant,side}={}){
  s=clamp(s,0,SPREADS-1); BM.s=s; BM.book.dataset.s=s; BM.side=s===0?'R':(side||BM.side);
  if(instant) BM.book.classList.add('snap');
  realLeaves().forEach((lf,k)=>{const a=k<s?-180:0; if(lf.style.getPropertyValue('--a')!==a+'deg'){lf.style.setProperty('--a',a+'deg'); if(!instant){lf.classList.add('turn'); setTimeout(()=>lf.classList.remove('turn'),950);}}});
  // desktop shows the whole spread; phones show one page and slide between the left and right page
  BM.book.style.setProperty('--shift',BM.mobile?`${BM.side==='R'?-BM.pw/2:BM.pw/2}px`:(s===0?`${-BM.pw/2}px`:'0px'));
  if(instant){BM.book.offsetWidth; BM.book.classList.remove('snap');}
  BM.tabs.querySelectorAll('button').forEach((b,k)=>b.classList.toggle('on',k===s));
  BM.prev.disabled=s===0; BM.next.disabled=s===SPREADS-1&&(!BM.mobile||BM.side==='R');
  if(s>=1&&!BM.typed&&!BM.busy) typeSummary();
}
function typeSummary(){
  const b=HERO[BM.i], el=document.getElementById('bmSum'), page=document.getElementById('bmSumPage'); if(!el) return;
  BM.typed=true; clearInterval(BM.typer); page.classList.remove('done');
  const words=b.sum.split(' '); let n=0;
  if(prefersReduced){el.textContent=b.sum; page.classList.add('done'); return;}
  el.innerHTML='<span class="cur"></span>';
  BM.typer=setInterval(()=>{n++; el.innerHTML=words.slice(0,n).join(' ')+'<span class="cur"></span>'; if(n>=words.length){clearInterval(BM.typer); el.textContent=b.sum; page.classList.add('done');}},34);
}
function sizeBM(){BM.mobile=innerWidth<640; BM.pw=Math.floor(BM.mobile?Math.min(360,innerWidth-56,(innerHeight-200)/1.45):Math.min(390,(innerWidth-40)/2,(innerHeight-200)/1.45)); BM.book.style.setProperty('--pw',BM.pw+'px');}
function fromOrigin(){ // transform that places the closed book exactly over the clicked fan cover
  const img=BM.origin.querySelector('img'), r=img.getBoundingClientRect(), f=BM.fly.getBoundingClientRect();
  const fanScale=BM.origin.closest('#fhFan')?fan.getBoundingClientRect().width/fan.offsetWidth:1;
  const rot=parseFloat(getComputedStyle(BM.origin).getPropertyValue('--r'))||0;
  return `translate(${r.left+r.width/2-(f.left+f.width/2)}px,${r.top+r.height/2-(f.top+f.height/2)}px) rotate(${rot}deg) scale(${img.offsetWidth*fanScale/BM.pw})`;
}
async function openBook(i,origin){
  if(BM.busy||BM.el.classList.contains('open')) return;
  BM.busy=true; BM.i=i; BM.origin=origin; BM.typed=false; BM.lastFocus=document.activeElement;
  BM.el.setAttribute('aria-label',`${HERO[i].t}: AI book preview`);
  BM.book.innerHTML=bookHTML(HERO[i]); sizeBM(); setSpread(0,{instant:true});
  document.body.classList.add('bm-lock'); BM.el.classList.remove('closing'); BM.el.classList.add('open');
  origin.style.visibility='hidden';
  if(!prefersReduced) BM.fly.animate([{transform:fromOrigin()},{transform:'none'}],{duration:850,easing:'cubic-bezier(.22,1,.36,1)'});
  BM.el.querySelector('.bm-x').focus({preventScroll:true});
  await wait(900); setSpread(1,{side:'R'}); // cover swings open straight onto the content (no blank pages)
  await wait(520); BM.busy=false; typeSummary();          // Penguin's summary streams in
}
async function closeBook(){
  if(!BM.el.classList.contains('open')||BM.closing) return;
  BM.closing=true; VP.close(); stopSpeech(); BM.timers.forEach(clearTimeout); BM.timers=[]; clearInterval(BM.typer);
  if(BM.s>0){BM.book.classList.add('fast'); setSpread(0); await new Promise(r=>setTimeout(r,prefersReduced?0:600));}
  BM.el.classList.add('closing');
  if(!prefersReduced&&BM.origin){ const a=BM.fly.animate([{transform:'none'},{transform:fromOrigin()}],{duration:600,easing:'cubic-bezier(.55,0,.2,1)',fill:'forwards'}); await a.finished; a.cancel(); }
  if(BM.origin){BM.origin.style.visibility=''; BM.origin.focus({preventScroll:true});}
  BM.el.classList.remove('open','closing'); BM.book.classList.remove('fast'); document.body.classList.remove('bm-lock');
  BM.book.innerHTML=''; BM.busy=false; BM.closing=false;
}
const originFor=i=>{ // a copy of the cover that's on screen (card), else the hero fan, else the spotlight book
  const on=[...document.querySelectorAll(`[data-hero="${i}"] .pc`)].find(el=>{const r=el.getBoundingClientRect(); return r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;});
  return on||fan.children[i]||document.querySelector(`.bk[data-hero="${i}"] .cover`)||document.getElementById('sbFront'); };
async function switchBook(i){ // open a read-alike: close the cover, swap the book, reopen on its summary
  if(BM.busy||i===BM.i) return; BM.busy=true;
  setSpread(0); await wait(950);
  if(BM.origin) BM.origin.style.visibility='';
  BM.origin=originFor(i); BM.origin.style.visibility='hidden';
  BM.i=i; BM.typed=false; BM.book.innerHTML=bookHTML(HERO[i]);
  setSpread(0,{instant:true}); await wait(60); BM.busy=false; setSpread(1,{side:'R'});
}
// wire the hero fan
[...fan.children].forEach((el,i)=>{el.tabIndex=0; el.setAttribute('role','button'); el.setAttribute('aria-label',`Open ${HERO[i].t} with Penguin's AI summary`);
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); openBook(i,el);}});});
fan.addEventListener('click',e=>{const b=e.target.closest('.fh-book'); if(b) openBook([...fan.children].indexOf(b),b);});
// popup controls
BM.el.addEventListener('click',e=>{
  if(e.target.closest('[data-close]')) return closeBook();
  const sp=e.target.closest('[data-speak]'); if(sp) return speak(HERO[BM.i].sum,sp);
  if(e.target.closest('[data-video]')) return VP.open(HERO[BM.i]);
  const tab=e.target.closest('.bm-tabs button'); if(tab&&!BM.busy) return setSpread(+tab.dataset.k,{side:+tab.dataset.k>=2?'L':'R'});
  if(e.target.closest('#bmRegen')){BM.typed=false; return typeSummary();}
  const al=e.target.closest('.bm-al'); if(al) return switchBook(+al.dataset.k);
  const q=e.target.closest('.bm-q'); if(q){ const t=`${q.dataset.q} (${HERO[BM.i].t})`; return closeBook().then(()=>{openAi(); ask(t);}); }
  const sh=e.target.closest('.bm-shelf'); if(sh){ const c=byTitle(HERO[BM.i].t); if(c) toggleShort(c); const on=profile.shortlist.includes(HERO[BM.i].t); sh.classList.toggle('on',on); sh.textContent=on?'♥ On your shelf':'♡ Add to my shelf'; if(on) toast2(`Added to My Shelf · ${HERO[BM.i].short||HERO[BM.i].t}`); }
});
BM.el.addEventListener('submit',e=>{e.preventDefault(); const inp=e.target.querySelector('input'); if(inp.value.trim()){ const t=`${inp.value.trim()} (${HERO[BM.i].t})`; inp.value=''; closeBook().then(()=>{openAi(); ask(t);}); }});
function step(d){ if(BM.busy) return; if(!BM.mobile) return setSpread(BM.s+d);
  if(d>0){ if(BM.side==='L') setSpread(BM.s,{side:'R'}); else if(BM.s<SPREADS-1) setSpread(BM.s+1,{side:'L'}); }
  else { if(BM.side==='R'&&BM.s>0) setSpread(BM.s,{side:'L'}); else if(BM.side==='L') setSpread(BM.s-1,{side:'R'}); } }
BM.prev.onclick=()=>step(-1);
BM.next.onclick=()=>step(1);
addEventListener('keydown',e=>{ if(!BM.el.classList.contains('open')||document.activeElement.tagName==='INPUT') return;
  if(e.key==='Escape'&&!panel.classList.contains('open')) closeBook();
  if(e.key==='ArrowRight') BM.next.click(); if(e.key==='ArrowLeft') BM.prev.click(); });
BM.stage.addEventListener('mousemove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5; BM.tilt.style.setProperty('--ty',`${x*10}deg`); BM.tilt.style.setProperty('--tx',`${7-y*8}deg`);});
BM.stage.addEventListener('mouseleave',()=>{BM.tilt.style.removeProperty('--ty'); BM.tilt.style.removeProperty('--tx');});
let bmX=null; BM.stage.addEventListener('pointerdown',e=>bmX=e.clientX);
BM.stage.addEventListener('pointerup',e=>{ if(bmX===null) return; const dx=e.clientX-bmX; bmX=null; if(Math.abs(dx)>50&&!e.target.closest('button,input,a')) (dx<0?BM.next:BM.prev).click(); });
addEventListener('resize',()=>{ if(BM.el.classList.contains('open')){sizeBM(); setSpread(BM.s,{instant:true});} });


// AI search bar
const aiS=document.getElementById('aiSearch'), drop=document.getElementById('aiDrop');
const phrases=["a picture book about being brave","a cozy mystery for a rainy weekend","something like a thriller but hopeful","poetry for when I miss someone"];
// placeholder rotates through example asks (starts on the Figma copy); pauses while the user types
let phIdx=0; setInterval(()=>{ if(document.activeElement!==aiS&&!aiS.value){phIdx=(phIdx+1)%phrases.length; aiS.placeholder='Try: '+phrases[phIdx];} },3800);
aiS.addEventListener('input',()=>document.getElementById('fhField').classList.toggle('has-text',!!aiS.value));
document.getElementById('aiSearchForm').onsubmit=e=>{e.preventDefault();runAiSearch(aiS.value.trim()||phrases[phIdx]);};
addEventListener('keydown',e=>{
  if(e.key==='/'&&document.activeElement.tagName!=='INPUT'){e.preventDefault();scrollTo({top:0,behavior:'smooth'});aiS.focus();}
  if(e.key==='Escape')drop.classList.remove('open');
});
document.addEventListener('click',e=>{if(!e.target.closest('#aisearch'))drop.classList.remove('open');});
// hero "Ask AI" opens the Talk to Penguin conversation (client: conversational discovery over browsing)
function runAiSearch(q){ openAi(); ask(q); aiS.value=''; document.getElementById('fhField').classList.remove('has-text'); }

/* ---------------- Second fold: The Ones Everyone Loves ----------------
   Browse "Popular Now" on the left; the right panel spotlights the chosen book: a 3D cover that
   spins to the new pick, Penguin's summary streamed in, and buttons to open the book or ask Penguin. */
// Popular Now = Penguin India's all-time bestsellers, in the order shown on penguin.co.in
const ONES=[BI('atomic-habits'),BI('ikigai'),BI('heart-lamp'),7,8,BI('can-we-be-strangers-again'),BI('mother-mary-comes-to-me'),BI('the-art-of-letting-go'),BI('thank-you-for-leaving'),BI('the-housemaid'),BI('the-courage-to-be-disliked'),BI('12-rules-for-life')];
const onesRow=document.getElementById('onesRow'), sb=document.getElementById('sb'), sbImg=document.getElementById('sbImg'), spotInfo=document.getElementById('spotInfo');
const SB_COLORS=ONES.map(i=>HERO[i].col||({7:'#3b2a6b',8:'#2b2e8f'})[i]||'#2a1f18'); // spine/back colour per book
onesRow.innerHTML=ONES.map(i=>`<button class="oc" type="button" role="option" data-hero="${i}" aria-selected="false"><span class="pc"><img src="${HERO[i].img}" alt="" loading="lazy" /></span><span class="t"><b>${HERO[i].short||HERO[i].t}</b><span>${HERO[i].a}</span></span></button>`).join('');
let spotI=-1, spotTyper=null;
function spotContent(i){const b=HERO[i];
  return `<h3>${b.t}</h3><div class="by">${b.a}<span class="g">${b.g}</span></div>
    <p class="spot-sum" id="spotSum"></p>
    <div class="spot-tags">${b.md.map(m=>`<span>${m}</span>`).join('')}</div>
    <div class="spot-cta"><button class="open" type="button" data-open>Open the book ↗</button><button class="ask" type="button" data-ask>✦ Ask Penguin about it</button></div>`;}
function streamSum(i){const el=document.getElementById('spotSum'), words=HERO[i].sum.split(' '); let n=0; clearInterval(spotTyper);
  if(prefersReduced){el.textContent=HERO[i].sum; return;}
  el.innerHTML='<span class="cur"></span>';
  spotTyper=setInterval(()=>{n+=2; el.innerHTML=words.slice(0,n).join(' ')+'<span class="cur"></span>'; if(n>=words.length){clearInterval(spotTyper); el.textContent=HERO[i].sum;}},45);}
function setBook(i){ sbImg.src=HERO[i].img; document.getElementById('sbSpine').textContent=HERO[i].short||HERO[i].t;
  sb.style.setProperty('--sbc',SB_COLORS[ONES.indexOf(i)]||'#2a1f18'); }
function dropIn(i){ // the current book tips back onto the table, then the new one drops in from above with a small bounce
  if(swapCur){swapCur.cancel(); swapCur=null;}
  const R='rotateX(6deg) rotateY(-26deg)';
  const out=sb.animate([{opacity:1,transform:R},{opacity:0,transform:'translateY(60px) rotateX(72deg) rotateY(-26deg) scale(.82)'}],{duration:360,easing:'cubic-bezier(.55,0,.8,.3)',fill:'forwards'}); swapCur=out;
  out.finished.then(()=>{ setBook(i);
    const inn=sb.animate([{opacity:0,transform:'translateY(-180px) rotateX(-70deg) rotateY(-26deg) scale(.9)'},{opacity:1,transform:'translateY(12px) rotateX(12deg) rotateY(-26deg)',offset:.7},{opacity:1,transform:R}],{duration:760,easing:'cubic-bezier(.2,.8,.2,1)'});
    out.cancel(); swapCur=inn; inn.finished.then(()=>{if(swapCur===inn) swapCur=null;},()=>{}); },()=>{});
}
let swapCur=null;
function spotlight(i,{instant}={}){
  if(i===spotI) return; const first=spotI<0; spotI=i;
  onesRow.querySelectorAll('.oc').forEach(c=>{const on=+c.dataset.hero===i; c.classList.toggle('on',on); c.setAttribute('aria-selected',on);});
  sb.setAttribute('aria-label',`Open ${HERO[i].t}`);
  if(first||instant||prefersReduced){setBook(i); spotInfo.innerHTML=spotContent(i); streamSum(i); return;}
  dropIn(i);
  spotInfo.classList.add('swap');
  setTimeout(()=>{spotInfo.innerHTML=spotContent(i); spotInfo.classList.remove('swap'); streamSum(i);},420);
}
onesRow.addEventListener('click',e=>{const c=e.target.closest('.oc'); if(!c) return; const i=+c.dataset.hero; if(i===spotI) return;
  if(innerWidth>980) return spotlight(i);
  // stacked layout (tablet/phone): bring the spotlight into view, then drop the book in
  document.querySelector('.ones-right').scrollIntoView({behavior:prefersReduced?'auto':'smooth',block:'start'});
  setTimeout(()=>spotlight(i),prefersReduced?0:480);});
spotInfo.addEventListener('click',e=>{
  if(e.target.closest('[data-open]')) openBook(spotI,document.getElementById('sbFront'));
  if(e.target.closest('[data-ask]')){openAi(); ask(`Tell me about "${HERO[spotI].t}"`);}});
sb.addEventListener('click',()=>openBook(spotI,document.getElementById('sbFront')));
sb.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); openBook(spotI,document.getElementById('sbFront'));}});
// the spotlight book leans toward the cursor
const onesRight=document.querySelector('.ones-right');
onesRight.addEventListener('mousemove',e=>{const r=onesRight.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
  sb.style.setProperty('--ty',`${-26+x*30}deg`); sb.style.setProperty('--tx',`${6-y*14}deg`);});
onesRight.addEventListener('mouseleave',()=>{sb.style.removeProperty('--ty'); sb.style.removeProperty('--tx');});
// carousel arrows
const onesStep=()=>onesRow.querySelector('.oc').offsetWidth*2+100;
document.getElementById('onesPrev').onclick=()=>onesRow.scrollBy({left:-onesStep()});
document.getElementById('onesNext').onclick=()=>onesRow.scrollBy({left:onesStep()});
function onesEdges(){const max=onesRow.scrollWidth-onesRow.clientWidth-2;
  document.getElementById('onesPrev').disabled=onesRow.scrollLeft<=2; document.getElementById('onesNext').disabled=onesRow.scrollLeft>=max;
  onesRow.classList.toggle('end',onesRow.scrollLeft>=max);}
onesRow.addEventListener('scroll',onesEdges,{passive:true}); addEventListener('resize',onesEdges); onesEdges();
spotlight(ONES[0]);

/* section heading reveal */
new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.disconnect();}}),{threshold:.3}).observe(document.getElementById('headline'));

/* ---------------- Marquee ---------------- */
document.getElementById('track').innerHTML=[...GENRES,...GENRES].map((g,k)=>`<span><a href="#books?g=${encodeURIComponent(g)}"${k>=GENRES.length?' tabindex="-1" aria-hidden="true"':''}>${g}</a></span>`).join('');

/* ---------------- Mood shelf with FLIP animation ---------------- */
const shelf=document.getElementById('shelf');
shelf.innerHTML=BOOKS.map((b,i)=>`<article class="bk reveal" data-m="${b.m.join(' ')}" data-i="${i}" data-hero="${b.hero}" tabindex="0" role="button" aria-label="Open ${b.t.replace(/"/g,'&quot;')} with Penguin's AI summary" style="transition-delay:${(i%4)*.08}s">
  <span class="tag">${b.m[0]}</span><div class="pages"></div>${cover(b)}
  <div class="meta"><b>${b.t}</b><span>${b.a}</span></div></article>`).join('');
const moodsEl=document.getElementById('moods');
moodsEl.innerHTML=MOODS.map(([k,l],i)=>`<button class="chip ${i?'':'on'}" data-k="${k}">${l}</button>`).join('');
moodsEl.addEventListener('click',e=>{
  const c=e.target.closest('.chip'); if(!c) return;
  moodsEl.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===c));
  const cards=[...shelf.children], first=new Map(cards.map(el=>[el,el.getBoundingClientRect()]));
  cards.forEach(el=>el.classList.toggle('hidden',c.dataset.k!=='all'&&!el.dataset.m.includes(c.dataset.k)));
  shelfOpen=false; limitShelf();
  cards.forEach(el=>{
    if(el.classList.contains('hidden')) return;
    const f=first.get(el), l=el.getBoundingClientRect();
    const wasHidden=f.width===0;
    el.animate(wasHidden?[{opacity:0,transform:'scale(.85)'},{opacity:1,transform:'none'}]
      :[{transform:`translate(${f.left-l.left}px,${f.top-l.top}px)`},{transform:'none'}],
      {duration:prefersReduced?0:650,easing:'cubic-bezier(.22,1,.36,1)'});
  });
});
/* Show two rows; the last book of row two carries a "View more" overlay that reveals the rest. */
let shelfOpen=false;
function limitShelf(){ const cards=[...shelf.children]; cards.forEach(el=>{ el.classList.remove('clip','more'); el.querySelector('.bk-more')?.remove(); });
  if(shelfOpen) return; const cols=getComputedStyle(shelf).gridTemplateColumns.split(' ').length, max=cols, shown=cards.filter(el=>!el.classList.contains('hidden'));
  if(shown.length<=max) return; shown.slice(max).forEach(el=>el.classList.add('clip')); const last=shown[max-1], n=shown.length-max+1;
  last.classList.add('more'); last.querySelector('.cover').insertAdjacentHTML('beforeend',`<button type="button" class="bk-more"><b>View more</b><span>All ${new Set(HERO.map(b=>b.t)).size} books</span></button>`); }
let limitT; addEventListener('resize',()=>{ clearTimeout(limitT); limitT=setTimeout(limitShelf,150); });
limitShelf();
shelf.addEventListener('click',e=>{
  if(e.target.closest('.bk-more')){ location.hash='books'; return; } // View more → the All books page
  const bk=e.target.closest('.bk'); if(!bk) return;
  const b=BOOKS[bk.dataset.i]; openBook(b.hero,bk.querySelector('.cover'));
});
shelf.addEventListener('keydown',e=>{ const bk=e.target.closest('.bk'); if(bk&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); openBook(BOOKS[bk.dataset.i].hero,bk.querySelector('.cover')); } });

/* ---------------- Scroll effects ---------------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);} }),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// word-by-word lighting in the mission quote
const q=document.getElementById('quote');
q.innerHTML=q.innerHTML.replace(/(<[^>]+>)|([^\s<]+)/g,(m,tag,w)=>tag?tag:`<span class="w">${w}</span>`);
const qw=[...q.querySelectorAll('.w')];

// counters
const cio=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting) return; cio.unobserve(e.target);
  const el=e.target,n=+el.dataset.count,s=el.dataset.suffix||'',t0=performance.now();
  const step=t=>{const p=Math.min(1,(t-t0)/1600),v=Math.round(n*(1-Math.pow(1-p,3)));el.textContent=v.toLocaleString()+s;if(p<1)requestAnimationFrame(step)};
  requestAnimationFrame(step);
}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

const prog=document.getElementById('progress');
addEventListener('scroll',()=>{
  const y=scrollY;
  prog.style.width=(y/(document.body.scrollHeight-innerHeight)*100)+'%';
  const r=q.getBoundingClientRect(), p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(Math.max(r.height,340)+innerHeight*.35))); /* same scroll distance as the larger quote had, so the words light at the same pace */
  qw.forEach((w,i)=>w.classList.toggle('lit',i/qw.length<p));
},{passive:true});

/* ---------------- Cursor + magnetic buttons ---------------- */
const cur=document.getElementById('cursor');
addEventListener('mousemove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';cur.style.opacity=1});
document.addEventListener('mouseover',e=>cur.classList.toggle('big',!!e.target.closest('a,button,.bk')));
document.querySelectorAll('.magnetic').forEach(b=>{
  b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.3}px,${(e.clientY-r.top-r.height/2)*.4}px)`});
  b.addEventListener('mouseleave',()=>b.style.transform='');
});

/* ---------------- Theme ---------------- */
// Two themes: Orange (data-theme="light") and Black (data-theme="dark").
// Switching reveals the new theme in a circle growing from the click point.
const root=document.documentElement, themeBtn=document.getElementById('themeBtn');
function applyTheme(t){ root.dataset.theme=t;
  const label=t==='dark'?'Switch to Orange theme':'Switch to Black theme';
  themeBtn.setAttribute('aria-pressed',t==='dark'); themeBtn.setAttribute('aria-label',label); themeBtn.title=label;
  try{localStorage.setItem('pg-theme',t)}catch(e){} }
try{ const saved=localStorage.getItem('pg-theme'); if(saved) applyTheme(saved); }catch(e){}
themeBtn.addEventListener('click',e=>{
  const next=root.dataset.theme==='dark'?'light':'dark';
  if(!document.startViewTransition||prefersReduced) return applyTheme(next);
  const b=themeBtn.getBoundingClientRect(), x=e.clientX||b.left+b.width/2, y=e.clientY||b.top+b.height/2, r=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
  document.startViewTransition(()=>applyTheme(next)).ready.then(()=>
    root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${r}px at ${x}px ${y}px)`]},
      {duration:800,easing:'cubic-bezier(.22,1,.36,1)',pseudoElement:'::view-transition-new(root)'}));
});

/* ---------------- Newsletter ---------------- */
document.getElementById('newsForm').onsubmit=e=>{e.preventDefault();document.getElementById('newsOk').textContent='🎉 You\'re in! (demo — nothing was sent)';e.target.reset();};

/* ---------------- AI assistant "Penguin" ----------------
   Demo engine: scores the on-page catalog against the user's words.
   To go live, replace `think()` with a fetch to your own backend endpoint
   (e.g. POST /api/pip -> LLM with the catalog as tool/context). */
const panel=document.getElementById('panel'), fab=document.getElementById('fab'), body=document.getElementById('aiBody');
let greeted=false;
function openAi(){ panel.classList.add('open'); fab.classList.add('open'); document.body.classList.add('chat-lock'); renderSide();
  if(!greeted){ greeted=true;
    if(profile.asks>0){ const tm=topMoods(2).map(m=>MWL[m]); const last=profile.chose[profile.chose.length-1];
      bot(`Welcome back! Last time you were into ${tm.join(' and ')||'a bit of everything'}${last?`, and you picked ${last}`:''}. Shall we pick up where we left off, or try something new?`);
      const c=['More like last time','Something new',...(profile.shortlist.length>=2?['Help me choose']:[])]; setTimeout(()=>add(c.map(x=>`<button type="button">${x}</button>`).join(''),'follow'),prefersReduced?0:1400); }
    else bot("Hi, I'm Penguin, your bookseller. Ask me the way you would in a bookshop: a mood, a book you loved, or who you're buying for. I'll find your five best matches from Penguin's catalogue and help you decide. You can also tap the mic and just say it."); }
  setTimeout(()=>document.getElementById('aiQ').focus(),400); }
document.querySelectorAll('[data-open-ai]').forEach(b=>b.addEventListener('click',openAi));
document.getElementById('closeAi').onclick=()=>{panel.classList.remove('open','side-open');fab.classList.remove('open');document.body.classList.remove('chat-lock');stopSpeech();};
addEventListener('keydown',e=>{if(e.key==='Escape'&&!BM.el.classList.contains('open'))document.getElementById('closeAi').click()});

const SUGG=["Trending Now","Editor’s Pick","Award Winner","New Release","Reader Favorite","Bestseller","Hidden Gem"];
document.getElementById('suggest').innerHTML=SUGG.map(s=>`<button>${s}</button>`).join('');
document.getElementById('suggest').onclick=e=>{ if(e.target.tagName==='BUTTON') ask(e.target.textContent); };
body.addEventListener('click',e=>{
  const f=e.target.closest('.follow button'); if(f) return ask(f.textContent);
  const sy=e.target.closest('.say'); if(sy) return speak(sy.closest('.msg').dataset.say,sy);
  const act=e.target.closest('[data-act]'); if(!act) return; const host=act.closest('[data-cat]'), b=CATALOG[+host.dataset.cat];
  if(act.dataset.act==='open') openBook(b.hero,host);
  else if(act.dataset.act==='sl') toggleShort(b);
  else ask(`Tell me about ${b.t}`); });
document.getElementById('aiForm').onsubmit=e=>{e.preventDefault();const i=document.getElementById('aiQ');if(i.value.trim()){ask(i.value.trim());i.value='';}};

function add(html,cls){const d=document.createElement('div');d.className=cls;d.innerHTML=html;body.appendChild(d);body.scrollTop=body.scrollHeight;return d;}
function bot(text,opts={}){ // streamed word-by-word, then a 🔊 button to hear it
  const d=add('','msg bot'); d.dataset.say=text; const words=text.split(' '); let i=0;
  const done=()=>{ d.textContent=text; const b=document.createElement('button'); b.type='button'; b.className='say'; b.setAttribute('aria-label','Read aloud'); b.textContent='🔊'; d.appendChild(b);
    if(opts.speak||autoRead) speak(text,b); };
  if(prefersReduced){ done(); return 0; }
  const t=setInterval(()=>{d.textContent=words.slice(0,++i).join(' ');body.scrollTop=body.scrollHeight;if(i>=words.length){clearInterval(t); done();}},35);
  return words.length*35;
}
const bcard=(b,k)=>`<div class="bcard" data-cat="${b.id}" style="animation-delay:${k*.08}s"><img src="${b.img}" alt="" loading="lazy" />
  <div class="bc-t"><b>${esc(b.t)}</b><span>${esc(b.a)} · ${esc(b.g)}</span><p>${esc(b.line)}</p>${(d=>`<div class="bc-det"><b>₹${d.mrp.toFixed(2)}</b><span>Paperback · ${d.pages} pages</span><span>${esc(d.imprint)} · ${d.pub}</span><span>ISBN ${d.isbn}</span></div>`)(detailsFor(b.hero!=null?HERO[b.hero]:b))}
  <div class="bc-act">${b.hero!=null?'<button type="button" data-act="open">Open book ↗</button>':'<button type="button" data-act="more">Tell me more</button>'}<button type="button" class="sl${profile.shortlist.includes(b.t)?' on':''}" data-act="sl">${profile.shortlist.includes(b.t)?'♥ On my shelf':'♡ Add to my shelf'}</button><a href="${b.buy}" target="_blank" rel="noopener">Buy</a><a class="pfm" href="${b.pocketfm}" target="_blank" rel="noopener" title="Listen on Pocket FM (opens in a new tab)">🎧 Audiobook · Pocket FM <span aria-hidden="true">↗</span></a></div></div></div>`;
const decideHTML=b=>{ const share=`https://wa.me/?text=${encodeURIComponent(`My next read: ${b.t} by ${b.a}. Found it with Penguin. ${b.buy}`)}`;
  return `<div data-cat="${b.id}" style="display:contents"><img src="${b.img}" alt="" /><div><small>✦ Your pick</small><b>${esc(b.t)}</b><div class="by">${esc(b.a)} · ${esc(b.g)}</div>
  <div class="dc-act"><a class="primary" href="${b.buy}" target="_blank" rel="noopener">Buy now · see retailers ↗</a><a href="${b.audible}" target="_blank" rel="noopener">🎧 Audio sample on Audible</a>${b.hero!=null?'<button type="button" data-act="open">📖 Open the book</button>':''}<a href="${share}" target="_blank" rel="noopener">Send to WhatsApp</a></div>
  <p class="dc-note">Penguin India sells through retailers, so Buy takes you to the book's page with every buying option.</p></div></div>`; };
function ask(q){
  document.getElementById('suggest').classList.add('gone');
  add(esc(q),'msg me');
  const typing=add('<i></i><i></i><i></i>','msg bot typing');
  setTimeout(()=>{ typing.remove(); const r=converse(q); const dur=bot(r.text,{speak:r.speak});
    setTimeout(()=>{ if(r.books?.length) add(r.books.map(bcard).join(''),'bcards'); if(r.decide) add(decideHTML(r.decide),'decide'); if(r.chips?.length) add(r.chips.map(c=>`<button type="button">${esc(c)}</button>`).join(''),'follow'); },prefersReduced?0:dur+120);
  },600+Math.random()*400);
}
const SYN={cozy:["cozy","cosy","rain","warm","comfort","relax","calm","gentle","weekend"],thrilling:["thrill","gripping","suspense","crime","mystery","murder","page-turner","fast"],emotional:["cry","sad","emotional","love","miss","grief","heart","romance"],adventurous:["adventure","journey","quest","travel","epic","sea"],"mind-bending":["mind","sci","space","ai","future","weird","smart","idea","science"],inspiring:["inspir","hope","uplift","motivat","food","true","real"],dark:["dark","war","noir","scary","creepy"],kids:["kid","child","year-old","son","daughter","picture","young","teen","ya","gift"]};
/* ---------------- Talk to Penguin: conversational discovery ----------------
   Demo engine over every book on this page (hero, bestsellers, mood shelf). It keeps context across turns
   ("more like these", "something shorter", "a gift for my dad"), the way a bookseller would.
   To go live: send the conversation + catalogue to an LLM endpoint and render the same reply shape {text, books, chips}. */
function esc(t){ return String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function linkFor(b){ return {pocketfm:`https://pocketfm.com/search?q=${encodeURIComponent(b.t)}`,audible:`https://www.audible.in/search?keywords=${encodeURIComponent(b.t+' '+b.a)}`,buy:`https://www.penguin.co.in/?s=${encodeURIComponent(b.t)}`}; } // hoisted: used by the spotlight on load
const MOOD_OF={cozy:['cozy','calm','calming','reassuring','tender','light','gentle','playful','warm'],thrilling:['thrilling','tense','addictive','gritty','intense','clever'],
  emotional:['emotional','moving','bittersweet','intimate','tender','romantic','powerful','haunting'],adventurous:['adventurous','epic','curious'],
  'mind-bending':['mind-bending','thought-provoking','challenging','reflective','wise','sharp'],inspiring:['inspiring','uplifting','motivating','practical','hopeful','clear','direct','accessible','modern'],
  dark:['dark','gritty','intense','haunting'],kids:[]};
const CATALOG=[];
HERO.forEach((b,i)=>{ const m=new Set(); (b.md||[]).forEach(w=>{for(const k in MOOD_OF) if(MOOD_OF[k].includes(w)) m.add(k);});
  if(/middle-grade|children/i.test(b.g)) m.add('kids'); if(/self-help|wellbeing|career|finance|philosophy/i.test(b.g)) m.add('inspiring');
  if(/romance|poetry|memoir|short stories/i.test(b.g)) m.add('emotional'); if(/thriller|crime|mystery/i.test(b.g)) m.add('thrilling');
  CATALOG.push({id:CATALOG.length,hero:i,t:b.t,short:b.short,a:b.a,g:b.g,img:b.img,line:b.line,blurb:b.sum,m:[...m],...linkFor(b)}); });
BOOKS.forEach(b=>{ if(CATALOG.some(c=>c.t===b.t)) return;
  CATALOG.push({id:CATALOG.length,hero:null,t:b.t,a:b.a,g:b.g,img:b.img,line:b.d.split(/(?<=[.!?])\s/)[0],blurb:b.d,m:b.m,...linkFor(b)}); });
SYN.inspiring.push('learn','habit','money','career','improve','productiv','self-help','motivat','grow');
SYN.kids=SYN.kids.filter(w=>w!=='gift');
const STOP=new Set(['something','book','books','read','reading','want','would','like','that','with','about','what','have','some','looking','recommend','please','good','great','really','could','give','them','this','these','from','more','your','just','also','into','need','find','show','tell','something','there','their','which','where','when','will']);
const ctx={last:[],moods:[],focus:null,seen:new Set(),gift:false};
const nm=b=>b.short||b.t;
const FOLLOW=b=>['More like these','Something shorter','Something different',...(profile.shortlist.length>=2?['Help me choose']:b?[`Tell me about ${nm(b)}`]:[])];
function fresh(list,n=5){ const a=list.filter(b=>!ctx.seen.has(b.id)); return (a.length>=n?a:[...a,...list.filter(b=>ctx.seen.has(b.id))]).slice(0,n); }
function moodsIn(s){ const out=[]; for(const k in SYN) if(s.includes(k)||SYN[k].some(w=>s.includes(w))) out.push(k); return out; }
function rank(s,moods){ const words=s.split(/[^a-z0-9'-]+/).filter(w=>w.length>3&&!STOP.has(w));
  return CATALOG.map(b=>{ let n=0; moods.forEach(m=>{if(b.m.includes(m)) n+=3;});
    if(b.m.includes('kids')&&!moods.includes('kids')&&!/kid|child|son|daughter|young|picture/.test(s)) n-=4; // children's books only when asked
    const hay=(b.t+' '+b.g+' '+b.line+' '+b.blurb+' '+b.a).toLowerCase(), g=b.g.toLowerCase();
    words.forEach(w=>{ if(hay.includes(w)) n+=1; if(g.includes(w)) n+=2; });
    if(n>0) b.m.forEach(m=>{ if(profile.moods[m]) n+=Math.min(2,profile.moods[m])*.5; }); // the more you chat, the more it fits you
    return [b,n]; })
    .filter(x=>x[1]>0).sort((x,y)=>y[1]-x[1]).map(x=>x[0]); }
function converse(q){
  const s=q.toLowerCase().trim();
  let named=CATALOG.find(b=>s.includes(b.t.toLowerCase())||(b.short&&s.includes(b.short.toLowerCase())));
  // "is it good for a book club?" → "it" is the book we were just talking about
  if(!named&&ctx.focus&&/club|group|discuss|dark|sad|scary|violent|heavy|tell me more|about it|\bis it\b/.test(s)) named=ctx.focus;
  learn(s,named);
  const took=/\b(i'?ll take|i will take|i'?ll go with|go with|this is the one|i choose)\b/.test(s);
  if(took){ const b=named||ctx.focus||ctx.last[0];
    if(b){ pushU(profile.chose,b.t); saveProfile(); ctx.focus=b;
      return {text:`Great choice. ${b.t} it is. Here's everything you need to get it:`,books:[],chips:['Talk about it while I read','Find my next read after this'],decide:b}; } }
  if(/show my (shortlist|shelf)|my (shortlist|shelf)/.test(s)){ const list=profile.shortlist.map(byTitle).filter(Boolean);
    if(!list.length) return {text:"Your shelf is empty. Tap ♡ Add to my shelf on any book I suggest and it'll wait for you here.",books:[],chips:['Something gripping','Something to learn from','Surprise me']};
    ctx.last=list; ctx.focus=list[0]; return {text:`Here's your shelf (${list.length}):`,books:list,chips:list.length>=2?['Help me choose','Keep browsing']:['Find similar books','Keep browsing']}; }
  if(/show my picks|my picks|reading history|what have i picked/.test(s)){ const list=profile.chose.map(byTitle).filter(Boolean);
    if(!list.length) return {text:"You haven't picked a book yet. Tell me what you're in the mood for and we'll find your next read.",books:[],chips:SUGG};
    ctx.last=list; ctx.focus=list[list.length-1]; return {text:`Books you've picked with me (${list.length}):`,books:list.slice().reverse(),chips:['Find my next read after this','Talk about it while I read']}; }
  if(/help me (choose|decide|pick)|which (one|should i)|compare (them|my)|can'?t decide/.test(s)){
    const list=profile.shortlist.map(byTitle).filter(Boolean);
    if(list.length<2) return {text:"Add two or three books to your shelf (tap ♡ Add to my shelf on any book I suggest) and I'll help you decide between them.",books:[],chips:['Something gripping','Something to learn from','Surprise me']};
    const tm=topMoods(), fit=b=>b.m.filter(m=>tm.includes(m)).length, best=[...list].sort((x,y)=>fit(y)-fit(x))[0];
    const why=best.m.filter(m=>tm.includes(m)).map(m=>MWL[m]).join(' and ')||best.g.toLowerCase();
    ctx.last=list; ctx.focus=best;
    return {text:`Here's how the books on your shelf compare:\n${list.map(b=>`• ${nm(b)}: ${b.line}`).join('\n')}\n\nMy pick for you is ${nm(best)}, because it fits what you've told me you're into: ${why}.`,books:[],chips:[`I'll take ${nm(best)}`,...list.filter(b=>b!==best).map(b=>`I'll take ${nm(b)}`)]}; }
  if(/question to think|discussion question/.test(s)&&ctx.focus){ const b=ctx.focus, hb=b.hero!=null?HERO[b.hero]:null, th=hb?hb.th[Math.floor(Math.random()*hb.th.length)][0].toLowerCase():b.g.toLowerCase();
    return {text:`Here's one for ${nm(b)}: what does the book seem to say about ${th}? As you read, notice who changes their mind, and why. Come back and tell me what you think.`,books:[],chips:['Another question','I finished it. What next?']}; }
  if(/another question/.test(s)&&ctx.focus) return {text:`Try this: if you could ask one character in ${nm(ctx.focus)} a single question, who would it be and what would you ask?`,books:[],chips:['I finished it. What next?','Find my next read after this']};
  if(/while i read|i'?m reading|talk about it|discuss it/.test(s)&&(named||ctx.focus)){ const b=named||ctx.focus; ctx.focus=b; const hb=b.hero!=null?HERO[b.hero]:null;
    const themes=hb?hb.th.map(x=>x[0].toLowerCase()).slice(0,3).join(', '):b.g.toLowerCase();
    return {text:`Lovely. I'll stay spoiler-free unless you ask. ${b.t} is a great one to talk about: watch for ${themes}. Come back any time and tell me how far you've got.`,books:[],chips:['Give me a question to think about','I finished it. What next?']}; }
  if(/finished it|next read after|after this/.test(s)&&ctx.focus){ const ref=ctx.focus; ctx.moods=ref.m; pushU(profile.loved,ref.t); saveProfile();
    const sim=fresh(CATALOG.filter(b=>b!==ref&&b.m.some(m=>ref.m.includes(m))&&(ref.m.includes('kids')||!b.m.includes('kids'))));
    return say(`Since you've read ${nm(ref)}, here's what I'd hand you next:`,sim,FOLLOW(sim[0])); }
  if(/like last time/.test(s)){ const ms=topMoods(); ctx.moods=ms; const list=fresh(rank(ms.join(' '),ms).filter(b=>b.m.some(m=>ms.includes(m))));
    if(list.length) return say(`More of what you liked last time (${ms.map(m=>MWL[m]).join(', ')}):`,list,FOLLOW(list[0])); }
  if(/something new|surprise me with something new/.test(s)){ const ms=topMoods(); const list=fresh(CATALOG.filter(b=>!b.m.some(m=>ms.includes(m))&&!b.m.includes('kids')).sort(()=>Math.random()-.5));
    ctx.moods=list[0]?list[0].m:[]; return say("Let's step off your usual shelf. Five you might not have picked yourself:",list,FOLLOW(list[0])); }
  function say(text,books=[],chips=[],extra={}){ if(books.length){ctx.last=books; ctx.focus=books[0];} books.forEach(b=>ctx.seen.add(b.id)); return {text,books,chips,...extra}; }
  // the suggestion chips (Trending Now, Editor's Pick, …) each open a curated shelf
  const shelf=SHELVES.find(x=>x.re.test(s.replace(/[.!?]+$/,'')));
  if(shelf){ const list=shelf.books.map(byTitle).filter(Boolean); ctx.moods=[...new Set(list.flatMap(b=>b.m))];
    return say(shelf.text,list,['More like these',...SUGG.filter(c=>!shelf.re.test(c.toLowerCase())).slice(0,3)]); }
  if(/read (it|me|the summary|this)|read aloud|say it/.test(s)&&!named){ const b=ctx.focus||ctx.last[0];
    if(b) return say(`Here's ${nm(b)}. ${b.blurb}`,[],['Find similar books','Listen on Audible'],{speak:true}); }
  if(/audio ?book|listen|audible/.test(s)){ const b=named||ctx.focus||ctx.last[0];
    if(b) return say(`Penguin India doesn't sell audiobooks directly, but you can hear ${nm(b)} on Audible. I can also read you my summary right now: tap 🔊 on any of my answers.`,[b],['Read me the summary','Find similar books']);
    return say("Tell me which book, and I'll point you to the audiobook and read you a quick summary.",[],['Atomic Habits','The Housemaid','Ikigai']); }
  if(/\b(buy|price|order|purchase)\b|where can i get/.test(s)){ const b=named||ctx.focus||ctx.last[0];
    if(b) return say(`Every buying option for ${nm(b)} is on its Penguin India page. Tap Buy below.`,[b],['Find similar books']); }
  if(named){
    if(/club|group|discuss/.test(s)) return say(`Yes, ${nm(named)} gives a group plenty to talk about. ${named.line}`,[named],['Find similar books','Read me the summary']);
    if(/dark|sad|scary|violent|heavy/.test(s)) return say(`Tone check for ${nm(named)}: ${named.m.join(', ')||named.g}. ${named.line}`,[named],['Something lighter','Find similar books']);
    if(/loved|liked|enjoyed|what next|similar|more like|like .* but/.test(s)){ ctx.moods=named.m;
      const sim=fresh(CATALOG.filter(b=>b!==named&&b.m.some(m=>named.m.includes(m))&&(named.m.includes('kids')||!b.m.includes('kids'))));
      return say(`If you loved ${nm(named)}, these share its ${named.m.slice(0,2).join(' and ')||'spirit'} feel:`,sim,FOLLOW(sim[0])); }
    ctx.moods=named.m; return say(`${named.t} by ${named.a}. ${named.blurb}`,[named],['Find similar books','Read me the summary','Is it good for a book club?']); }
  if(/^(hi|hello|hey|namaste)\b/.test(s)) return say("Hello! What are you in the mood for? Tell me a feeling, a book you loved, or who you're buying for.",[],SUGG);
  if(ctx.last.length){
    if(/more like (these|this|that)|similar|more of|find similar/.test(s)){ const ref=ctx.focus||ctx.last[0], ms=ctx.moods.length?ctx.moods:ref.m;
      const list=fresh(CATALOG.filter(b=>!ctx.last.includes(b)&&b.m.some(m=>ms.includes(m))&&(ms.includes('kids')||!b.m.includes('kids'))));
      if(list.length) return say('Here are more in the same vein:',list,FOLLOW(list[0])); }
    if(/something (else|different)|another|other option|not (these|that|for me)|different direction/.test(s)){
      const list=fresh(CATALOG.filter(b=>!ctx.last.includes(b)&&!b.m.some(m=>ctx.moods.includes(m)))); ctx.moods=list[0]?list[0].m:[];
      return say("Let's try a different direction:",list,FOLLOW(list[0])); }
    if(/short|quick|lighter|light read|commute|small/.test(s)){ const fit=b=>b.m.some(m=>ctx.moods.includes(m))?1:0;
      const list=fresh(CATALOG.filter(b=>/poetry|short stories|self-help|wellbeing|children|graphic|picture/i.test(b.g)).sort((x,y)=>fit(y)-fit(x)));
      return say('Shorter reads you can finish in a sitting or two:',list,FOLLOW(list[0])); }
  }
  const age=(s.match(/(\d{1,2})\s*-?\s*(year|yr)/)||[])[1];
  const who=(s.match(/\b(mom|mum|mother|dad|father|wife|husband|sister|brother|friend|boss|son|daughter|niece|nephew|grandma|grandpa|teen|kid|child)\b/)||[])[1];
  const giftish=/gift|present|birthday|buying for|for my/.test(s)||ctx.gift||(!!(who||age)&&s.split(/\s+/).length<=4); // "My mum", "a 7-year-old"
  if(giftish&&!who&&!age&&/gift|present|birthday|buying for/.test(s)){ ctx.gift=true;
    const gifts=fresh(['Ikigai','Atomic Habits','Heart Lamp','Mother Mary Comes to Me','The Housemaid'].map(byTitle).filter(Boolean));
    return say("Lovely. Here are five that make great gifts. Tell me who it's for and I'll narrow it down:",gifts,['My mum','My dad','A friend','A 7-year-old','A teenager']); }
  if(giftish&&(who||age)){ ctx.gift=false; let ms=['emotional','cozy','inspiring'];
    if((age&&+age<=10)||(!age&&/kid|child|son|daughter|niece|nephew/.test(who))) ms=['kids'];
    else if((age&&+age<=17)||who==='teen') ms=['thrilling','adventurous'];
    else if(/dad|father|boss|husband|grandpa|brother/.test(who||'')) ms=['inspiring','thrilling','mind-bending'];
    ctx.moods=ms; const list=fresh(rank(s,ms).filter(b=>b.m.some(m=>ms.includes(m))));
    return say(`For ${who?`your ${who}`:'them'}${age?` (age ${age})`:''}, here are ${list.length} that tend to land well:`,list,FOLLOW(list[0])); }
  if(/teen|teenager/.test(s)){ ctx.moods=['thrilling','adventurous']; const list=fresh(CATALOG.filter(b=>/young adult|ya\b/i.test(b.g)));
    if(list.length) return say('For a teenager, these are page-turners teens actually finish:',list,FOLLOW(list[0])); }
  if(/surprise|random|anything|you choose|you pick/.test(s)){ ctx.moods=[]; const list=fresh([...CATALOG].sort(()=>Math.random()-.5));
    return say(`Taking a leap. ${list.length} wildcards from across the shelves:`,list,FOLLOW(list[0])); }
  if(/funny|humou?r|laugh|comedy|comic|satire|witty/.test(s)){ const list=fresh(CATALOG.filter(b=>/humour|satire|comedy/i.test(b.g+' '+b.line)));
    if(list.length){ ctx.moods=list[0].m; return say('Something to make you laugh:',list,FOLLOW(list[0])); } }
  const ms=moodsIn(s), ranked=rank(s,ms);
  if(ranked.length){ ctx.moods=ms.length?ms:ranked[0].m; const list=fresh(ms.includes('kids')?ranked.filter(b=>b.m.includes('kids')):ranked);
    const MW={cozy:'cozy',thrilling:'gripping',emotional:'moving','mind-bending':'thought-provoking',inspiring:'to learn from',dark:'dark',adventurous:'adventurous',kids:'for young readers'};
    return say(ms[0]?`Something ${MW[ms[0]]}, then. Here's what I'd pull off the shelf for you:`:"Here's what I'd pull off the shelf for that:",list,FOLLOW(list[0])); }
  const pop=fresh(['Atomic Habits','The Housemaid','Ikigai','The Let Them Theory','Heart Lamp','The Hidden Hindu'].map(byTitle).filter(Boolean));
  return say("Here are five readers love right now. Tell me a bit more (a mood, a book you loved, or who it's for) and I'll narrow it down:",pop,['Something to relax with','Something gripping','Something to learn from','A gift']);
}
/* ---------------- Reader profile + shortlist (client: "the profile automatically gets created" from conversations) ----------------
   Kept in this browser only (localStorage) for the prototype; in production this is the reader's record in the CDP. */
const PROFILE_KEY='penguin-reader-v1';
let profile={moods:{},loved:[],forWhom:[],prefs:[],shortlist:[],chose:[],asks:0,shelfPos:{}};
try{ const p=JSON.parse(localStorage.getItem(PROFILE_KEY)||'null'); if(p) profile={...profile,...p}; }catch(e){}
const MWL={cozy:'cozy',thrilling:'gripping',emotional:'moving','mind-bending':'thought-provoking',inspiring:'learning & growth',dark:'dark',adventurous:'adventure',kids:'young readers'};
const topMoods=(n=3)=>Object.entries(profile.moods).sort((a,b)=>b[1]-a[1]).slice(0,n).map(x=>x[0]);
const byTitle=t=>CATALOG.find(b=>b.t===t);
const SHELVES=[
  {re:/^trending( now)?$/,text:"Trending now: the books everyone's picking up this month.",books:['Mumbai Confidential','The Housemaid','The Let Them Theory','The Anxious Generation','Can We Be Strangers Again?']},
  {re:/^editor['’]?s'? picks?$/,text:"Editor's pick: the books our editors keep pressing into people's hands.",books:['The Correspondent','Heart Lamp','The Hidden Hindu','Mother Mary Comes to Me','Ikigai']},
  {re:/^award[- ]?winn(er|ers|ing)( books?)?$/,text:"Award winners, including three International Booker Prize winners:",books:['Heart Lamp','The Vegetarian','At Night All Blood Is Black','Nirmala & Normala']},
  {re:/^new releases?$/,text:"New releases, fresh on the shelves:",books:['The Hidden Hindu','Mother Mary Comes to Me','The Let Them Theory','Thank You for Leaving','Can We Be Strangers Again?']},
  {re:/^readers?['’]?s? favou?rites?$/,text:"Reader favourites: the books readers rate highest and recommend most.",books:['What We Did to Survive','Atomic Habits','Ikigai','One of Us Is Lying','The Inheritance Games']},
  {re:/^best ?sellers?$/,text:"Bestsellers: the Penguin books flying off shelves across India.",books:['Atomic Habits','The Housemaid','Ikigai','Rich Dad Poor Dad','The Courage to Be Disliked']},
  {re:/^hidden gems?$/,text:"Hidden gems: wonderful books that deserve far more readers.",books:['Wild Next Door','The Naga Warriors 2','God Save the Dork','The Accidental Protector',"It's Okay . . ."]}];
const pushU=(arr,v)=>{ if(v&&!arr.includes(v)) arr.push(v); };
function saveProfile(){ try{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));}catch(e){} renderSide(); renderPm(); renderShelf(); }
function renderPm(){ if(typeof pm==='undefined') return; const tm=topMoods(2).map(m=>MWL[m]);
  document.getElementById('pmTaste').textContent=tm.length?`Into ${tm.join(' and ')}${profile.forWhom.length?` · buying for ${profile.forWhom[profile.forWhom.length-1]}`:''}`:'Your taste builds as you chat with Penguin.';
  document.getElementById('pmProf').textContent=profile.asks?`${profile.asks} chat${profile.asks>1?'s':''} so far`:'Built from your chats';
  document.getElementById('pmShort').textContent=profile.shortlist.length; document.getElementById('pmPicks').textContent=profile.chose.length;
  pm.querySelector('[data-pm="read"]').setAttribute('aria-checked',autoRead); }
function learn(s,named){
  profile.asks++;
  moodsIn(s).forEach(m=>{profile.moods[m]=(profile.moods[m]||0)+1;});
  if(named&&/loved|liked|enjoyed|favourite|favorite/.test(s)){ pushU(profile.loved,named.t); named.m.forEach(m=>{profile.moods[m]=(profile.moods[m]||0)+1;}); }
  const who=(s.match(/\b(mom|mum|mother|dad|father|wife|husband|sister|brother|friend|boss|son|daughter|niece|nephew|grandma|grandpa|teenager|teen)\b/)||[])[1]; if(who) pushU(profile.forWhom,who==='mom'?'mum':who);
  const age=(s.match(/(\d{1,2})\s*-?\s*(year|yr)/)||[])[1]; if(age) pushU(profile.forWhom,`a ${age}-year-old`);
  if(/short|quick|commute|lighter/.test(s)) pushU(profile.prefs,'Shorter reads');
  if(/audio|listen|audible/.test(s)) pushU(profile.prefs,'Likes audio');
  if(/gift|present|birthday/.test(s)) pushU(profile.prefs,'Buys books as gifts');
  saveProfile();
}
function renderSide(){
  const chips=[]; const tm=topMoods();
  if(tm.length) chips.push(`<span><b>Into</b>${tm.map(m=>MWL[m]).join(', ')}</span>`);
  profile.loved.forEach(t=>chips.push(`<span><b>Loved</b>${esc(t)}</span>`));
  profile.forWhom.forEach(w=>chips.push(`<span><b>Buying for</b>${esc(w)}</span>`));
  profile.prefs.forEach(p=>chips.push(`<span>${esc(p)}</span>`));
  profile.chose.forEach(t=>chips.push(`<span><b>Picked</b>${esc(t)}</span>`));
  document.getElementById('profChips').innerHTML=chips.length?chips.join(''):'<p class="pempty">Start chatting. Penguin learns your taste here as you go, no sign-up needed.</p>';
  const sl=profile.shortlist.map(byTitle).filter(Boolean);
  document.getElementById('slCount').textContent=sl.length?`${sl.length}`:'';
  document.getElementById('slList').innerHTML=sl.length?sl.map(b=>`<div class="sl-item" data-cat="${b.id}"><img src="${b.img}" alt="" /><button type="button" class="t" data-sl="ask">${esc(nm(b))}<span>${esc(b.a)}</span></button><button type="button" class="rm" data-sl="rm" aria-label="Remove ${esc(b.t)} from My Shelf">✕</button></div>`).join('')
    :'<p class="pempty">Tap ♡ on any book Penguin suggests to keep it here.</p>';
  document.getElementById('slChoose').disabled=sl.length<2;
  document.getElementById('sideBtn').textContent=innerWidth<480?`♥ ${sl.length}`:`♥ ${sl.length} · Profile`;
  document.querySelectorAll('#aiBody .bcard').forEach(c=>{ const b=CATALOG[+c.dataset.cat], on=profile.shortlist.includes(b.t), x=c.querySelector('.sl'); if(x){x.classList.toggle('on',on); x.textContent=on?'♥ On my shelf':'♡ Add to my shelf';} });
}
let nudged=false;
function toggleShort(b){
  const i=profile.shortlist.indexOf(b.t); if(i>=0) profile.shortlist.splice(i,1); else { profile.shortlist.push(b.t); b.m.forEach(m=>{profile.moods[m]=(profile.moods[m]||0)+.5;}); }
  saveProfile();
  if(profile.shortlist.length===2&&!nudged){ nudged=true; setTimeout(()=>{ bot('Two on your shelf. Want me to help you choose between them?'); setTimeout(()=>add(['Help me choose','Keep browsing'].map(c=>`<button type="button">${c}</button>`).join(''),'follow'),prefersReduced?0:900); },300); }
}

/* ---------------- My Shelf (header) — the same list as the chat's ♡ Shortlist, saved in this browser ---------------- */
function renderShelf(){ const n=document.getElementById('shelfN'); if(!n) return; const sl=profile.shortlist.map(byTitle).filter(Boolean);
  if(+n.textContent<sl.length){ n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump'); }
  n.textContent=sl.length; n.hidden=!sl.length; document.getElementById('shelfBtn').setAttribute('aria-label',`My Shelf, ${sl.length} book${sl.length===1?'':'s'}`);
  document.getElementById('shelfSub').textContent=sl.length?`${sl.length} book${sl.length===1?'':'s'} saved in this browser`:'Books you save will appear here';
  document.getElementById('shelfList').innerHTML=sl.length?sl.map(b=>`<div class="sh-item" data-cat="${b.id}"><img src="${b.img}" alt="" /><div class="sh-t"><b>${esc(nm(b))}</b><span>${esc(b.a)}</span></div>
    <button type="button" class="sh-open" data-sh="open">Open</button><button type="button" class="sh-rm" data-sh="rm" aria-label="Remove ${esc(nm(b))} from My Shelf">✕</button></div>`).join('')
    :'<p class="sh-empty">Your shelf is empty. Tap <b>♡ Add to my shelf</b> on any book, or ♡ on a book Penguin suggests.</p>';
  document.getElementById('shelfChoose').hidden=sl.length<2; if(typeof renderMyShelf==='function') renderMyShelf(); }
const shBtn=document.getElementById('shelfBtn'), shPop=document.getElementById('shelfPop');
function setShelf(open){ shPop.classList.toggle('open',open); shBtn.setAttribute('aria-expanded',open); if(open){ renderShelf(); if(typeof setPm==='function') setPm(false); } }
shBtn.onclick=e=>{ e.stopPropagation(); setShelf(!shPop.classList.contains('open')); };
document.addEventListener('click',e=>{ if(!e.target.closest('.sh-wrap')) setShelf(false); });
addEventListener('keydown',e=>{ if(e.key==='Escape'&&shPop.classList.contains('open')){ setShelf(false); shBtn.focus(); } });
shPop.addEventListener('click',e=>{ const a=e.target.closest('[data-sh]'), item=e.target.closest('.sh-item');
  if(a&&item){ const b=CATALOG[+item.dataset.cat]; if(a.dataset.sh==='rm') return toggleShort(b);
    setShelf(false); if(b.hero!=null) return openBook(b.hero,originFor(b.hero)); openAi(); return ask(`Tell me about ${b.t}`); }
  if(e.target.closest('#shelfChoose')){ setShelf(false); openAi(); return ask('Help me choose'); }
  if(e.target.closest('#shelfMore')){ setShelf(false); openAi(); return ask(profile.shortlist.length?'More like last time':'Surprise me'); } });
/* ---------------- My Shelf (second section): the reader's books stand face-out on a shelf ---------------- */
// broad shelf category shown as a tag when a book is lifted
const shelfGenre=g=>{ g=g.toLowerCase(); return /children|middle-grade|picture/.test(g)?"Children's":/self-help|wellbeing|spirituality|philosophy/.test(g)?'Self-help'
  :/career|business|finance/.test(g)?'Business':/memoir/.test(g)?'Memoir':/poetry/.test(g)?'Poetry':/non-fiction/.test(g)?'Non-fiction':'Fiction'; };
const SPINE={}; // cover colour → spine colour, sampled once per book
function spineColour(b,el){ if(SPINE[b.img]) return paint(el,SPINE[b.img]);
  const im=new Image(); im.onload=()=>{ try{ const c=document.createElement('canvas'); c.width=c.height=12; const x=c.getContext('2d'); x.drawImage(im,0,0,12,12);
    const d=x.getImageData(0,0,12,12).data; let r=0,g=0,bl=0; for(let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];bl+=d[i+2];} const n=d.length/4;
    SPINE[b.img]=[r/n*.82|0,g/n*.82|0,bl/n*.82|0]; }catch(e){ SPINE[b.img]=[150,70,30]; } paint(el,SPINE[b.img]); };
  im.onerror=()=>paint(el,SPINE[b.img]=[150,70,30]);
  setTimeout(()=>{ im.src=el.querySelector('.ms-cover img').src; }); } // read the src after the standalone build swaps in the embedded image
function paint(el,[r,g,b]){ el.style.setProperty('--spine',`rgb(${r},${g},${b})`); el.classList.toggle('light',(.299*r+.587*g+.114*b)>160); }
/* The shelf has fixed slots: books keep the slot they were put in; the rest are greyed-out placeholders that show a "+" on hover */
const SHELF_DECOR_L=`<span class="ms-peng" aria-hidden="true"><span class="pg"><img src="assets/peng-base.png" alt="" /><img class="pg-pages" src="assets/peng-pages.png" alt="" /><img class="pg-cover" src="assets/peng-cover.png" alt="" /><img class="pg-hand" src="assets/peng-hand.png" alt="" /></span></span><span class="ms-bookend" aria-hidden="true"></span>`;
const SHELF_DECOR_R=`<span class="ms-bookend r" aria-hidden="true"></span><span class="ms-plant" aria-hidden="true"><svg viewBox="0 0 70 110"><path class="lf l1" d="M35 70C33 52 22 40 10 36c8 12 14 22 25 34z" fill="#5f8f55"/><path class="lf l2" d="M35 70c2-20 12-34 26-40-6 14-14 26-26 40z" fill="#4c7d45"/><path class="lf l3" d="M35 70c-1-24 3-42 12-56 2 18-2 38-12 56z" fill="#6aa060"/><path class="lf l4" d="M33 72c-3-14-10-22-20-24 4 10 10 18 20 24z" fill="#4c7d45"/><path d="M20 72h30l-4 36H24z" fill="#C97B4A"/><path d="M18 70h34v7H18z" fill="#B0673A"/></svg></span>`;
let shelfTarget=null; // the empty slot the next book will go into (set by clicking "+")
function shelfSlots(){ const pos=profile.shelfPos=profile.shelfPos||{}, titles=profile.shortlist.filter(t=>byTitle(t));
  Object.keys(pos).forEach(t=>{ if(!titles.includes(t)) delete pos[t]; });
  const n=Math.max(6,titles.length+3, ...Object.values(pos).map(v=>v+2)), used=new Set(Object.values(pos));
  titles.forEach(t=>{ if(pos[t]==null){ let i=0; while(used.has(i)) i++; pos[t]=i; used.add(i); } });
  const slots=Array(Math.max(n,...Object.values(pos).map(v=>v+1))).fill(null); titles.forEach(t=>{ slots[pos[t]]=byTitle(t); }); return slots; }
const firstEmpty=(from=0)=>{ const sl=shelfSlots(); for(let i=from;i<sl.length;i++) if(!sl[i]) return i; return sl.findIndex(x=>!x); };
function renderMyShelf(added){ const row=document.getElementById('msRow'); if(!row) return; const slots=shelfSlots(), count=slots.filter(Boolean).length, touch=matchMedia('(hover: none)').matches;
  if(shelfTarget!=null&&slots[shelfTarget]) shelfTarget=firstEmpty(shelfTarget);
  document.getElementById('msNook').classList.toggle('empty',!count);
  document.getElementById('msSub').innerHTML=count?`<b>${count} book${count===1?'':'s'}</b> on your shelf. ${touch?'Tap':'Hover'} an empty slot and choose <b>+</b> to add more.`
    :"Discover books you'll love and start building your personal collection.";
  const cells=slots.map((b,i)=>{ if(!b){ const hk=[.92,1,.86,.96,.9,.98,.88,.94][i%8];
      const tgt=i===shelfTarget&&document.getElementById('msNook').classList.contains('chatting'), hint=!count&&!tgt&&i===slots.indexOf(null);
      return `<button type="button" class="ms-slot${tgt?' target':''}${hint?' hint':''}" data-slot="${i}" style="--hk:${hk};--w:${slots.slice(0,i).filter(x=>!x).length}" aria-label="Empty slot: add a book"><span class="ms-add" aria-hidden="true">+</span></button>`; }
    let h=0; for(const ch of b.t) h=(h*31+ch.charCodeAt(0))>>>0; const hk=(.88+(h%13)/100).toFixed(2);
    return `<button type="button" class="ms-book${b.t===added?' incoming':''}" data-cat="${b.id}" data-slot="${i}" style="--hk:${hk}" aria-label="Open ${esc(b.t)} by ${esc(b.a)}">
      <span class="ms-spine"><img class="ms-logo" src="assets/v2/logo-penguin.png" alt="" /><b class="${nm(b).length>17?'xl':nm(b).length>12?'l':''}">${esc(nm(b))}</b><i>${esc(b.a.split(/ & | and /)[0].trim().split(/\s+/).pop())}</i></span>
      <span class="ms-cover"><img src="${b.img}" alt="" /><em class="ms-tag">${shelfGenre(b.g)}</em></span><span class="ms-x" role="button" tabindex="0" data-remove="${i}" aria-label="Remove ${esc(b.t)} from your shelf" title="Remove from shelf">✕</span></button>`; });
  /* one shelf while the books fit; otherwise two shelves, one above the other, in the same fixed-height card */
  const nook=document.getElementById('msNook'), W=row.clientWidth||600;
  const tier=(html,l,r)=>`<div class="ms-tier"><div class="ms-scroll"><div class="ms-row">${l}${html}${r}</div></div><div class="ms-plank"></div></div>`;
  const BL='<span class="ms-bookend" aria-hidden="true"></span>';
  /* try one shelf first; if anything (books, bookends, penguin or plant) would be cut off, use two */
  nook.classList.remove('tiers2'); row.innerHTML=tier(cells.join(''),SHELF_DECOR_L,SHELF_DECOR_R);
  const sc=row.querySelector('.ms-scroll'), two=W>0&&sc.scrollWidth>sc.clientWidth+1;
  nook.classList.toggle('tiers2',two);
  if(two){ const top=Math.ceil(cells.length/2);
    row.innerHTML=tier(cells.slice(0,top).join(''),BL,SHELF_DECOR_R)+tier(cells.slice(top).join(''),SHELF_DECOR_L,'<span class="ms-bookend r" aria-hidden="true"></span>'); }
  row.querySelectorAll('.ms-book').forEach(el=>spineColour(CATALOG[+el.dataset.cat],el)); try{ DC.sync(); }catch(e){} }
let msRT; addEventListener('resize',()=>{ clearTimeout(msRT); msRT=setTimeout(()=>renderMyShelf(),200); });
function removeFromShelf(x){ const bk=x.closest('.ms-book'), b=CATALOG[+bk.dataset.cat]; bk.classList.add('leaving');
  setTimeout(()=>{ if(profile.shortlist.includes(b.t)) toggleShort(b); delete profile.shelfPos[b.t]; saveProfile(); renderMyShelf(); },380); }
document.getElementById('msRow').addEventListener('keydown',e=>{ const x=e.target.closest('.ms-x'); if(x&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); e.stopPropagation(); removeFromShelf(x); } });
document.getElementById('msRow').addEventListener('click',e=>{ const x=e.target.closest('.ms-x'); if(x){ e.stopPropagation(); return removeFromShelf(x); }
  const slot=e.target.closest('.ms-slot'); if(slot) return DC.open(+slot.dataset.slot);
  const bk=e.target.closest('.ms-book'); if(!bk) return; const b=CATALOG[+bk.dataset.cat];
  if(b.hero!=null) openBook(b.hero,bk.querySelector('.ms-cover')); else { openAi(); ask(`Tell me about ${b.t}`); } });
document.querySelectorAll('[data-explore]').forEach(b=>b.addEventListener('click',()=>DC.open()));
document.getElementById('shelfView').onclick=()=>setShelf(false);

/* ---------------- Fill your shelf: the conversation opens beside the shelf, inside the same section ----------------
   Click "+" on an empty slot → the shelf glides left and the chat appears on the right. It asks what you enjoy (or how you
   feel), recommends books, and "Add to Shelf" flies the cover into the highlighted slot, where the placeholder becomes the
   book's spine. ✕ returns to the full-width shelf and keeps the conversation. No pop-ups. */
const DC=(()=>{
  const GENRES=[['Fiction','fiction'],['Romance','romance'],['Mystery','mystery'],['Fantasy','fantasy'],["I'm not sure",'idk']];
  const MOODS=[['😊 Happy','happy'],['💧 Emotional','emotional'],['🧭 Adventurous','adventurous'],['🌿 Relaxed','relaxed'],['✨ Looking for inspiration','inspiration']];
  const PICKS={
    fiction:['The Vegetarian','Heart Lamp','The Correspondent','At Night All Blood Is Black','God Save the Dork','Nirmala & Normala'],
    romance:['Can We Be Strangers Again?','The Accidental Protector','Thank You for Leaving','The Correspondent'],
    mystery:['The Housemaid','One of Us Is Lying','The Fourth Girl','What We Did to Survive','The Inheritance Games','Mumbai Confidential'],
    fantasy:['The Hidden Hindu','The Naga Warriors 2','Riley Dare: Slightly Witchy Sleuth','My First Sudha Murty Stories'],
    happy:['God Save the Dork','Nirmala & Normala','My First Sudha Murty Stories','Ikigai','Riley Dare: Slightly Witchy Sleuth'],
    emotional:['Thank You for Leaving','Mother Mary Comes to Me','The Correspondent','Can We Be Strangers Again?','Heart Lamp'],
    adventurous:['The Inheritance Games','What We Did to Survive','The Hidden Hindu','The Naga Warriors 2','Wild Next Door'],
    relaxed:['Ikigai','The Art of Letting Go',"It's Okay . . .",'Heart Lamp','The Correspondent'],
    inspiration:['Atomic Habits','The Let Them Theory','Ikigai','The Courage to Be Disliked','Build an Epic Career','Rich Dad Poor Dad']};
  const SAY={fiction:"Lovely. Stories that pull you into someone else's life. I think you'll love these:",romance:"A romantic at heart! These are full of feeling:",
    mystery:"Ooh, a puzzle-solver. These will keep you guessing right to the end:",fantasy:"Let's step into other worlds. Try these:",
    happy:"Love that! Here's something to keep the good mood going:",emotional:"Something with real feeling, then. These ones stay with you:",
    adventurous:"Then let's go somewhere exciting:",relaxed:"Something quiet and soothing, then:",inspiration:"Here's a little fuel for big ideas:"};
  const WORDS=[[/not sure|don.?t know|no idea|anything|surprise|you choose|you pick/,'idk'],[/roman|love/,'romance'],[/myster|thrill|crime|suspense|detective|whodunn?it/,'mystery'],
    [/fantas|magic|myth/,'fantasy'],[/inspir|motivat|learn|grow|self.?help|habit|career/,'inspiration'],[/relax|calm|cozy|cosy|peace|slow/,'relaxed'],
    [/adventur|travel|exciting|thrilling ride|journey/,'adventurous'],[/sad|emotion|cry|moving|heart|feel/,'emotional'],[/happy|fun|funny|laugh|cheer|light/,'happy'],[/fiction|novel|literary|stor/,'fiction']];
  const nook=document.getElementById('msNook'), chat=document.getElementById('msChat'), body=document.getElementById('mscBody'), form=document.getElementById('mscForm'), input=document.getElementById('mscText');
  let started=false,cur=null,page=0,pending=null;
  const later=(fn,ms)=>setTimeout(fn,prefersReduced?0:ms);
  const scroll=()=>{ body.scrollTop=body.scrollHeight; };
  function add(html,cls){ const d=document.createElement('div'); d.className=cls; d.innerHTML=html; body.appendChild(d); scroll(); return d; }
  function bot(text,then){ const t=add('<i></i><i></i><i></i>','dc-typing'); later(()=>{ t.remove(); add(esc(text),'dc-msg bot'); if(then) later(then,350); },650+Math.min(800,text.length*7)); }
  function chips(list,onPick){ const row=add(list.map(([l,v])=>`<button type="button" data-v="${esc(v)}">${esc(l)}</button>`).join(''),'dc-chips'); pending={row,onPick};
    row.onclick=e=>{ const b=e.target.closest('button'); if(!b||row.classList.contains('done')) return; row.classList.add('done'); b.classList.add('picked'); pending=null; add(esc(b.textContent),'dc-msg me'); later(()=>onPick(b.dataset.v),250); }; }
  const askGenre=t=>bot(t||"Let's find something interesting for your shelf! What kind of stories do you enjoy?",()=>chips(GENRES,pickGenre));
  const askMood=t=>bot(t||"No worries! How are you feeling today?",()=>chips(MOODS,pick));
  function pickGenre(v){ if(v==='idk') return askMood(); pick(v); }
  function pick(v){ cur=v; page=0; recs(SAY[v]); }
  const blurb=b=>{ const t=(b.blurb||b.line||'').split(/(?<=[.!?])\s/)[0]; return t.length>120?t.slice(0,117).replace(/\s+\S*$/,'')+'…':t; };
  const MORE=[['Show me more','more'],['Something else','genre'],['Match my mood','mood']];
  function recs(text){ const list=PICKS[cur].map(byTitle).filter(Boolean), batch=list.slice(page*3,page*3+3);
    bot(text,()=>{ const box=add(batch.map((b,k)=>{ const on=profile.shortlist.includes(b.t);
      return `<div class="dc-card" data-cat="${b.id}" style="animation-delay:${k*.12}s"><img src="${b.img}" alt="" /><div><b>${esc(b.t)}</b><span>${esc(b.a)}</span><p>${esc(blurb(b))}</p>
        <button type="button" class="dc-add${on?' on':''}">${on?'✓ On your shelf':'+ Add to Shelf'}</button></div></div>`; }).join(''),'dc-recs');
      box.onclick=e=>{ const btn=e.target.closest('.dc-add'); if(btn) addToShelf(btn); };
      later(()=>chips(MORE,next),500); }); }
  function next(v){ if(v==='genre') return askGenre('Sure! What kind of story would you like next?'); if(v==='mood') return askMood('Of course. How are you feeling right now?');
    page++; if(page*3>=PICKS[cur].length){ page=0; return askGenre("That's every one I have for that right now. Want to try another kind of story?"); } recs('Here are a few more you might like:'); }
  // typing works too: "something romantic", "I need inspiration"…
  form.addEventListener('submit',e=>{ e.preventDefault(); const q=input.value.trim(); if(!q) return; input.value='';
    if(pending){ pending.row.classList.add('done'); pending=null; } add(esc(q),'dc-msg me'); const s=q.toLowerCase(), hit=WORDS.find(([re])=>re.test(s));
    later(()=>{ if(!hit) return askGenre("I'd love to help with that. To point you the right way, what kind of stories do you enjoy?");
      if(hit[1]==='idk') return askMood(); pick(hit[1]); },250); });
  /* Add to Shelf: the cover flies from the card into the highlighted slot, and the placeholder becomes the book's spine */
  function addToShelf(btn){ const card=btn.closest('.dc-card'), b=CATALOG[+card.dataset.cat]; if(profile.shortlist.includes(b.t)) return;
    const img=card.querySelector('img'), from=img.getBoundingClientRect(), slot=(shelfTarget!=null&&!shelfSlots()[shelfTarget])?shelfTarget:firstEmpty();
    profile.shelfPos=profile.shelfPos||{}; profile.shelfPos[b.t]=slot; toggleShort(b); shelfTarget=firstEmpty(slot); renderMyShelf(b.t);
    btn.textContent='✓ Added to your shelf'; btn.classList.add('on');
    const book=document.querySelector('#msRow .ms-book.incoming'); if(!book) return;
    const sc=book.closest('.ms-scroll'), r=book.getBoundingClientRect(), sr=sc.getBoundingClientRect(); if(r.left<sr.left||r.right>sr.right) sc.scrollLeft+=r.left-sr.left-sr.width/2+r.width/2;
    const to=book.querySelector('.ms-spine').getBoundingClientRect();
    if(prefersReduced){ book.classList.remove('incoming'); return; }
    const fly=document.createElement('img'); fly.className='dc-fly'; fly.src=img.src; Object.assign(fly.style,{left:from.left+'px',top:from.top+'px',width:from.width+'px',height:from.height+'px'}); document.body.appendChild(fly);
    const dx=to.left-from.left, dy=to.top-from.top, sx=to.width/from.width, sy=to.height/from.height, mid=(1+sy)/2+.15;
    fly.animate([{transform:'translate(0,0) scale(1,1) rotate(0deg)'},{transform:`translate(${dx*.5}px,${dy*.5-120}px) scale(${mid},${mid}) rotate(-10deg)`,offset:.5},{transform:`translate(${dx}px,${dy}px) scale(${mid*.9},${sy}) rotate(0deg)`,offset:.82},{transform:`translate(${dx}px,${dy}px) scale(${sx},${sy}) rotate(0deg)`}],
      {duration:1000,easing:'cubic-bezier(.45,.05,.3,1)'}).finished.then(()=>{ fly.remove(); land(book); }); }
  function land(book){ if(!book.isConnected) return; book.classList.remove('incoming'); book.classList.add('landed'); const plank=book.closest('.ms-tier').querySelector('.ms-plank'); plank.classList.remove('thud'); void plank.offsetWidth; plank.classList.add('thud');
    for(let i=0;i<10;i++){ const sp=document.createElement('span'); sp.className='ms-spark'; const a=i/10*Math.PI*2, r=50+Math.random()*26;
      sp.style.setProperty('--dx',Math.cos(a)*r+'px'); sp.style.setProperty('--dy',Math.sin(a)*r*.8+'px'); if(i%2) sp.style.background='#FFB27A'; book.appendChild(sp); setTimeout(()=>sp.remove(),800); }
    const plus=document.createElement('span'); plus.className='ms-plus'; plus.textContent='+1'; book.appendChild(plus); setTimeout(()=>plus.remove(),1200);
    setTimeout(()=>book.classList.remove('landed'),800); }
  function open(slot){ shelfTarget=(slot!=null&&!shelfSlots()[slot])?slot:firstEmpty(); const was=nook.classList.contains('chatting');
    nook.classList.add('chatting'); renderMyShelf();
    const r=nook.getBoundingClientRect(); if(r.top<70||r.bottom>innerHeight) scrollTo({top:scrollY+r.top-90,behavior:'smooth'});
    if(!started) start();
    else if(!was&&!pending&&cur) later(()=>add('Welcome back! Want to keep going?','dc-msg bot')&&chips(MORE,next),400);
    later(()=>input.focus({preventScroll:true}),600); }
  function close(){} /* the chat now stays open beside the shelf */
  /* open by default: Penguin greets the reader the first time the shelf comes into view */
  function start(){ if(started) return; started=true; shelfTarget=firstEmpty(); renderMyShelf();
    bot('Ask your penguin to design your shelf 🐧',()=>askGenre()); }
  if('IntersectionObserver' in window){ const io=new IntersectionObserver(es=>{ if(es.some(e=>e.isIntersecting)){ io.disconnect(); start(); } },{threshold:.35}); io.observe(nook); } else start();
  /* keep every card's button in step with the shelf (books can be removed elsewhere) */
  function sync(){ body.querySelectorAll('.dc-card').forEach(c=>{ const b=CATALOG[+c.dataset.cat], on=profile.shortlist.includes(b.t), btn=c.querySelector('.dc-add');
    if(btn.classList.contains('on')!==on){ btn.classList.toggle('on',on); btn.textContent=on?'✓ On your shelf':'+ Add to Shelf'; } }); }
  return {open,close,sync};
})();
renderShelf();
document.getElementById('aiSide').addEventListener('click',e=>{
  if(e.target.closest('#slChoose')){ panel.classList.remove('side-open'); return ask('Help me choose'); }
  if(e.target.closest('#profClear')){ profile={moods:{},loved:[],forWhom:[],prefs:[],shortlist:[],chose:[],asks:0}; saveProfile(); return toast2('Your reader profile has been cleared from this browser.'); }
  const it=e.target.closest('[data-sl]'); if(!it) return; const b=CATALOG[+it.closest('.sl-item').dataset.cat];
  if(it.dataset.sl==='rm') toggleShort(b); else { panel.classList.remove('side-open'); ask(`Tell me about ${b.t}`); }
});
document.getElementById('sideBtn').onclick=()=>panel.classList.toggle('side-open');
renderSide();

// read-aloud (browser speech) and voice input (Chrome/Edge speech recognition)
const toast2=msg=>{const t=document.getElementById('toast2'); t.textContent=msg; t.classList.add('show'); clearTimeout(toast2.t); toast2.t=setTimeout(()=>t.classList.remove('show'),3200);};
let speakingBtn=null;
function stopSpeech(){ if(window.speechSynthesis) speechSynthesis.cancel(); document.querySelectorAll('.say.on,[data-speak].on').forEach(x=>x.classList.remove('on')); speakingBtn=null; }
function speak(text,btn){
  if(!window.speechSynthesis) return toast2("Read-aloud isn't supported in this browser.");
  if(btn&&speakingBtn===btn&&speechSynthesis.speaking) return stopSpeech();
  stopSpeech(); const u=new SpeechSynthesisUtterance(String(text).replace(/[✦🐧🔊🎧]/g,''));
  const v=speechSynthesis.getVoices(); u.voice=v.find(x=>/en-IN/i.test(x.lang))||v.find(x=>/en-GB/i.test(x.lang))||v.find(x=>/^en/i.test(x.lang))||null;
  u.lang=u.voice?u.voice.lang:'en-IN'; u.rate=1;
  if(btn){btn.classList.add('on'); speakingBtn=btn;}
  u.onend=u.onerror=()=>{ if(btn) btn.classList.remove('on'); if(speakingBtn===btn) speakingBtn=null; };
  speechSynthesis.speak(u);
}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition; let rec=null;
function listenInto(input,btn,onDone){
  if(!SR) return toast2('Voice input works in Chrome and Edge. You can type your request instead.');
  if(rec){ rec.stop(); return; }
  rec=new SR(); rec.lang='en-IN'; rec.interimResults=true; let said='';
  btn.classList.add('rec'); btn.setAttribute('aria-pressed','true');
  rec.onresult=e=>{ said=[...e.results].map(r=>r[0].transcript).join(''); input.value=said; input.dispatchEvent(new Event('input')); };
  rec.onerror=e=>{ if(e.error==='not-allowed'||e.error==='service-not-allowed') toast2('Microphone access is blocked. Allow it in your browser to talk to Penguin.'); };
  rec.onend=()=>{ btn.classList.remove('rec'); btn.setAttribute('aria-pressed','false'); rec=null; if(said.trim()) onDone(said.trim()); };
  try{ rec.start(); }catch(err){ btn.classList.remove('rec'); rec=null; }
}
document.getElementById('heroMic').onclick=e=>listenInto(aiS,e.currentTarget,q=>runAiSearch(q));
document.getElementById('chatMic').onclick=e=>{const i=document.getElementById('aiQ'); listenInto(i,e.currentTarget,q=>{i.value=''; ask(q);});};
let autoRead=false;


/* ---------------- Video summary: the book told as a story ----------------
   One narrator tells the novel like a story over a cinematic scene built from the book's own cover (slow camera drift,
   warm light, floating dust), with chapter cards and word-by-word subtitles. Voiced by the browser's speech engine.
   To go live: swap script() for an LLM-written narration and a recorded voice. */
const VP=(()=>{
  const FOCI=[[28,32],[72,58],[50,22],[24,70],[68,30],[45,62]];
  // Optional background footage per book (muted: the narrator is the only sound). The clip is split into scenes and
  // each line of the story plays the scene that matches its words; it only moves while the story is being told.
  const VIDEO={'What We Did to Survive':{src:'assets/video/wwdts-beach.mp4',scenes:[
    {a:0.05,b:1.9,re:/mexico|spring.break|marina|coast|island/i},                                        // aerial coastline
    {a:2.05,b:3.8,re:/best friend|hannah|emmy|friends|family/i},                                         // two friends walking on the beach
    {a:4.0,b:5.9,re:/boyfriend|wealthy|last day|charter|sailboat|party|thrill|tense/i},                  // lantern-lit toast at dusk
    {a:6.15,b:7.9,re:/survive|survival|secrets|crush|alone|danger|deadly|storm|weather|how does it end/i}]}}; // one girl alone at sunset
  let scene=null; // where the camera drifts on each story beat (% of the cover)
  let el,lines=[],cur=0,playing=false,timer=null,safety=null,t0=0,raf=0,voice=null,plan=null,cast=[],book=null;
  // Storyboard: the cast (photos where we have them, illustrated portraits otherwise) appears as film-still panels
  // the moment the narrator names each character.
  const norm=w=>w.toLowerCase().replace(/['’]s$/,'').replace(/[^a-z-]/g,'');
  function castKeys(c){ const ks=c.map(([n])=>n.toLowerCase().replace(/[^a-z\s-]/g,' ').split(/\s+/).filter(w=>w.length>2&&!['the','her','his','mrs'].includes(w)));
    const all=ks.flat(); return ks.map(k=>k.filter(w=>all.indexOf(w)===all.lastIndexOf(w))); } // a word shared by two characters (a surname) can't tell them apart
  function whoIn(t){ const toks=t.split(/\s+/).map(norm), keys=castKeys(cast);
    return cast.map((c,i)=>({c,wi:toks.findIndex(w=>keys[i].includes(w))})).filter(x=>x.wi>=0).sort((a,b)=>a.wi-b.wi).slice(0,3); }
  const pic=([n,r,k,img])=>img?`<img src="${img}" alt="${esc(n)}" />`:portrait(k);
  const est=t=>Math.max(2200,t.split(/\s+/).length*400);
  const fmt=ms=>{const s=Math.round(ms/1000);return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;};
  const list=a=>a.length>1?`${a.slice(0,-1).join(', ')} and ${a[a.length-1]}`:a[0];
  function script(b){
    const nm=b.short||b.t, sen=((b.sum||'').match(/[^.!?]+[.!?]+/g)||[b.sum||'']).map(x=>x.trim()), th=(b.th||[]).map(x=>x[0].toLowerCase()).slice(0,3);
    const L=[{k:'card',big:b.t,small:`by ${b.a}`,t:`This is the story of ${b.t}, by ${b.a}.`},
      {k:'card',num:'Chapter I',big:'The story',t:b.line}];
    sen.forEach(x=>L.push({k:'beat',t:x}));
    if(th.length) L.push({k:'card',num:'Chapter II',big:'The heart of it',t:`At its heart, this is a story about ${list(th)}.`});
    if(b.md&&b.md.length) L.push({k:'beat',t:`It's ${list(b.md)}: the kind of book that stays with you after the last page.`});
    if(b.yes&&b.yes.length) L.push({k:'beat',t:`Pick it up if ${b.yes[0]}.`});
    L.push({k:'card',big:'How does it end?',small:`Open ${nm} on Penguin to find out.`,t:`How does it end? Open ${nm} on Penguin, and find out.`});
    let beat=0; return L.map(l=>({...l,d:est(l.t),f:l.k==='beat'?FOCI[beat++%FOCI.length]:null,who:whoIn(l.t)}));
  }
  function build(){
    el=document.createElement('div'); el.className='vp'; el.setAttribute('role','dialog'); el.setAttribute('aria-label','Video summary');
    const dust=Array.from({length:22},()=>`<i style="left:${Math.random()*100}%;top:${20+Math.random()*80}%;animation-delay:-${(Math.random()*14).toFixed(1)}s;animation-duration:${(10+Math.random()*8).toFixed(1)}s;--s:${(.5+Math.random()).toFixed(2)}"></i>`).join('');
    el.innerHTML=`<div class="vp-backdrop" data-vp-close></div><div class="vp-card">
      <div class="vp-screen">
        <div class="vp-film"><img class="vp-bgimg" alt="" /><video class="vp-vid" muted playsinline preload="auto" aria-hidden="true"></video><audio class="vp-audio" preload="auto"></audio><div class="vp-cam"><img class="vp-art" alt="" /></div><div class="vp-light"></div><div class="vp-dust">${dust}</div><div class="vp-cast"></div></div>
        <div class="vp-titlecard"><small class="vp-num"></small><h3 class="vp-big-t"></h3><span class="vp-small"></span><div class="vp-starring"></div></div>
        <div class="vp-top"><span class="vp-live">✦ The story, told</span><img class="vp-thumb" alt="" /><span class="vp-ttl"></span><button class="vp-x" type="button" data-vp-close aria-label="Close video">✕</button></div>
        <p class="vp-cap" aria-live="polite"></p>
        <button class="vp-big" type="button" data-vp-play aria-label="Play">▶</button></div>
      <div class="vp-bar"><button type="button" data-vp-play class="vp-pp" aria-label="Play">▶</button><span class="vp-time">0:00</span>
        <div class="vp-track"><i></i></div><span class="vp-dur">0:00</span></div></div>`;
    BM.el.appendChild(el);
    const v=el.querySelector('.vp-vid'), guard=()=>{ if(scene&&(v.currentTime>=scene.b||v.currentTime<scene.a-.05||v.ended)) v.currentTime=scene.a; };
    if(v.requestVideoFrameCallback){ const each=()=>{ guard(); v.requestVideoFrameCallback(each); }; v.requestVideoFrameCallback(each); } // frame-accurate: a shot never runs into the next
    v.addEventListener('timeupdate',guard);
    el.addEventListener('click',e=>{ if(e.target.closest('[data-vp-close]')) return close(); if(e.target.closest('[data-vp-play]')) return playing?pause():play();
      const tr=e.target.closest('.vp-track'); if(tr){ const r=tr.getBoundingClientRect(), f=(e.clientX-r.left)/r.width, tot=lines.reduce((a,l)=>a+l.d,0);
        let acc=0,k=0; while(k<lines.length-1&&acc+lines[k].d<f*tot){acc+=lines[k].d;k++;} cur=k; if(playing){stopLine(); say();} else show(); } });
    addEventListener('keydown',e=>{ if(!el.classList.contains('open')) return;
      if(e.key==='Escape'){e.stopImmediatePropagation(); close();} else if(e.key===' '){e.preventDefault(); e.stopImmediatePropagation(); playing?pause():play();}
      else if(/Arrow/.test(e.key)) e.stopImmediatePropagation(); },true);
  }
  // word timing for the subtitles; the voice's word events keep it in time
  function planLine(l){ const ws=[...l.t.matchAll(/\S+/g)].map(m=>({txt:m[0],i:m.index})), wt=ws.map(x=>x.txt.length+1.6), tot=wt.reduce((a,b)=>a+b,0)||1, pace=l.d*.92; let t=0;
    ws.forEach((x,k)=>{ x.s=t; t+=pace*wt[k]/tot; }); plan={start:performance.now(),words:ws}; }
  function onWord(ci){ if(!plan) return; const k=plan.words.findIndex(w=>w.i>=ci); if(k<0) return;
    const shift=performance.now()-plan.start-plan.words[k].s; plan.words.forEach((w,j)=>{ if(j>=k) w.s+=shift; }); }
  const elapsed=()=>lines.slice(0,cur).reduce((a,l)=>a+l.d,0);
  function show(){ const l=lines[cur]||lines[lines.length-1];
    const who=l.k==='beat'?l.who:[], cl=el.querySelector('.vp-cast'); el.classList.toggle('cast-on',who.length>0);
    cl.className=`vp-cast n${who.length}`; cl.innerHTML=who.map(({c,wi})=>`<figure class="vp-still${c[3]?'':' drawn'}" data-wi="${wi}">${pic(c)}<figcaption><b>${esc(c[0])}</b><span>${esc(c[1])}</span></figcaption></figure>`).join('');
    if(!playing) cl.querySelectorAll('.vp-still').forEach(f=>f.classList.add('on'));
    el.querySelector('.vp-starring').innerHTML=cur===0&&cast.length?`<small>Starring</small><div>${cast.slice(0,4).map(c=>`<span class="vp-star"><i>${pic(c)}</i>${esc(c[0])}</span>`).join('')}</div>`:'';
    el.classList.toggle('carded',l.k==='card');
    el.querySelector('.vp-num').textContent=l.num||''; el.querySelector('.vp-big-t').textContent=l.big||''; el.querySelector('.vp-small').textContent=l.small||'';
    const cam=el.querySelector('.vp-cam'); if(l.f){ cam.style.transformOrigin=`${l.f[0]}% ${l.f[1]}%`; cam.style.transform=`scale(${playing?1.35:1.2})`; } else cam.style.transform='scale(1.08)';
    el.querySelector('.vp-cap').innerHTML=l.t.split(/(\s+)/).map(w=>/\s/.test(w)?w:`<span>${esc(w)}</span>`).join('');
    progress(0); }
  function progress(within){ const tot=lines.reduce((a,l)=>a+l.d,0), at=Math.min(tot,elapsed()+within);
    el.querySelector('.vp-track i').style.width=`${at/tot*100}%`; el.querySelector('.vp-time').textContent=fmt(at); }
  function tick(){ const t=performance.now()-t0; progress(Math.min(lines[cur].d,t)); const v=vid(); if(v&&scene&&(v.currentTime>=scene.b||v.ended)) v.currentTime=scene.a; // keep each shot inside its scene
    if(plan){ const pt=performance.now()-plan.start, sp=el.querySelectorAll('.vp-cap span'); let said=0; plan.words.forEach((w,k)=>{ const on=pt>=w.s; if(on) said=k+1; sp[k]&&sp[k].classList.toggle('on',on); });
      el.querySelectorAll('.vp-still').forEach(f=>f.classList.toggle('on',+f.dataset.wi<said)); }
    raf=requestAnimationFrame(tick); }
  function stopLine(){ clearTimeout(timer); clearTimeout(safety); cancelAnimationFrame(raf); if(window.speechSynthesis) speechSynthesis.cancel(); el?.querySelector('.vp-audio')?.pause(); }
  function next(){ if(!playing) return; stopLine(); if(cur>=lines.length-1){ playing=false; cur=0; vid()?.pause(); setBtn(); el.classList.add('ended'); show(); return; } cur++; say(); }
  const vid=()=>el.classList.contains('has-video')?el.querySelector('.vp-vid'):null;
  function say(){ const l=lines[cur]; show(); t0=performance.now(); planLine(l); tick(); const v=vid(); if(v){ const sc=VIDEO[book.t].scenes, hits=sc.map(x=>(l.t.match(new RegExp(x.re.source,'gi'))||[]).length), best=Math.max(...hits), k=best?hits.indexOf(best):-1; /* the scene whose words the line mentions most */ const next=sc[k>=0?k:cur%sc.length]; if(next!==scene){ scene=next; v.currentTime=scene.a; } v.play().catch(()=>{}); }
    narrate(l); }
  /* Recorded narration: if assets/narration/<book-slug>/NN.mp3 exists (see narration/README.md), play it instead of the
     browser voice, with the subtitles timed to the real audio. Books without files fall back to the browser voice. */
  const slug=t=>t.toLowerCase().replace(/&/g,'and').replace(/['’]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  let narrOK=null; // null = not checked yet for this book, true = has audio files, false = use the browser voice
  function narrate(l){ if(narrOK===false) return speakTTS(l);
    const a=el.querySelector('.vp-audio'), file=`assets/narration/${slug(book.t)}/${String(cur+1).padStart(2,'0')}.mp3`, line=cur; let done=false;
    const fallback=()=>{ if(done||line!==cur||!playing) return; done=true; if(narrOK!==true) narrOK=false; a.pause(); speakTTS(l); }; // a book with recordings keeps trying them line by line
    a.onerror=()=>{ if(!/^data:/.test(a.getAttribute('src')||'')) fallback(); };
    a.onplaying=()=>{ if(line!==cur) return; done=true; narrOK=true; clearTimeout(safety); const d=a.duration*1000||l.d;
      lines[cur].d=d+600; t0=performance.now(); planLine({...l,d:d/.92}); safety=setTimeout(next,d+4000); };
    a.onended=()=>{ if(playing&&line===cur) timer=setTimeout(next,l.k==='card'?900:550); };
    a.setAttribute('src',file); setTimeout(()=>{ if(line===cur&&playing) a.play().catch(()=>{}); });
    safety=setTimeout(()=>{ if(!done) fallback(); },2500); }
  function speakTTS(l){ if(window.speechSynthesis&&!prefersReduced) narrateTTS(l); else timer=setTimeout(next,l.d); }
  /* Audiobook-style delivery: read phrase by phrase, breathing at commas and clauses and resting a little longer at the
     end of each sentence, at an unhurried pace with tiny natural variations. The script itself is unchanged. */
  function narrateTTS(l){ const parts=[], re=/[^,;:—–.!?]+[,;:—–.!?]*["”’]?\s*/g; let m; while((m=re.exec(l.t))) if(m[0].trim()) parts.push({t:m[0],i:m.index});
    if(!parts.length) parts.push({t:l.t,i:0});
    const base=l.k==='card'?.86:.9; let k=0;
    const speakPart=()=>{ if(!playing) return; const p=parts[k], u=new SpeechSynthesisUtterance(p.t.trim()); if(voice){u.voice=voice; u.lang=voice.lang;}
      u.rate=base+(Math.random()-.5)*.03; u.pitch=1; u.volume=1;
      u.onstart=()=>onWord(p.i); u.onboundary=e=>{ if(e.name==='word') onWord(p.i+e.charIndex); };
      u.onend=()=>{ if(!playing) return; k++; const end=p.t.trim().replace(/["”’]$/,'').slice(-1);
        if(k<parts.length) timer=setTimeout(speakPart,/[.!?]/.test(end)?420:/[;:—–]/.test(end)?300:/,/.test(end)?200:90);
        else timer=setTimeout(next,l.k==='card'?950:600); };
      speechSynthesis.speak(u); };
    speakPart(); safety=setTimeout(next,l.d*2.8+parts.length*400); } // safety net if a voice never reports that it finished
  function setBtn(){ el.querySelectorAll('[data-vp-play]').forEach(b=>{b.textContent=playing?'❚❚':'▶'; b.setAttribute('aria-label',playing?'Pause':'Play');}); el.classList.toggle('playing',playing); }
  function play(){ stopSpeech(); playing=true; el.classList.remove('ended'); setBtn(); say(); }
  function pause(){ playing=false; stopLine(); plan=null; vid()?.pause(); setBtn(); show(); el.querySelectorAll('.vp-still').forEach(f=>f.classList.add('on')); }
  /* Pick the most natural-sounding English voice the browser has: neural / premium / enhanced voices first, then warm
     storytelling voices; robotic and novelty voices are ruled out. */
  function pickVoice(){ const vs=(window.speechSynthesis?speechSynthesis.getVoices():[]).filter(x=>/^en/i.test(x.lang));
    const score=v=>{ const n=v.name; let s=0;
      if(/natural|neural/i.test(n)) s+=60; if(/premium/i.test(n)) s+=50; if(/enhanced/i.test(n)) s+=40;
      if(/google uk english female/i.test(n)) s+=36; else if(/google us english/i.test(n)) s+=26;
      if(/sonia|libby|maisie|serena|aria|jenny|ava|emma/i.test(n)) s+=26; else if(/samantha/i.test(n)) s+=24; else if(/kate|stephanie|martha|karen|moira|tessa|fiona|neerja|catherine/i.test(n)) s+=18;
      if(/en-GB/i.test(v.lang)) s+=8; else if(/en-IN|en-IE|en-AU/i.test(v.lang)) s+=5; else s+=3;
      if(/albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|junior|organ|superstar|trinoids|whisper|wobble|zarvox|ralph|fred|kathy|princess|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley/i.test(n)) s-=200;
      return s; };
    voice=vs.sort((a,b)=>score(b)-score(a))[0]||null; }
  function open(b){ if(!el) build(); pickVoice(); cast=CAST[b.t]||[]; lines=script(b); cur=0; playing=false;
    book=b; scene=null; narrOK=null; const v=el.querySelector('.vp-vid'); el.classList.toggle('has-video',!!VIDEO[b.t]);
    if(VIDEO[b.t]){ v.muted=true; v.volume=0; v.setAttribute('src',VIDEO[b.t].src); v.playbackRate=.9; v.pause(); try{v.currentTime=0;}catch(e){} } else { v.pause(); v.removeAttribute('src'); }
    el.querySelector('.vp-ttl').textContent=b.short||b.t; ['.vp-thumb','.vp-bgimg','.vp-art'].forEach(q=>el.querySelector(q).src=b.img);
    el.querySelector('.vp-dur').textContent=fmt(lines.reduce((a,l)=>a+l.d,0)); el.classList.remove('ended'); setBtn(); show();
    el.classList.add('open'); el.querySelector('.vp-big').focus({preventScroll:true}); }
  function close(){ if(!el||!el.classList.contains('open')) return; pause(); el.classList.remove('open'); BM.el.querySelector('[data-video]')?.focus({preventScroll:true}); }
  if(window.speechSynthesis) speechSynthesis.addEventListener?.('voiceschanged',pickVoice);
  return {open,close,scriptFor:script};
})();

/* ---------------- Book of the Year 2026 (editorial pick for this concept: change BOTY_TITLE to feature another book) ---------------- */
(()=>{ const BOTY_TITLE='Heart Lamp', i=HERO.findIndex(h=>h.t===BOTY_TITLE); if(i<0) return; const b=HERO[i];
  /* the year's picks, ranked: covers stand in a row that overlaps the panel and runs off to the right */
  const PICKS=[BOTY_TITLE,'What We Did to Survive','The Vegetarian','At Night All Blood Is Black','Mother Mary Comes to Me','The Correspondent','Thank You for Leaving','The Hidden Hindu','The Housemaid','Atomic Habits'];
  const list=PICKS.map(tt=>HERO.findIndex(h=>h.t===tt)).filter(k=>k>=0);
  const row=document.getElementById('botyRow');
  row.innerHTML=list.map((k,n)=>`<button type="button" class="boty-bk" data-i="${k}" aria-label="Number ${n+1}: open ${esc(HERO[k].t)} by ${esc(HERO[k].a)}"><span class="rib" aria-hidden="true">${n+1}</span><img src="${HERO[k].img}" alt="" /></button>`).join('');
  row.addEventListener('click',e=>{ const el=e.target.closest('.boty-bk'); if(el) openBook(+el.dataset.i,el); });
  row.addEventListener('keydown',e=>{ if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ e.preventDefault(); row.scrollBy({left:(e.key==='ArrowRight'?1:-1)*300,behavior:'smooth'}); } });
  const n=list.length;
  document.getElementById('botyBlurb').innerHTML=`The year's ${n} best books, picked by Penguin's editors. Our number one is <b>${esc(b.t)}</b> by ${esc(b.a)}.`;
})();

/* ---------------- All books page (index.html#books) ---------------- */
(()=>{ const sec=document.getElementById('allbooks'), grid=document.getElementById('abGrid'), chips=document.getElementById('abChips'), search=document.getElementById('abSearch');
  let cat='All', built=false; const T0=document.title;
  const books=HERO.map((b,i)=>({b,i,g:shelfGenre(b.g)})).filter((x,k,a)=>a.findIndex(y=>y.b.t===x.b.t)===k);
  /* each book can sit under several categories: its shelf genre plus the genres in the scrolling strip */
  const MATCH={Mystery:/mystery|thriller|crime|sleuth|suspense/,Romance:/romance|romantic/,Fantasy:/mytholog|fantasy|witch/,'Young Readers':/young adult|children|middle-grade|ages/,
    Classics:/literary|in translation|classic/,'Science Fiction':/science fiction|sci-fi|dystop/,History:/history|historical/};
  books.forEach(x=>{ const g=x.b.g.toLowerCase(); x.cats=new Set([x.g,...Object.keys(MATCH).filter(k=>MATCH[k].test(g))]); });
  const has=(x,c)=>c==='All'||x.cats.has(c);
  const CATS=['All',...[...new Set(["Fiction","Mystery","Romance","Fantasy","Young Readers","Classics","Science Fiction","Memoir","Poetry","History","Self-help","Business","Non-fiction","Children's"])]];
  function build(){ if(built) return; built=true;
    grid.innerHTML=books.map(({b,i,g})=>`<article class="bk" data-hero="${i}" data-g="${esc(g)}" data-cats="${esc([...books.find(x=>x.i===i).cats].join('|'))}" data-q="${esc((b.t+' '+b.a).toLowerCase())}" tabindex="0" role="button" aria-label="Open ${esc(b.t)} by ${esc(b.a)}">
      <span class="tag">${esc(g)}</span><div class="pages"></div><div class="cover real"><img src="${b.img}" alt="${esc(b.t)} by ${esc(b.a)}" loading="lazy" /></div>
      <div class="meta"><b>${esc(b.t)}</b><span>${esc(b.a)}</span></div></article>`).join('');
    renderChips(); }
  function renderChips(){ chips.innerHTML=CATS.map(c=>[c,books.filter(x=>has(x,c)).length]).filter(([c,n])=>n||c===cat)
      .map(([c,n])=>`<button type="button" class="chip${c===cat?' on':''}" data-c="${esc(c)}">${esc(c)} <small>${n}</small></button>`).join(''); }
  function filter(){ const q=search.value.trim().toLowerCase(); let n=0;
    grid.querySelectorAll('.bk').forEach(el=>{ const on=(cat==='All'||el.dataset.cats.split('|').includes(cat))&&(!q||el.dataset.q.includes(q)); el.hidden=!on; if(on) n++; });
    const em=document.getElementById('abEmpty'); em.hidden=n>0;
    em.innerHTML=q?'No books match that search. Try another title or author.':`No ${esc(cat)} titles in this collection yet. <button type="button" class="ab-all">See all books</button>`;
    document.getElementById('abSub').textContent=`${n} book${n===1?'':'s'}${cat==='All'?' from Penguin':` in ${cat}`}${q?` matching “${search.value.trim()}”`:''}. Tap any cover to open it.`; }
  function route(){ const h=location.hash, on=h==='#books'||h.startsWith('#books?'); document.body.classList.toggle('view-books',on); sec.hidden=!on;
    document.title=on?`All books — ${T0}`:T0;
    if(on){ const g=new URLSearchParams(h.split('?')[1]||'').get('g'); cat=g&&CATS.includes(g)?g:'All'; search.value='';
      build(); renderChips(); filter(); scrollTo({top:0,behavior:'instant'}); }
    else if(location.hash.length>1){ const t=document.querySelector(location.hash); if(t) requestAnimationFrame(()=>t.scrollIntoView()); } } // home sections are visible again, so scroll to the link's target
  chips.addEventListener('click',e=>{ const c=e.target.closest('.chip'); if(!c) return; cat=c.dataset.c; renderChips(); filter(); });
  document.getElementById('abEmpty').addEventListener('click',e=>{ if(e.target.closest('.ab-all')){ cat='All'; renderChips(); filter(); } });
  search.addEventListener('input',filter);
  const openFrom=el=>openBook(+el.dataset.hero,el.querySelector('.cover'));
  grid.addEventListener('click',e=>{ const el=e.target.closest('.bk'); if(el) openFrom(el); });
  grid.addEventListener('keydown',e=>{ const el=e.target.closest('.bk'); if(el&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); openFrom(el); } });
  addEventListener('hashchange',route); route();
})();
