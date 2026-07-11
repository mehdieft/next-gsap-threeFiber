"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis";
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollTriggerOne() {
    const containerRef = useRef()

    useGSAP(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
        });

        // Keep ScrollTrigger in sync with Lenis
        lenis.on("scroll", ScrollTrigger.update);

        // GSAP drives Lenis
        const update = (time) => {
            lenis.raf(time * 1000); // GSAP time is seconds, Lenis expects milliseconds
        };

        gsap.ticker.add(update);

        // Disable GSAP lag smoothing
        gsap.ticker.lagSmoothing(0);
        if (!containerRef.current) return
        const sections = gsap.utils.toArray('.section')
        sections.forEach((section, index) => {
            const wrapper = section.querySelector('.wrapper')
            gsap.to(wrapper, {
                rotate: 0,
                scale: 1,
                scrollTrigger: { trigger: section, scrub: true, start: 'top bottom', end: 'top 1%' },
                ease: 'none'
            })
            if (index === sections.length) return
            ScrollTrigger.create({
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                pin: true,
                pinSpacing: false
            })
        })
        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, { scope: containerRef })

    return (
        <>
            <main ref={containerRef} className="w-full overflow-hidden flex flex-col gap-30">

                <section className="section">
                    <div className="will-change-transform wrapper rotate-30 scale-5 bg-gradient-to-br from-red-400 to-red-500 flex w-svw h-svh">
                        <div className="bg-gradient-to-br from-green-400 to-green-500 flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                                🚀
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                Launch Fast
                            </h2>
                            <p className="max-w-md text-white/90 text-lg leading-relaxed">
                                Ship your ideas quickly with tools built for speed and reliability, without cutting corners.
                            </p>
                            <button className="mt-2 px-6 py-3 rounded-full bg-white/90 text-green-700 font-semibold shadow-md hover:bg-white transition-colors">
                                Get Started
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-green-700 to-green-900 flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                                ⚡
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                Stay Efficient
                            </h2>
                            <p className="max-w-md text-white/80 text-lg leading-relaxed">
                                Optimized performance under the hood keeps every interaction smooth and responsive.
                            </p>
                            <button className="mt-2 px-6 py-3 rounded-full bg-white/10 border border-white/40 text-white font-semibold hover:bg-white/20 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="will-change-transform wrapper scale-5 rotate-30 bg-gradient-to-br from-red-400 to-red-500 flex w-svw h-svh">
                        <div className="bg-gradient-to-br from-amber-300 to-amber-400 flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                                🎨
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                Design Freely
                            </h2>
                            <p className="max-w-md text-white/90 text-lg leading-relaxed">
                                Flexible components let you craft unique experiences without fighting the framework.
                            </p>
                            <button className="mt-2 px-6 py-3 rounded-full bg-white/90 text-amber-700 font-semibold shadow-md hover:bg-white transition-colors">
                                Explore
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-amber-700 to-amber-900 flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                                🛠️
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                Build Smarter
                            </h2>
                            <p className="max-w-md text-white/80 text-lg leading-relaxed">
                                Reusable patterns and clean architecture make scaling your project effortless.
                            </p>
                            <button className="mt-2 px-6 py-3 rounded-full bg-white/10 border border-white/40 text-white font-semibold hover:bg-white/20 transition-colors">
                                See Docs
                            </button>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="will-change-transform wrapper origin-bottom-left scale-5 rotate-30 bg-gradient-to-br from-red-400 to-red-500 flex w-svw h-svh">
                        <div className="bg-gradient-to-br from-red-400 to-red-500 flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                                🔒
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                Secure by Default
                            </h2>
                            <p className="max-w-md text-white/90 text-lg leading-relaxed">
                                Built-in best practices help protect your users and your data from day one.
                            </p>
                            <button className="mt-2 px-6 py-3 rounded-full bg-white/90 text-red-700 font-semibold shadow-md hover:bg-white transition-colors">
                                Read More
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-red-700 to-red-900 flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                                📈
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                Scale with Confidence
                            </h2>
                            <p className="max-w-md text-white/80 text-lg leading-relaxed">
                                Grow from prototype to production without rewriting your entire stack.
                            </p>
                            <button className="mt-2 px-6 py-3 rounded-full bg-white/10 border border-white/40 text-white font-semibold hover:bg-white/20 transition-colors">
                                View Plans
                            </button>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="will-change-transform wrapper origin-bottom-right scale-5 rotate-30 bg-gradient-to-br from-red-400 to-red-500 flex w-svw h-svh">
                        <div className="bg-gradient-to-br from-green-400 to-green-500 flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                                🌍
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                Global Reach
                            </h2>
                            <p className="max-w-md text-white/90 text-lg leading-relaxed">
                                Deploy close to your users everywhere with a network built for low latency.
                            </p>
                            <button className="mt-2 px-6 py-3 rounded-full bg-white/90 text-green-700 font-semibold shadow-md hover:bg-white transition-colors">
                                Go Global
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-green-700 to-green-900 flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                                🤝
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                Trusted by Teams
                            </h2>
                            <p className="max-w-md text-white/80 text-lg leading-relaxed">
                                Thousands of developers rely on this every day to power their products.
                            </p>
                            <button className="mt-2 px-6 py-3 rounded-full bg-white/10 border border-white/40 text-white font-semibold hover:bg-white/20 transition-colors">
                                Join Us
                            </button>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="will-change-transform wrapper origin-bottom-left scale-5 rotate-30 bg-gradient-to-br from-red-400 to-red-500 flex w-svw h-svh">
                        <div className="bg-gradient-to-br from-amber-300 to-amber-400 flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                                💡
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                Smart Insights
                            </h2>
                            <p className="max-w-md text-white/90 text-lg leading-relaxed">
                                Real-time analytics help you make better decisions, faster than ever before.
                            </p>
                            <button className="mt-2 px-6 py-3 rounded-full bg-white/90 text-amber-700 font-semibold shadow-md hover:bg-white transition-colors">
                                View Dashboard
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-amber-700 to-amber-900 flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                                🎯
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                Stay Focused
                            </h2>
                            <p className="max-w-md text-white/80 text-lg leading-relaxed">
                                Cut through the noise with tools designed around what actually matters.
                            </p>
                            <button className="mt-2 px-6 py-3 rounded-full bg-white/10 border border-white/40 text-white font-semibold hover:bg-white/20 transition-colors">
                                Focus Mode
                            </button>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="will-change-transform wrapper origin-bottom-right scale-5 rotate-30 bg-gradient-to-br from-red-400 to-red-500 flex w-svw h-svh">
                        <div className="bg-gradient-to-br from-red-400 to-red-500 flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                                ✨
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                Delightful UX
                            </h2>
                            <p className="max-w-md text-white/90 text-lg leading-relaxed">
                                Every interaction is crafted to feel intuitive, polished, and genuinely enjoyable.
                            </p>
                            <button className="mt-2 px-6 py-3 rounded-full bg-white/90 text-red-700 font-semibold shadow-md hover:bg-white transition-colors">
                                Try It Now
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-red-700 to-red-900 flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                                🏁
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                                Ready to Ship
                            </h2>
                            <p className="max-w-md text-white/80 text-lg leading-relaxed">
                                Everything you need is already here — start building your next big thing today.
                            </p>
                            <button className="mt-2 px-6 py-3 rounded-full bg-white/10 border border-white/40 text-white font-semibold hover:bg-white/20 transition-colors">
                                Get Started
                            </button>
                        </div>
                    </div>
                </section>
                <div className="h-svh bg-green-950 z-20"></div>

            </main>
        </>
    )
}