import { useEffect, useRef, useState } from 'react';
import { Phone, X, List, EnvelopeSimple, MapPin } from '@phosphor-icons/react';

const categories = [{id:'all',label:'פרויקטים'},{id:'kitchen',label:'מטבחים'},{id:'storage',label:'ארונות קיר וסיפריות'},{id:'doors',label:'דלתות מעוצבות'},{id:'bath',label:'חדרי אמבטיה'}];
const works = [
 ['project-01.jpg','kitchen'],['project-48.jpg','storage'],['extra-03.jpg','doors'],
 ['project-03.jpg','kitchen'],['project-54.jpg','storage'],['extra-06.jpg','bath'],
 ['project-16.jpg','kitchen'],['project-42.jpg','storage'],['extra-02.jpg','doors'],
 ['project-13.jpg','kitchen'],['project-59.jpg','storage'],['extra-11.jpg','bath'],
 ['project-31.jpg','kitchen'],['project-41.jpg','storage'],['extra-05.jpg','doors'],
 ['extra-07.jpg','bath'],['project-06.jpg','kitchen'],['project-38.jpg','storage'],['extra-04.jpg','doors'],
].map(([image,category],id)=>({id,image,category,title:categories.find(c=>c.id===category).label}));
const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
function Logo({footer=false}) { return <a href="#home" className={`brand ${footer?'brand-footer':''}`} aria-label="נגריית אל גולן"><img src={asset('04-logo.png')} alt="נגריית אל גולן" width="185" height="171"/></a> }
function Photo({name,alt,...props}) {return <img src={asset(name)} alt={alt} {...props}/>}
export function App() {
 const [menu,setMenu]=useState(false),[filter,setFilter]=useState('all'),[active,setActive]=useState(null),[scrolled,setScrolled]=useState(false);
 const dialog=useRef(null),opener=useRef(null);
 const filtered=works.filter(w=>filter==='all'||w.category===filter);
 useEffect(()=>{const fn=()=>setScrolled(window.scrollY>80);window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[]);
 useEffect(()=>{const d=dialog.current;if(active!==null&&!d.open){d.showModal();document.body.style.overflow='hidden'}else if(active===null&&d.open){d.close();document.body.style.overflow='';opener.current?.focus()}},[active]);
 useEffect(()=>{if(!menu)return;const close=e=>{if(e.key==='Escape')setMenu(false)};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[menu]);
 const open=(id,e)=>{opener.current=e.currentTarget;setActive(id)};
 const choose=id=>{setFilter(id)};
 const move=delta=>setActive(a=>{const index=filtered.findIndex(w=>w.id===a);return filtered[(index+delta+filtered.length)%filtered.length].id});
 const current=works.find(w=>w.id===active);
 function categoryClick(id){choose(id);document.querySelector('#projects')?.scrollIntoView({behavior:'smooth'})}
 return <>
 <a className="skip-link" href="#main">דילוג לתוכן</a>
 <header className={`site-header ${scrolled?'solid':''}`}><div className="nav-wrap"><Logo/><nav className={menu?'nav-open':''} aria-label="ניווט ראשי"><a href="#home" onClick={()=>setMenu(false)}>עמוד ראשי</a><a href="#about" onClick={()=>setMenu(false)}>אודות</a><a href="#projects" onClick={()=>setMenu(false)}>פרויקטים</a><a href="#contact" onClick={()=>setMenu(false)}>צור קשר</a></nav><a className="header-phone" href="tel:0544878562"><Phone size={21}/><span dir="ltr">054-4878562</span></a><button className="menu-toggle" aria-expanded={menu} aria-label={menu?'סגירת התפריט':'פתיחת התפריט'} onClick={()=>setMenu(!menu)}>{menu?<X size={26}/>:<List size={26}/>}</button></div></header>
 <main id="main">
 <section className="hero" id="home" aria-labelledby="hero-title"><Photo name="project-01.jpg" alt="מטבחים" className="hero-photo" fetchPriority="high"/><div className="hero-shade"/><div className="hero-content"><h1 id="hero-title">נגריית אל גולן<br/><span>תעשיית דלתות ורהיטים</span></h1><p>נגריית אל גולן שבירושלים פועלת מזה שנים רבות ומספקת שירותי נגרות בהתאמה אישית ללקוחות פרטיים, מוסדות ציבור וארגונים רבים.</p><div className="hero-actions"><a className="button bronze" href="#contact">צור קשר</a><a className="text-link light-link" href="#projects">פרויקטים</a></div></div></section>
 <section className="categories section-wrap" id="categories" aria-labelledby="categories-title"><div className="center-heading"><span/><h2 id="categories-title">נגרות פרטית</h2><span/></div><div className="category-grid">{[{id:'kitchen',image:'project-01.jpg',title:'מטבחים'},{id:'doors',image:'extra-03.jpg',title:'דלתות מעוצבות'},{id:'storage',image:'project-48.jpg',title:'ארונות קיר וסיפריות'}].map(c=><button className="category" key={c.id} onClick={()=>categoryClick(c.id)}><div className="category-image"><Photo name={c.image} alt={c.title} loading="lazy"/></div><span className="category-title">{c.title}</span></button>)}</div></section>
 <section className="about section-wrap" id="about"><div className="about-text"><h2>אודות</h2><p>נגריית אל גולן שבירושלים פועלת מאז שנת 1972 ומספקת שירותי נגרות בהתאמה אישית ללקוחות פרטיים, מוסדות ציבור וארגונים רבים.</p><p>הצוותים המקצועיים שבנגרייה מקפידים על רמת שירות גבוהה ויחס אישי ללקוחות ואינם מתפשרים על איכות חומרי הגלם, המקצועיות, רמות הגימור הגבוהות ועל עמידה בלוחות הזמנים.</p></div><div className="about-image"><Photo name="project-54.jpg" alt="נגרות פרטית" loading="lazy"/></div></section>
 <section className="projects" id="projects"><div className="section-wrap"><div className="section-heading"><h2>פרויקטים</h2></div><div className="filters" role="group" aria-label="סינון עבודות לפי תחום">{categories.map(c=><button key={c.id} aria-pressed={filter===c.id} onClick={()=>choose(c.id)}>{c.label}</button>)}</div><div className="projects-grid" aria-live="polite">{filtered.map(w=><button className="project" key={w.id} onClick={e=>open(w.id,e)} aria-label={`הגדלת התמונה: ${w.title}`}><div className="project-image"><Photo name={w.image} alt={w.title} loading="lazy"/></div></button>)}</div></div></section>
 <section className="contact" id="contact"><div className="contact-inner section-wrap"><div><h2>צור קשר</h2><p>אנו מזמינים אתכם להתרשם ממגוון העבודות הרחב שבאתר,<br/>מסגנונות העיצוב, הצבעים ומחומרי הגלם השונים.</p><p>צוות הייעוץ והתכנון שלנו ישמח לעמוד לרשותכם ולתכנן גם<br/>עבורכם את פריט הריהוט עליו חלמתם.</p></div><div className="contact-details"><a className="contact-phone" href="tel:0544878562"><span>טל:</span><strong dir="ltr">054-4878562</strong><Phone size={32}/></a><a className="contact-line" href="mailto:g0544878562@gmail.com"><EnvelopeSimple size={22}/><span dir="ltr">g0544878562@gmail.com</span></a><div className="contact-line"><MapPin size={22}/><span>רח' היוזמה א.תעשיה עטרות ירושלים</span></div><div className="contact-line"><span>פקס: 02-6563528</span></div></div></div></section>
 </main>
 <footer><div className="footer-top section-wrap"><Logo footer/><p>נגריית אל גולן - תעשיית דלתות ורהיטים</p></div></footer>
 <a className="mobile-call" href="tel:0544878562"><Phone size={20}/><span>טל:</span><span dir="ltr">054-4878562</span></a>
 <dialog ref={dialog} className="lightbox" onCancel={e=>{e.preventDefault();setActive(null)}} onClick={e=>{if(e.target===e.currentTarget)setActive(null)}} onKeyDown={e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(1)}if(e.key==='ArrowRight'){e.preventDefault();move(-1)}}} aria-label={current?.title||'תמונת פרויקט'}>{current&&<><button className="lightbox-close" onClick={()=>setActive(null)} aria-label="סגירת התמונה" autoFocus><X size={27}/></button><div className="lightbox-picture"><Photo name={current.image} alt={current.title}/></div><div className="lightbox-caption"><strong>{current.title}</strong><small>{filtered.findIndex(w=>w.id===active)+1} / {filtered.length}</small></div><div className="lightbox-thumbnails">{filtered.map(w=><button key={w.id} onClick={()=>setActive(w.id)} aria-label={`הצגת תמונה ${filtered.indexOf(w)+1}`} aria-pressed={active===w.id}><Photo name={w.image} alt={w.title} loading="lazy"/></button>)}</div></>}</dialog>
 </>
}
