import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import {
    FaReact,
    FaHtml5,
    FaCss3Alt,
    FaJsSquare,
    FaNodeJs,
    FaGithub,
    FaLinkedinIn,
    FaExternalLinkAlt,
} from 'react-icons/fa'

import { FaMobileAlt } from 'react-icons/fa'
import { FcIdea } from 'react-icons/fc'
import { FiServer } from 'react-icons/fi'
import { SiTailwindcss, SiFramer } from 'react-icons/si'
import { FaX } from 'react-icons/fa6'

gsap.registerPlugin(ScrollTrigger)

const ACCENT = '#FECB12'
const DARK_GRAY = '#1F2937'

const projects = [
    {
        id: 1,
        title: 'Portfolio Website',
        desc: 'Responsive portfolio with animations',
        link: 'https://ranjitdey.vercel.app',
    },
    {
        id: 2,
        title: 'PDF Merger',
        desc: 'Build a pdf merger',
        link: 'https://ranjit-dey.github.io/pdf-merger/',
    },
    {
        id: 3,
        title: 'Memory Vault',
        desc: 'Simple task management.',
        link: 'https://github.com/ranjit-dey/memory-vault',
    },
]

const experiences = [
    {
        company: 'Euphoria GenX',
        role: 'MERN Stack Intern',
        period: 'Jul 2025 - Sep 2025',
        bullets: ['Built UI with React & Tailwind', 'Improved accessibility and responsiveness'],
    },
]

const SKILLS = [
    { name: 'React', icon: <FaReact size={28} />, pct: 92 },
    { name: 'JavaScript', icon: <FaJsSquare size={28} />, pct: 88 },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={28} />, pct: 90 },
    { name: 'HTML5', icon: <FaHtml5 size={28} />, pct: 96 },
    { name: 'CSS3', icon: <FaCss3Alt size={28} />, pct: 92 },
    { name: 'Node.js', icon: <FaNodeJs size={28} />, pct: 70 },
    { name: 'Framer', icon: <SiFramer size={28} />, pct: 64 },
    { name: 'GitHub', icon: <FaGithub size={28} />, pct: 86 },
]

export default function App() {
    const [theme, setTheme] = useState(() =>
        typeof window !== 'undefined' ? localStorage.getItem('theme') || 'dark' : 'dark',
    )
    const [loading, setLoading] = useState(true)
    const containerRef = useRef()

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    // Page entrance animation using GSAP timeline
    useEffect(() => {
        if (!loading) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
            tl.from('.nav-item', { y: -20, opacity: 0, stagger: 0.06 })
                .from('.hero-title', { y: 30, opacity: 0 }, '-=0.2')
                .from('.hero-sub', { y: 20, opacity: 0 }, '-=0.15')
                .from('.cta-btn', { scale: 0.95, opacity: 0 }, '-=0.1')

            // Scroll-triggered reveals
            gsap.utils.toArray('.reveal').forEach((el) => {
                gsap.fromTo(
                    el,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        scrollTrigger: { trigger: el, start: 'top 85%' },
                    },
                )
            })
        }
    }, [loading])

    return (
        <div
            ref={containerRef}
            className={`min-h-screen font-sans`}
            style={{
                background: theme === 'dark' ? DARK_GRAY : '#fff',
                color: theme === 'dark' ? '#fff' : DARK_GRAY,
            }}
        >
            <style>{`
        :root{--accent:${ACCENT};}
        html{scroll-behavior:smooth}
        .accent{color:var(--accent)}
        .accent-bg{background:var(--accent)}
      `}</style>

            <CustomCursor />

            <Loader loading={loading} setLoading={setLoading} />

            <header
                className="sticky top-0 z-40 backdrop-blur-md"
                style={{
                    background: theme === 'dark' ? 'rgba(31,41,55,0.6)' : 'rgba(255,255,255,0.6)',
                }}
            >
                <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full accent-bg flex items-center justify-center text-black font-bold shadow">
                            R
                        </div>
                        <span className="font-semibold">Ranjit</span>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <ul className="flex items-center gap-6 capitalize">
                            {['about', 'projects', 'skills', 'experience', 'contact'].map((s) => (
                                <li key={s} className="nav-item">
                                    <a
                                        href={`#${s}`}
                                        className="hover:underline duration-300 transition"
                                    >
                                        {s}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="px-3 py-1 rounded border-white/60"
                        >
                            {theme === 'dark' ? `☀️ Light` : '🌙 Dark'}
                        </button>
                    </div>

                    <MobileMenu setTheme={setTheme} theme={theme} />
                </nav>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <section id="hero" className="min-h-[60vh] flex items-center">
                    <div className="w-full grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="hero-title text-4xl md:text-5xl font-extrabold leading-tight">
                                Hi, I'm <span className="accent">Ranjit</span> — a Frontend
                                Developer.
                            </h1>
                            <p className="hero-sub mt-4 text-lg max-w-xl">
                                I design and build responsive, accessible UIs with polished
                                animations using React, Tailwind CSS and GSAP.
                            </p>

                            <div className="mt-6 flex items-center gap-4">
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById('projects')
                                            ?.scrollIntoView({ behavior: 'smooth' })
                                    }
                                    className="cta-btn px-5 py-3 rounded-lg font-medium shadow hover:scale-105 transition-transform"
                                    style={{ background: ACCENT }}
                                >
                                    View my work
                                </button>
                                <a href="#contact" className="">
                                    Contact me
                                </a>
                            </div>
                        </div>

                        <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden flex items-center justify-center">
                            <img
                                src="/profile.png"
                                className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(254,203,18,0.8)]"
                                alt="profile"
                            />
                        </div>
                    </div>
                </section>

                <AboutSection />

                <section id="projects" className="mt-20 reveal scroll-mt-24">
                    <h2 className="text-3xl font-bold">Projects</h2>
                    <div className="mt-6 grid md:grid-cols-3 gap-6">
                        {projects.map((p) => (
                            <article
                                key={p.id}
                                className="rounded-lg p-4 shadow hover:shadow-lg transition-shadow bg-opacity-60 transform hover:-translate-y-2"
                            >
                                <h3 className="font-semibold text-lg">{p.title}</h3>
                                <p className="mt-2 text-sm">{p.desc}</p>
                                <div className="mt-4 flex items-center gap-3">
                                    <a
                                        href={p.link}
                                        className="text-sm flex gap-2 items-center justify-center border px-3 py-1  rounded border-amber-500"
                                        style={{ background: 'rgba(0,0,0,0.06)' }}
                                    >
                                        Demo
                                    </a>
                                    <a
                                        href={p.link}
                                        className="text-sm flex gap-2 items-center justify-center border px-3 py-1  rounded border-white/30"
                                    >
                                        Source {<FaExternalLinkAlt />}
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="skills" className="mt-20 reveal scroll-mt-24">
                    <h2 className="text-3xl font-bold">Skills</h2>
                    <p className="mt-2 text-sm">
                        Technical skills with proficiency — animated with GSAP timeline.
                    </p>

                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-lg shadow bg-linear-to-br from-white/5 to-white/2">
                            <h4 className="font-semibold mb-4">Core Skills</h4>
                            <SkillsGrid />
                        </div>

                        <div className="p-6 rounded-lg shadow self-start bg-linear-to-br from-white/5 to-white/2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                Tools & Workflow
                            </h4>

                            <ul className="mt-4 text-sm space-y-3">
                                {/* Git + GitHub */}
                                <li className="flex items-center gap-3">
                                    <span className="w-8 h-8 flex items-center justify-center rounded-md bg-[#FECB12]/20 text-[#FECB12]">
                                        <FaGithub size={16} />
                                    </span>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Git & GitHub — source control & PR-based workflow
                                    </p>
                                </li>

                                {/* REST API */}
                                <li className="flex items-center gap-3">
                                    <span className="w-8 h-8 flex items-center justify-center rounded-md bg-[#FECB12]/20 text-[#FECB12]">
                                        <FiServer size={16} />
                                    </span>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        REST APIs — fetch and integrate backend services
                                    </p>
                                </li>

                                {/* Responsive + Accessibility */}
                                <li className="flex items-center gap-3">
                                    <span className="w-8 h-8 flex items-center justify-center rounded-md bg-[#FECB12]/20 text-[#FECB12]">
                                        <FaMobileAlt size={16} />
                                    </span>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Responsive-first design and accessibility best practices
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="experience" className="mt-20 reveal scroll-mt-24">
                    <h2 className="text-3xl font-bold">Experience</h2>
                    <div className="mt-6 space-y-4">
                        {experiences.map((e, idx) => (
                            <div key={idx} className="p-4 rounded-lg shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold">{e.role}</h4>
                                        <div className="text-sm text-gray-300">{e.company}</div>
                                    </div>
                                    <div className="text-sm">{e.period}</div>
                                </div>
                                <ul className="mt-2 list-disc list-inside text-sm">
                                    {e.bullets.map((b, i) => (
                                        <li key={i} className="flex items-center gap-3 mb-2">
                                            <span className="w-8 h-8 flex items-center justify-center rounded-md bg-[#FECB12]/20 text-[#FECB12]">
                                                <FcIdea size={16} />
                                            </span>
                                            <p className="text-gray-700 dark:text-gray-300">{b}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="mt-20 reveal scroll-mt-24">
                    <h2 className="text-3xl font-bold">Contact</h2>
                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                        <div>
                            <ContactForm />
                        </div>
                        <div className="p-4 rounded-lg shadow">
                            <h4 className="font-semibold">Get in touch</h4>
                            <p className="mt-2 text-sm">Or reach me via social platforms</p>
                            <div className="mt-4 flex gap-3">
                                <a
                                    href="https://github.com/ranjit-dey"
                                    aria-label="GitHub"
                                    target="_blank"
                                    className="w-10 h-10 rounded-full flex items-center justify-center border"
                                >
                                    <FaGithub />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/ranjitdey/"
                                    aria-label="LinkedIn"
                                    className="w-10 h-10 rounded-full flex items-center justify-center border"
                                    target="_blank"
                                >
                                    <FaLinkedinIn />
                                </a>
                                <a
                                    href="https://x.com/ranjitdey_"
                                    target="_blank"
                                    aria-label="Twitter"
                                    className="w-10 h-10 rounded-full flex items-center justify-center border"
                                >
                                    <FaX />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="mt-20 py-8 border-t">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>© {new Date().getFullYear()} Ranjit. All rights reserved.</div>
                        <p>ranjitdey05265@gmail.com</p>
                        <div className="flex items-center gap-4">
                            <a href="#contact" className="hover:text-">
                                Contact
                            </a>
                            <a href="#projects" className="">
                                Projects
                            </a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    )
}

/* ---------- Loader (GSAP timeline) ---------- */
function Loader({ loading, setLoading }) {
    const loaderRef = useRef()

    useEffect(() => {
        const tl = gsap.timeline({ onComplete: () => setLoading(false) })

        // simple loader timeline: logo scale + progress bar
        tl.to(loaderRef.current.querySelector('.loader-logo'), {
            scale: 1,
            opacity: 1,
            duration: 0.6,
        })
            .to(loaderRef.current.querySelector('.loader-line'), {
                width: '100%',
                duration: 1.2,
                ease: 'power1.inOut',
            })
            .to(loaderRef.current, { y: '-120%', duration: 0.8, delay: 0.4, ease: 'power2.in' })
    }, [setLoading])

    if (!loading) return null

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-50 flex items-center justify-center flex-col bg-black text-white"
        >
            <div className="loader-logo scale-75 opacity-0 mb-6">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: ACCENT, color: '#000' }}
                >
                    R
                </div>
            </div>
            <div className="w-64 h-2 bg-white/10 rounded overflow-hidden">
                <div className="loader-line h-full bg-white w-0" />
            </div>
            <div className="mt-3 text-sm text-white/70">Loading portfolio...</div>
        </div>
    )
}

/* ---------- Mobile Menu ---------- */
function MobileMenu({ setTheme, theme }) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (open) {
            gsap.to('.mobile-drawer', { y: 0, opacity: 1, duration: 0.4 })
        }
    }, [open])

    return (
        <div className="md:hidden">
            <button
                onClick={() => setOpen(!open)}
                aria-label="menu"
                className="p-2 rounded-md border"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {open && (
                <div
                    className="mobile-drawer fixed top-16 left-0 right-0 bg-opacity-95 p-6"
                    style={{ background: DARK_GRAY }}
                >
                    <ul className="flex flex-col gap-2">
                        {[
                            'about',
                            'projects',
                            'skills',
                            'experience',
                            'certification',
                            'contact',
                        ].map((s) => (
                            <li
                                key={s}
                                className="capitalize py-2 border-b text-amber-400"
                                onClick={() => {
                                    setOpen(false)
                                    document
                                        .getElementById(s)
                                        ?.scrollIntoView({ behavior: 'smooth' })
                                }}
                            >
                                {s}
                            </li>
                        ))}
                        <li className="pt-2">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded border"
                            >
                                {theme === 'dark' ? 'Light' : 'Dark'}
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

/* ---------- About + Skills ---------- */
function AboutSection() {
    return (
        <section id="about" className="mt-20 reveal scroll-mt-24">
            <h2 className="text-3xl font-bold">About</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <p className="text-lg">
                        I am a Computer Science student passionate about building polished front-end
                        experiences. I enjoy transforming ideas into delightful user interfaces with
                        React, Tailwind and GSAP.
                    </p>
                    <h4 className="mt-6 font-semibold">Skills</h4>
                    <div className="mt-3 space-y-3">
                        {/* Skill bars will be animated in SkillsGrid */}
                        <div className="text-sm text-gray-400">
                            Below are some highlighted skills — interactive and animated.
                        </div>
                    </div>
                </div>

                <div className="p-4 rounded-lg shadow">
                    <h5 className="font-semibold">Quick Bio</h5>
                    <p className="mt-2 text-sm">
                        Frontend-focused developer. Likes clean code, animations, and
                        micro-interactions.
                    </p>
                    <div className="mt-4 flex gap-2 flex-wrap">
                        <span className="text-xs px-2 py-1 rounded bg-gray-200/40">React</span>
                        <span className="text-xs px-2 py-1 rounded bg-gray-200/40">Tailwind</span>
                        <span className="text-xs px-2 py-1 rounded bg-gray-200/40">GSAP</span>
                        <span className="text-xs px-2 py-1 rounded bg-gray-200/40">
                            Accessibility
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

function SkillsGrid() {
    const gridRef = useRef()

    useEffect(() => {
        // timeline that reveals each skill with scale & bar animation
        const items = gsap.utils.toArray('.skill-card')
        const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power3.out' } })
        tl.from(items, { y: 20, opacity: 0, stagger: 0.08 })

        // animate the progress bars after reveal
        items.forEach((it) => {
            const bar = it.querySelector('.skill-fill')
            const pct = bar.getAttribute('data-pct')
            gsap.to(bar, { width: pct + '%', duration: 1, ease: 'power2.out', delay: 0.4 })
        })

        // Add ScrollTrigger so new items animate when scrolled into view
        gsap.utils.toArray('.skill-card').forEach((el) => {
            gsap.fromTo(
                el,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    scrollTrigger: { trigger: el, start: 'top 90%' },
                },
            )
        })

        return () => {
            tl.kill()
        }
    }, [])

    return (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2  gap-4">
            {SKILLS.map((s) => (
                <div
                    key={s.name}
                    className="skill-card p-3 rounded-lg bg-white/5 shadow flex flex-col gap-3"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5">
                            {s.icon}
                        </div>
                        <div>
                            <div className="font-semibold">{s.name}</div>
                            <div className="text-xs text-gray-300">{s.pct}%</div>
                        </div>
                    </div>

                    <div className="w-full h-3 bg-white/10 rounded overflow-hidden">
                        <div
                            className="skill-fill h-full rounded"
                            data-pct={s.pct}
                            style={{
                                width: '0%',
                                background: `linear-gradient(90deg, ${ACCENT}, ${DARK_GRAY})`,
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

/* ---------- Contact Form ---------- */
function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Name required'
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) e.email = 'Valid email required'
        if (!form.message.trim() || form.message.length < 10)
            e.message = 'Message should be at least 10 characters'
        return e
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const e = validate()
        setErrors(e)
        if (Object.keys(e).length === 0) {
            setSubmitted(true)
            setForm({ name: '', email: '', message: '' })
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {submitted && (
                <div className="p-3 rounded bg-green-100 text-green-800 mb-3">
                    Message sent successfully
                </div>
            )}
            <div className="grid gap-3">
                <div>
                    <label className="text-sm">Name</label>
                    <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3 py-2 rounded border bg-transparent"
                    />
                    {errors.name && <div className="text-xs text-red-500">{errors.name}</div>}
                </div>
                <div>
                    <label className="text-sm">Email</label>
                    <input
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2 rounded border bg-transparent"
                    />
                    {errors.email && <div className="text-xs text-red-500">{errors.email}</div>}
                </div>
                <div>
                    <label className="text-sm">Message</label>
                    <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-3 py-2 rounded border bg-transparent"
                        rows={5}
                    />
                    {errors.message && <div className="text-xs text-red-500">{errors.message}</div>}
                </div>

                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded"
                        style={{ background: ACCENT }}
                    >
                        Send message
                    </button>
                </div>
            </div>
        </form>
    )
}

/* ---------- Custom Cursor (big circle with small circle) ---------- */
function CustomCursor() {
    const outerRef = useRef()
    const innerRef = useRef()
    const requestRef = useRef()
    const mouse = useRef({ x: 0, y: 0 })
    const pos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const onMove = (e) => {
            mouse.current.x = e.clientX
            mouse.current.y = e.clientY
            if (innerRef.current)
                innerRef.current.style.transform = `translate3d(${e.clientX - 6}px, ${
                    e.clientY - 6
                }px, 0)`
        }
        const loop = () => {
            pos.current.x += (mouse.current.x - pos.current.x) * 0.18
            pos.current.y += (mouse.current.y - pos.current.y) * 0.18
            if (outerRef.current)
                outerRef.current.style.transform = `translate3d(${pos.current.x - 18}px, ${
                    pos.current.y - 18
                }px, 0)`
            requestRef.current = requestAnimationFrame(loop)
        }

        window.addEventListener('mousemove', onMove)
        requestRef.current = requestAnimationFrame(loop)
        document.body.style.cursor = 'none'

        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(requestRef.current)
            document.body.style.cursor = ''
        }
    }, [])

    return (
        <>
            <div
                ref={outerRef}
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    width: 36,
                    height: 36,
                    borderRadius: 9999,
                    border: `2px solid ${ACCENT}`,
                    transform: 'translate3d(-999px,-999px,0)',
                    transition: 'width .15s,height .15s',
                }}
            />
            <div
                ref={innerRef}
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    width: 12,
                    height: 12,
                    borderRadius: 9999,
                    background: ACCENT,
                    transform: 'translate3d(-999px,-999px,0)',
                }}
            />
        </>
    )
}
