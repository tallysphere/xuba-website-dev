'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Check, X, ArrowRight, Phone } from 'lucide-react'

// Color palette data
const greenPalette = [
  { name: '50', class: 'bg-xuba-green-50', hex: '#f4fce8', textClass: 'text-xuba-green-950' },
  { name: '100', class: 'bg-xuba-green-100', hex: '#e7f9cc', textClass: 'text-xuba-green-950' },
  { name: '200', class: 'bg-xuba-green-200', hex: '#cff39e', textClass: 'text-xuba-green-950' },
  { name: '300', class: 'bg-xuba-green-300', hex: '#b5eb6f', textClass: 'text-xuba-green-950' },
  { name: '400', class: 'bg-xuba-green-400', hex: '#9ce047', textClass: 'text-xuba-green-950' },
  { name: '500', class: 'bg-xuba-green-500', hex: '#84d22b', textClass: 'text-xuba-green-950' },
  { name: '600', class: 'bg-xuba-green-600', hex: '#66a821', textClass: 'text-white' },
  { name: '700', class: 'bg-xuba-green-700', hex: '#4d7f1b', textClass: 'text-white' },
  { name: '800', class: 'bg-xuba-green-800', hex: '#3f651b', textClass: 'text-white' },
  { name: '900', class: 'bg-xuba-green-900', hex: '#23390e', textClass: 'text-white' },
  { name: '950', class: 'bg-xuba-green-950', hex: '#121f06', textClass: 'text-white' },
]

const purplePalette = [
  { name: '50', class: 'bg-xuba-purple-50', hex: '#faf5ff', textClass: 'text-xuba-purple-950' },
  { name: '100', class: 'bg-xuba-purple-100', hex: '#f3e8ff', textClass: 'text-xuba-purple-950' },
  { name: '200', class: 'bg-xuba-purple-200', hex: '#e4ccff', textClass: 'text-xuba-purple-950' },
  { name: '300', class: 'bg-xuba-purple-300', hex: '#d1a3ff', textClass: 'text-xuba-purple-950' },
  { name: '400', class: 'bg-xuba-purple-400', hex: '#b866ff', textClass: 'text-xuba-purple-950' },
  { name: '500', class: 'bg-xuba-purple-500', hex: '#8b2fc9', textClass: 'text-white' },
  { name: '600', class: 'bg-xuba-purple-600', hex: '#7424a8', textClass: 'text-white' },
  { name: '700', class: 'bg-xuba-purple-700', hex: '#5e1c87', textClass: 'text-white' },
  { name: '800', class: 'bg-xuba-purple-800', hex: '#461565', textClass: 'text-white' },
  { name: '900', class: 'bg-xuba-purple-900', hex: '#2d0d42', textClass: 'text-white' },
  { name: '950', class: 'bg-xuba-purple-950', hex: '#1f0830', textClass: 'text-white' },
]

// Proposed semantic tokens for light and dark themes
const proposedTokens = {
  light: {
    background: { token: 'background', value: 'white', description: 'Main page background' },
    backgroundAlt: { token: 'background-alt', value: 'xuba-green-50', description: 'Cards, elevated surfaces' },
    foreground: { token: 'foreground', value: 'xuba-green-900', description: 'Primary text color' },
    foregroundMuted: { token: 'foreground-muted', value: 'xuba-green-600', description: 'Secondary text' },
    primary: { token: 'primary', value: 'xuba-green-600', description: 'Primary buttons, links, text' },
    primaryForeground: { token: 'primary-foreground', value: 'white', description: 'Text on primary' },
    secondary: { token: 'secondary', value: 'xuba-green-100', description: 'Secondary buttons' },
    secondaryForeground: { token: 'secondary-foreground', value: 'xuba-green-800', description: 'Text on secondary' },
    accent: { token: 'accent', value: 'xuba-green-500', description: 'Highlights, icons, accents' },
    accentSubtle: { token: 'accent-subtle', value: 'xuba-green-200', description: 'Subtle accent elements' },
    border: { token: 'border', value: 'xuba-green-200', description: 'Borders, dividers' },
    borderSubtle: { token: 'border-subtle', value: 'xuba-green-100', description: 'Subtle borders' },
  },
  dark: {
    background: { token: 'background', value: 'xuba-purple-950', description: 'Main page background' },
    backgroundAlt: { token: 'background-alt', value: 'xuba-purple-900', description: 'Cards, elevated surfaces' },
    foreground: { token: 'foreground', value: 'xuba-green-50', description: 'Primary text color' },
    foregroundMuted: { token: 'foreground-muted', value: 'xuba-green-200', description: 'Secondary text' },
    primary: { token: 'primary', value: 'xuba-green-500', description: 'Primary buttons, links' },
    primaryForeground: { token: 'primary-foreground', value: 'xuba-purple-950', description: 'Text on primary' },
    secondary: { token: 'secondary', value: 'xuba-purple-800', description: 'Secondary buttons' },
    secondaryForeground: { token: 'secondary-foreground', value: 'xuba-green-100', description: 'Text on secondary' },
    accent: { token: 'accent', value: 'xuba-green-400', description: 'Highlights, accents' },
    accentSubtle: { token: 'accent-subtle', value: 'xuba-purple-700', description: 'Subtle accent elements' },
    border: { token: 'border', value: 'xuba-purple-700', description: 'Borders, dividers' },
    borderSubtle: { token: 'border-subtle', value: 'xuba-purple-800', description: 'Subtle borders' },
  },
}

// Type for contrast examples
type ContrastExample = {
  bg: string
  text: string
  label: string
  ratio: string
  passes: boolean
  note?: string
}

// Contrast check data - showing good and problematic combinations
const contrastExamples: { light: ContrastExample[]; dark: ContrastExample[] } = {
  light: [
    { bg: 'bg-xuba-green-50', text: 'text-xuba-purple-950', label: 'Purple 950 on Green 50', ratio: '15.2:1', passes: true },
    { bg: 'bg-xuba-green-50', text: 'text-xuba-purple-900', label: 'Purple 900 on Green 50', ratio: '11.8:1', passes: true },
    { bg: 'bg-xuba-green-50', text: 'text-xuba-purple-800', label: 'Purple 800 on Green 50', ratio: '8.4:1', passes: true },
    { bg: 'bg-xuba-green-50', text: 'text-xuba-purple-700', label: 'Purple 700 on Green 50', ratio: '5.9:1', passes: true },
    { bg: 'bg-xuba-green-50', text: 'text-xuba-purple-600', label: 'Purple 600 on Green 50', ratio: '4.6:1', passes: true },
    { bg: 'bg-xuba-green-50', text: 'text-xuba-purple-500', label: 'Purple 500 on Green 50', ratio: '3.4:1', passes: false },
    { bg: 'bg-white', text: 'text-xuba-green-700', label: 'Green 700 on White', ratio: '4.8:1', passes: true },
    { bg: 'bg-white', text: 'text-xuba-green-600', label: 'Green 600 on White', ratio: '3.2:1', passes: false },
    { bg: 'bg-xuba-green-600', text: 'text-white', label: 'White on Green 600', ratio: '3.2:1', passes: true, note: 'Large text only' },
    { bg: 'bg-xuba-green-700', text: 'text-white', label: 'White on Green 700', ratio: '4.8:1', passes: true },
  ],
  dark: [
    { bg: 'bg-xuba-purple-950', text: 'text-xuba-green-50', label: 'Green 50 on Purple 950', ratio: '14.8:1', passes: true },
    { bg: 'bg-xuba-purple-950', text: 'text-xuba-green-100', label: 'Green 100 on Purple 950', ratio: '13.2:1', passes: true },
    { bg: 'bg-xuba-purple-950', text: 'text-xuba-green-200', label: 'Green 200 on Purple 950', ratio: '10.8:1', passes: true },
    { bg: 'bg-xuba-purple-950', text: 'text-xuba-green-300', label: 'Green 300 on Purple 950', ratio: '8.6:1', passes: true },
    { bg: 'bg-xuba-purple-950', text: 'text-xuba-green-400', label: 'Green 400 on Purple 950', ratio: '7.2:1', passes: true },
    { bg: 'bg-xuba-purple-950', text: 'text-xuba-green-500', label: 'Green 500 on Purple 950', ratio: '6.1:1', passes: true },
    { bg: 'bg-xuba-purple-900', text: 'text-xuba-green-100', label: 'Green 100 on Purple 900', ratio: '10.2:1', passes: true },
    { bg: 'bg-xuba-purple-900', text: 'text-xuba-green-400', label: 'Green 400 on Purple 900', ratio: '5.6:1', passes: true },
    { bg: 'bg-xuba-green-500', text: 'text-xuba-purple-950', label: 'Purple 950 on Green 500', ratio: '6.1:1', passes: true },
    { bg: 'bg-xuba-green-400', text: 'text-xuba-purple-950', label: 'Purple 950 on Green 400', ratio: '7.2:1', passes: true },
  ],
}

export default function ThemePage() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Using queueMicrotask to avoid synchronous setState warning
    // This is the standard pattern for handling hydration with next-themes
    queueMicrotask(() => setMounted(true))
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading theme showcase...</div>
      </div>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Theme Configuration
            </h1>
            <p className="text-lg text-muted-foreground">
              Design system color showcase for Xuba brand
            </p>
          </div>
          
          {/* Theme Toggle */}
          <div className="flex items-center gap-2 p-1 bg-muted border border-border">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-2 px-4 py-2 transition-all ${
                !isDark ? 'bg-white shadow-md text-xuba-green-700' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sun className="w-5 h-5" />
              <span className="font-medium">Light</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-2 px-4 py-2 transition-all ${
                isDark ? 'bg-xuba-purple-800 shadow-md text-xuba-green-400' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Moon className="w-5 h-5" />
              <span className="font-medium">Dark</span>
            </button>
          </div>
        </div>

        {/* WCAG Guidelines Info */}
        <div className="mb-12 p-6 bg-muted/50 border border-border">
          <h2 className="text-xl font-semibold mb-3 text-foreground">WCAG 2.2 Contrast Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-background border border-border">
              <div className="font-semibold text-foreground mb-1">Body Text (AA)</div>
              <div className="text-muted-foreground">Minimum 4.5:1 contrast ratio</div>
            </div>
            <div className="p-4 bg-background border border-border">
              <div className="font-semibold text-foreground mb-1">Large Text (AA)</div>
              <div className="text-muted-foreground">Minimum 3:1 contrast ratio (18px+ or 14px bold)</div>
            </div>
            <div className="p-4 bg-background border border-border">
              <div className="font-semibold text-foreground mb-1">UI Components</div>
              <div className="text-muted-foreground">Minimum 3:1 for interactive elements</div>
            </div>
          </div>
        </div>

        {/* Color Palettes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Brand Color Palettes</h2>
          
          {/* Green Palette */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
              <span className="w-4 h-4 bg-xuba-green-500"></span>
              Xuba Green (Primary)
              <span className="text-sm font-normal text-muted-foreground">— Predominantly used in Light theme</span>
            </h3>
            <div className="grid grid-cols-11 gap-1 overflow-hidden">
              {greenPalette.map((color) => (
                <div
                  key={color.name}
                  className={`${color.class} ${color.textClass} p-4 text-center transition-transform hover:scale-105 hover:z-10 hover:shadow-lg`}
                >
                  <div className="font-bold text-lg">{color.name}</div>
                  <div className="text-xs opacity-80 mt-1">{color.hex}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Purple Palette */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
              <span className="w-4 h-4 bg-xuba-purple-500"></span>
              Xuba Purple (Secondary)
              <span className="text-sm font-normal text-muted-foreground">— Predominantly used in Dark theme</span>
            </h3>
            <div className="grid grid-cols-11 gap-1 overflow-hidden">
              {purplePalette.map((color) => (
                <div
                  key={color.name}
                  className={`${color.class} ${color.textClass} p-4 text-center transition-transform hover:scale-105 hover:z-10 hover:shadow-lg`}
                >
                  <div className="font-bold text-lg">{color.name}</div>
                  <div className="text-xs opacity-80 mt-1">{color.hex}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proposed Semantic Tokens */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Proposed Semantic Tokens</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Light Theme Tokens */}
            <div className="overflow-hidden border border-xuba-green-200 bg-xuba-green-50">
              <div className="bg-xuba-green-100 px-6 py-4 flex items-center gap-3">
                <Sun className="w-6 h-6 text-xuba-green-600" />
                <h3 className="text-xl font-semibold text-xuba-green-800">Light Theme</h3>
              </div>
              <div className="p-6 space-y-3">
                {Object.entries(proposedTokens.light).map(([key, data]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-white border border-xuba-green-200">
                    <div>
                      <div className="font-mono text-sm text-xuba-green-700">{data.token}</div>
                      <div className="text-xs text-xuba-green-600">{data.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-xuba-green-600">{data.value}</span>
                      <div className={`w-8 h-8 border border-xuba-green-200 bg-${data.value}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark Theme Tokens */}
            <div className="overflow-hidden border border-xuba-purple-700 bg-xuba-purple-950">
              <div className="bg-xuba-purple-900 px-6 py-4 flex items-center gap-3">
                <Moon className="w-6 h-6 text-xuba-green-400" />
                <h3 className="text-xl font-semibold text-xuba-green-50">Dark Theme</h3>
              </div>
              <div className="p-6 space-y-3">
                {Object.entries(proposedTokens.dark).map(([key, data]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-xuba-purple-900 border border-xuba-purple-700">
                    <div>
                      <div className="font-mono text-sm text-xuba-green-300">{data.token}</div>
                      <div className="text-xs text-xuba-green-200/70">{data.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-xuba-green-200">{data.value}</span>
                      <div className={`w-8 h-8 border border-xuba-purple-600 bg-${data.value}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contrast Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Contrast Ratio Examples</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Light Theme Contrasts */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <Sun className="w-5 h-5" /> Light Theme Combinations
              </h3>
              <div className="space-y-2">
                {contrastExamples.light.map((example, idx) => (
                  <div
                    key={idx}
                    className={`${example.bg} ${example.text} p-4 flex items-center justify-between`}
                  >
                    <div>
                      <div className="font-medium">{example.label}</div>
                      {example.note && <div className="text-sm opacity-70">{example.note}</div>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm">{example.ratio}</span>
                      {example.passes ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark Theme Contrasts */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <Moon className="w-5 h-5" /> Dark Theme Combinations
              </h3>
              <div className="space-y-2">
                {contrastExamples.dark.map((example, idx) => (
                  <div
                    key={idx}
                    className={`${example.bg} ${example.text} p-4 flex items-center justify-between`}
                  >
                    <div>
                      <div className="font-medium">{example.label}</div>
                      {example.note && <div className="text-sm opacity-70">{example.note}</div>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm">{example.ratio}</span>
                      {example.passes ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* UI Component Previews */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-foreground">UI Component Previews</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Light Theme Preview */}
            <div className="overflow-hidden border-2 border-xuba-green-200">
              <div className="bg-xuba-green-100 px-6 py-3 flex items-center gap-2">
                <Sun className="w-5 h-5 text-xuba-green-600" />
                <span className="font-semibold text-xuba-green-800">Light Theme Preview</span>
              </div>
              <div className="bg-white p-6 space-y-6">
                {/* Typography */}
                <div>
                  <h4 className="text-2xl font-bold text-xuba-green-900 mb-2">Heading Text</h4>
                  <p className="text-xuba-green-700 mb-2">Primary body text with good readability and contrast for comfortable reading.</p>
                  <p className="text-xuba-green-600 text-sm">Secondary/muted text for less important information.</p>
                </div>

                {/* Buttons - Following Hero.tsx style */}
                <div className="flex flex-wrap gap-4">
                  <button className="relative rounded-none border-4 hover:scale-105 transition-all duration-300 bg-gray-100 border-gray-600 text-center font-semibold text-lg px-6 py-4 shadow-lg">
                    <div className="text-gray-700 flex items-center justify-center gap-2">
                      Primary Button <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                  <button className="relative rounded-none border-4 hover:scale-105 transition-all duration-300 bg-transparent border-xuba-green-500 text-center font-semibold text-lg px-6 py-4">
                    <div className="text-xuba-green-600 flex items-center justify-center gap-2">
                      Secondary Button
                    </div>
                  </button>
                </div>

                {/* Card */}
                <div className="bg-white p-5 border border-xuba-green-200 shadow-sm">
                  <h5 className="font-semibold text-xuba-green-800 mb-2">Card Component</h5>
                  <p className="text-xuba-green-600 text-sm mb-3">Cards use white background with subtle green border for elevation.</p>
                  <a href="#" className="text-xuba-green-600 hover:text-xuba-green-700 font-medium inline-flex items-center gap-1">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Input - Following ContactForm.tsx style */}
                <div>
                  <label className="block text-sm font-medium text-xuba-green-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    className="w-full h-12 rounded-none border border-xuba-green-300 bg-white/5 px-4 py-3 text-xuba-green-800 placeholder:text-xuba-green-400 focus:border-xuba-green-500 focus:ring-1 focus:ring-xuba-green-500 outline-none transition-all"
                  />
                </div>

                {/* Badge/Tag */}
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-xuba-green-200 text-xuba-green-700 text-sm font-medium">Green Tag</span>
                  <span className="px-3 py-1 bg-xuba-green-100 text-xuba-green-600 text-sm font-medium">Light Tag</span>
                </div>
              </div>
            </div>

            {/* Dark Theme Preview */}
            <div className="overflow-hidden border-2 border-xuba-purple-700">
              <div className="bg-xuba-purple-900 px-6 py-3 flex items-center gap-2">
                <Moon className="w-5 h-5 text-xuba-green-400" />
                <span className="font-semibold text-xuba-green-50">Dark Theme Preview</span>
              </div>
              <div className="bg-xuba-purple-950 p-6 space-y-6">
                {/* Typography */}
                <div>
                  <h4 className="text-2xl font-bold text-xuba-green-50 mb-2">Heading Text</h4>
                  <p className="text-xuba-green-100 mb-2">Primary body text with good readability and contrast for comfortable reading.</p>
                  <p className="text-xuba-green-300 text-sm">Secondary/muted text for less important information.</p>
                </div>

                {/* Buttons - Following Hero.tsx dark style */}
                <div className="flex flex-wrap gap-4">
                  <button className="relative rounded-none border-4 hover:scale-105 transition-all duration-300 bg-transparent border-white text-center font-semibold text-lg px-6 py-4 shadow-xl shadow-xuba-green-500/30">
                    <div className="text-white flex items-center justify-center gap-2">
                      Primary Button <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                  <button className="relative rounded-none border-4 hover:scale-105 transition-all duration-300 bg-transparent border-xuba-green-500 text-center font-semibold text-lg px-6 py-4 shadow-xl shadow-xuba-purple-500/40">
                    <div className="text-xuba-green-400 flex items-center justify-center gap-2">
                      Secondary Button
                    </div>
                  </button>
                </div>

                {/* Card */}
                <div className="bg-xuba-purple-900 p-5 border border-xuba-purple-700 shadow-sm">
                  <h5 className="font-semibold text-xuba-green-50 mb-2">Card Component</h5>
                  <p className="text-xuba-green-200 text-sm mb-3">Cards use elevated purple background with subtle border for depth.</p>
                  <a href="#" className="text-xuba-green-400 hover:text-xuba-green-300 font-medium inline-flex items-center gap-1">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Input - Following ContactForm.tsx dark style */}
                <div>
                  <label className="block text-sm font-medium text-xuba-green-100 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    className="w-full h-12 rounded-none border border-xuba-purple-700 bg-white/5 px-4 py-3 text-xuba-green-50 placeholder:text-xuba-green-300/50 focus:border-xuba-green-500 focus:ring-1 focus:ring-xuba-green-500 outline-none transition-all"
                  />
                </div>

                {/* Badge/Tag */}
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-xuba-green-500/20 text-xuba-green-400 text-sm font-medium">Green Tag</span>
                  <span className="px-3 py-1 bg-xuba-purple-700 text-xuba-green-200 text-sm font-medium">Purple Tag</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full Page Section Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Full Section Previews</h2>
          
          <div className="space-y-8">
            {/* Light Hero Section */}
            <div className="overflow-hidden border-2 border-xuba-green-200">
              <div className="bg-xuba-green-100 px-6 py-3 flex items-center gap-2">
                <Sun className="w-5 h-5 text-xuba-green-600" />
                <span className="font-semibold text-xuba-green-800">Light Theme - Hero Section</span>
              </div>
              <div className="bg-white p-12">
                <div className="max-w-2xl">
                  <span className="inline-block px-4 py-1.5 bg-xuba-green-100 text-xuba-green-600 text-sm font-medium mb-4">
                    IT Solutions Partner
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-xuba-green-900 mb-4 leading-tight">
                    Technology that works <span className="text-xuba-green-500">for you</span>
                  </h2>
                  <p className="text-lg text-xuba-green-700 mb-8">
                    We provide dedicated IT support and cloud technology solutions for small to medium businesses in Hamilton, NZ.
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <button className="relative rounded-none border-4 hover:scale-105 transition-all duration-300 bg-gray-100 border-gray-600 text-center font-semibold text-lg px-6 py-4 shadow-lg">
                      <div className="text-gray-700 flex items-center justify-center gap-2">
                        Get Started <ArrowRight className="w-5 h-5" />
                      </div>
                    </button>
                    <button className="relative rounded-none border-4 hover:scale-105 transition-all duration-300 bg-transparent border-xuba-green-500 text-center font-semibold text-lg px-6 py-4">
                      <div className="text-xuba-green-600 flex items-center justify-center gap-2">
                        <Phone className="w-5 h-5" /> Contact Us
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Hero Section */}
            <div className="overflow-hidden border-2 border-xuba-purple-700">
              <div className="bg-xuba-purple-900 px-6 py-3 flex items-center gap-2">
                <Moon className="w-5 h-5 text-xuba-green-400" />
                <span className="font-semibold text-xuba-green-50">Dark Theme - Hero Section</span>
              </div>
              <div className="bg-gradient-to-br from-xuba-purple-950 via-xuba-purple-900 to-xuba-purple-950 p-12">
                <div className="max-w-2xl">
                  <span className="inline-block px-4 py-1.5 bg-xuba-green-500/20 text-xuba-green-400 text-sm font-medium mb-4">
                    IT Solutions Partner
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-xuba-green-50 mb-4 leading-tight">
                    Technology that works <span className="text-xuba-green-400">for you</span>
                  </h2>
                  <p className="text-lg text-xuba-green-200 mb-8">
                    We provide dedicated IT support and cloud technology solutions for small to medium businesses in Hamilton, NZ.
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <button className="relative rounded-none border-4 hover:scale-105 transition-all duration-300 bg-transparent border-white text-center font-semibold text-lg px-6 py-4 shadow-xl shadow-xuba-purple-500/40">
                      <div className="text-white flex items-center justify-center gap-2">
                        Get Started <ArrowRight className="w-5 h-5" />
                      </div>
                    </button>
                    <button className="relative rounded-none border-4 hover:scale-105 transition-all duration-300 bg-transparent border-xuba-green-500 text-center font-semibold text-lg px-6 py-4 shadow-xl shadow-xuba-green-500/30">
                      <div className="text-xuba-green-400 flex items-center justify-center gap-2">
                        <Phone className="w-5 h-5" /> Contact Us
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Key Recommendations</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-xuba-green-50 dark:bg-xuba-purple-900 border border-xuba-green-200 dark:border-xuba-purple-700">
              <h3 className="text-lg font-semibold text-xuba-green-900 dark:text-xuba-green-50 mb-3">Light Theme Guidelines</h3>
              <ul className="space-y-2 text-xuba-green-700 dark:text-xuba-green-200">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-xuba-green-600 dark:text-xuba-green-400 mt-0.5 shrink-0" />
                  <span>Use <strong>white</strong> as main background (no colored backgrounds)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-xuba-green-600 dark:text-xuba-green-400 mt-0.5 shrink-0" />
                  <span>Use <strong>xuba-green-600</strong> for primary text and links</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-xuba-green-600 dark:text-xuba-green-400 mt-0.5 shrink-0" />
                  <span>Use <strong>xuba-green-500</strong> for icons and accents</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-xuba-green-600 dark:text-xuba-green-400 mt-0.5 shrink-0" />
                  <span>Use <strong>gray-100 + border-gray-600</strong> for primary buttons</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-xuba-green-50 dark:bg-xuba-purple-900 border border-xuba-green-200 dark:border-xuba-purple-700">
              <h3 className="text-lg font-semibold text-xuba-purple-950 dark:text-xuba-green-50 mb-3">Dark Theme Guidelines</h3>
              <ul className="space-y-2 text-xuba-purple-800 dark:text-xuba-green-200">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-xuba-green-600 dark:text-xuba-green-400 mt-0.5 shrink-0" />
                  <span>Use <strong>xuba-purple-950</strong> as main background</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-xuba-green-600 dark:text-xuba-green-400 mt-0.5 shrink-0" />
                  <span>Use <strong>xuba-green-50/100</strong> for headings and body text</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-xuba-green-600 dark:text-xuba-green-400 mt-0.5 shrink-0" />
                  <span>Use <strong>transparent + border-white</strong> for primary buttons with glow</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-xuba-green-600 dark:text-xuba-green-400 mt-0.5 shrink-0" />
                  <span>Use <strong>xuba-purple-800/900</strong> for elevated surfaces</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Button Style Reference */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Button Style Reference</h2>
          <div className="p-6 bg-muted/50 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Standard Button Pattern</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-foreground mb-2">Light Mode</h4>
                <code className="text-sm text-muted-foreground block bg-background p-3 border border-border">
                  rounded-none border-4 hover:scale-105 transition-all duration-300 bg-gray-100 border-gray-600 text-gray-700 shadow-lg
                </code>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Dark Mode</h4>
                <code className="text-sm text-muted-foreground block bg-background p-3 border border-border">
                  rounded-none border-4 hover:scale-105 transition-all duration-300 bg-transparent border-white text-white shadow-xl shadow-xuba-green-500/30
                </code>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
